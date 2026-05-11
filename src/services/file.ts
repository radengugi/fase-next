"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

const BUCKET_NAME = "files"

export async function getFiles(projectId?: string) {
  const supabase = await createClient()

  let query = supabase
    .from("files")
    .select(`
      *,
      uploader:users(id, full_name, avatar_url),
      project:projects(id, name)
    `)
    .order("created_at", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }

  const { data, error } = await query

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function uploadFile(
  file: File,
  projectId?: string,
  folder?: string,
  uploadedBy?: string
) {
  const supabase = await createClient()

  // Generate unique file name
  const timestamp = Date.now()
  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
  const filePath = `${folder || "root"}/${timestamp}_${cleanFileName}`

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file)

  if (uploadError) {
    return { error: uploadError.message }
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)

  // Save file metadata to database
  const { data, error } = await supabase
    .from("files")
    .insert({
      project_id: projectId || null,
      uploaded_by: uploadedBy || null,
      name: file.name,
      file_url: publicUrl,
      size_bytes: file.size,
      mime_type: file.type,
      folder: folder || "/"
    })
    .select()
    .single()

  if (error) {
    // Try to clean up uploaded file
    await supabase.storage.from(BUCKET_NAME).remove([filePath])
    return { error: error.message }
  }

  revalidatePath("/admin/files")
  return { data }
}

export async function deleteFile(id: string) {
  const supabase = await createClient()

  // Get file info first
  const { data: file } = await supabase
    .from("files")
    .select("file_url")
    .eq("id", id)
    .single()

  if (file) {
    // Extract file path from URL
    const url = new URL(file.file_url)
    const pathParts = url.pathname.split("/")
    const filePath = pathParts.slice(pathParts.indexOf(BUCKET_NAME) + 1).join("/")

    // Delete from storage
    await supabase.storage.from(BUCKET_NAME).remove([filePath])
  }

  // Delete from database
  const { error } = await supabase
    .from("files")
    .delete()
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/files")
  return { success: true }
}

export async function getFolders() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("files")
    .select("folder")
    .not("folder", "is", null)

  if (error) {
    return { error: error.message }
  }

  // Group by folder and count files
  const folderMap = new Map<string, number>()
  data.forEach((item) => {
    const folder = item.folder || "/"
    folderMap.set(folder, (folderMap.get(folder) || 0) + 1)
  })

  const folders = Array.from(folderMap.entries()).map(([name, count]) => ({
    name,
    path: name,
    fileCount: count,
    totalSize: 0
  }))

  return { data: folders }
}

export async function createFolder(name: string) {
  const supabase = await createClient()

  // In Supabase Storage, folders are created implicitly when files are uploaded
  // We just need to track the folder in our database
  // This is a placeholder for creating an empty folder marker if needed

  revalidatePath("/admin/files")
  return { success: true }
}
