"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import type { CreateProjectInput, UpdateProjectInput } from "@/schemas/project"

export async function getProjects() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      client:clients(id, company_name),
      members:project_members(
        user_id,
        role,
        user:users(id, full_name, avatar_url)
      ),
      tasks:tasks(id, title, status, due_date)
    `)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function getProject(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      client:clients(id, company_name),
      members:project_members(
        user_id,
        role,
        user:users(id, full_name, avatar_url, email)
      ),
      tasks:tasks(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    return { error: error.message }
  }

  return { data }
}

export async function createProject(input: CreateProjectInput) {
  const supabase = await createClient()

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      name: input.name,
      client_id: input.client_id,
      service_type: input.service_type,
      description: input.description || null,
      deadline: input.deadline || null,
      priority: input.priority || "Medium",
      status: input.status || "Planning"
    })
    .select()
    .single()

  if (projectError) {
    return { error: projectError.message }
  }

  // Add team members
  if (input.assignee_ids && input.assignee_ids.length > 0) {
    const members = input.assignee_ids.map(user_id => ({
      project_id: project.id,
      user_id,
      role: "Team Member"
    }))

    const { error: membersError } = await supabase
      .from("project_members")
      .insert(members)

    if (membersError) {
      return { error: membersError.message }
    }
  }

  revalidatePath("/admin/projects")
  return { data: project }
}

export async function updateProject(input: UpdateProjectInput & { id: string }) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .update({
      name: input.name,
      client_id: input.client_id,
      service_type: input.service_type,
      description: input.description,
      deadline: input.deadline,
      priority: input.priority,
      status: input.status
    })
    .eq("id", input.id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Update team members if provided
  if (input.assignee_ids) {
    // Remove existing members
    await supabase
      .from("project_members")
      .delete()
      .eq("project_id", input.id)

    // Add new members
    const members = input.assignee_ids.map(user_id => ({
      project_id: input.id,
      user_id,
      role: "Team Member"
    }))

    await supabase
      .from("project_members")
      .insert(members)
  }

  revalidatePath("/admin/projects")
  return { data }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("projects")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
  return { success: true }
}

export async function updateProjectStatus(id: string, status: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .update({ status })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/projects")
  return { data }
}
