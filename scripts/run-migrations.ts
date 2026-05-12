import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration(filePath: string) {
  console.log(`Running migration: ${filePath}`)
  const sql = fs.readFileSync(filePath, 'utf8')

  const { error } = await supabase.rpc('exec_sql', { sql_query: sql })

  if (error) {
    console.error(`Error running ${filePath}:`, error)
    throw error
  }

  console.log(`✓ Completed: ${filePath}`)
}

async function main() {
  const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations')
  const migrationFiles = [
    '010_cms_tables.sql',
    '011_cms_rls.sql',
    '012_cms_seed.sql'
  ]

  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file)
    if (fs.existsSync(filePath)) {
      await runMigration(filePath)
    } else {
      console.warn(`Migration file not found: ${filePath}`)
    }
  }

  console.log('All migrations completed!')
}

main().catch(console.error)
