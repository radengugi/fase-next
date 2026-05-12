const { Client } = require('pg')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

async function runMigration(client, filePath) {
  console.log(`Running migration: ${path.basename(filePath)}`)
  const sql = fs.readFileSync(filePath, 'utf8')

  try {
    await client.query(sql)
    console.log(`✓ Completed: ${path.basename(filePath)}`)
  } catch (error) {
    console.error(`Error running ${path.basename(filePath)}:`, error.message)
    throw error
  }
}

async function main() {
  // Parse Supabase connection string
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL not found in .env.local')
  }

  // Extract connection details from URL
  // Format: https://[project-ref].supabase.co
  const match = supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)
  if (!match) {
    throw new Error('Invalid Supabase URL format')
  }

  const projectRef = match[1]

  // Note: You need to get database password from Supabase dashboard
  // Or use connection string format: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
  const connectionString = process.env.DATABASE_URL || `postgresql://postgres:${process.env.SUPABASE_DB_PASSWORD}@db.${projectRef}.supabase.co:5432/postgres`

  if (!process.env.SUPABASE_DB_PASSWORD && !process.env.DATABASE_URL) {
    console.error('\n❌ Error: Database password not found.')
    console.error('\nPlease set SUPABASE_DB_PASSWORD in your .env.local file.')
    console.error('You can find the database password in Supabase Dashboard → Settings → Database\n')
    console.error('Alternatively, run the migrations manually in Supabase Dashboard:')
    console.error('1. Go to https://app.supabase.com/project/' + projectRef + '/sql/new')
    console.error('2. Copy and run the content of these files in order:')
    console.error('   - supabase/migrations/010_cms_tables.sql')
    console.error('   - supabase/migrations/011_cms_rls.sql')
    console.error('   - supabase/migrations/012_cms_seed.sql\n')
    process.exit(1)
  }

  const client = new Client({ connectionString })

  try {
    await client.connect()
    console.log('Connected to Supabase database\n')

    const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations')
    const migrationFiles = [
      '010_cms_tables.sql',
      '011_cms_rls.sql',
      '012_cms_seed.sql'
    ]

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file)
      if (fs.existsSync(filePath)) {
        await runMigration(client, filePath)
      } else {
        console.warn(`Migration file not found: ${filePath}`)
      }
    }

    console.log('\n✅ All migrations completed!')
  } finally {
    await client.end()
  }
}

main().catch(error => {
  console.error('Migration failed:', error.message)
  process.exit(1)
})
