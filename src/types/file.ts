export interface FileItem {
  id: string
  project_id: string | null
  uploaded_by: string | null
  name: string
  file_url: string
  size_bytes: number
  mime_type: string
  folder: string
  created_at: string
  uploader?: {
    id: string
    full_name: string
    avatar_url: string | null
  }
  project?: {
    id: string
    name: string
  }
}

export interface FileFolder {
  name: string
  path: string
  fileCount: number
  totalSize: number
}

export interface UploadFileInput {
  file: File
  project_id?: string
  folder?: string
}
