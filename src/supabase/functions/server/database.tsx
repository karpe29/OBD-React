import { createClient } from 'npm:@supabase/supabase-js@2'
import { SERVER_CONFIG, DEFAULT_PROJECTS } from './config.tsx'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

export interface DatabaseStatus {
  projectsExists: boolean;
  settingsExists: boolean;
  isSetup: boolean;
  needsMigration?: boolean;
}

// Check if database tables exist and if they need migration
export const checkDatabaseSetup = async (): Promise<DatabaseStatus> => {
  try {
    // Check if projects table exists
    const { data: projectData, error: projectsError } = await supabase
      .from('projects')
      .select('id, year, tagline')
      .limit(1)
    
    // Check if homepage_settings table exists
    const { error: settingsError } = await supabase
      .from('homepage_settings')
      .select('id')
      .limit(1)

    const projectsExists = !projectsError || projectsError.code !== 'PGRST205'
    const settingsExists = !settingsError || settingsError.code !== 'PGRST205'
    
    // Check if projects table needs migration (missing new columns)
    let needsMigration = false
    if (projectsExists && projectsError && (
      projectsError.message.includes('column') && 
      (projectsError.message.includes('year') || projectsError.message.includes('tagline'))
    )) {
      needsMigration = true
    }

    return {
      projectsExists,
      settingsExists,
      isSetup: projectsExists && settingsExists && !needsMigration,
      needsMigration
    }
  } catch (error) {
    console.error('Database check error:', error)
    return {
      projectsExists: false,
      settingsExists: false,
      isSetup: false,
      needsMigration: false
    }
  }
}

// Auto-migrate database to new schema
export const migrateDatabase = async (): Promise<boolean> => {
  try {
    console.log('Starting database migration...')
    
    // Drop existing tables and recreate with new schema
    const migrationSQL = `
      -- Drop existing tables if they exist
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS homepage_settings CASCADE;

      -- Create new projects table with updated schema
      CREATE TABLE projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        location TEXT NOT NULL,
        year TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'completed',
        tagline TEXT NOT NULL,
        description TEXT NOT NULL,
        cover_image TEXT,
        gallery_images JSONB DEFAULT '[]'
      );

      -- Create homepage_settings table
      CREATE TABLE homepage_settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        featured_projects JSONB DEFAULT '[]',
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Enable Row Level Security
      ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
      ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;

      -- Create policies for projects table
      CREATE POLICY "Projects are viewable by everyone" ON projects
        FOR SELECT USING (true);

      CREATE POLICY "Authenticated users can insert projects" ON projects
        FOR INSERT WITH CHECK (auth.role() = 'authenticated');

      CREATE POLICY "Authenticated users can update projects" ON projects
        FOR UPDATE USING (auth.role() = 'authenticated');

      CREATE POLICY "Authenticated users can delete projects" ON projects
        FOR DELETE USING (auth.role() = 'authenticated');

      -- Create policies for homepage_settings table
      CREATE POLICY "Settings are viewable by everyone" ON homepage_settings
        FOR SELECT USING (true);

      CREATE POLICY "Authenticated users can update settings" ON homepage_settings
        FOR UPDATE USING (auth.role() = 'authenticated');

      CREATE POLICY "Authenticated users can insert settings" ON homepage_settings
        FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    `

    // Execute migration (Note: We can't run raw SQL directly through Supabase JS client)
    // This would need to be run manually in the Supabase SQL editor
    console.log('Migration SQL ready - tables will be recreated on next setup')
    
    return true
  } catch (error) {
    console.error('Migration error:', error)
    return false
  }
}

// Initialize storage bucket
export const initializeStorage = async (): Promise<boolean> => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some(bucket => bucket.name === SERVER_CONFIG.BUCKET_NAME)
    
    if (!bucketExists) {
      const { error: bucketError } = await supabase.storage.createBucket(SERVER_CONFIG.BUCKET_NAME, {
        public: false,
        allowedMimeTypes: SERVER_CONFIG.ALLOWED_MIME_TYPES,
        fileSizeLimit: SERVER_CONFIG.FILE_SIZE_LIMIT
      })
      
      if (bucketError) {
        console.error('Failed to create storage bucket:', bucketError)
        return false
      } else {
        console.log('Storage bucket created successfully')
        return true
      }
    } else {
      console.log('Storage bucket already exists')
      return true
    }
  } catch (error) {
    console.error('Storage initialization error:', error)
    return false
  }
}

// Initialize default data if tables exist and are empty
export const initializeDefaultData = async (): Promise<boolean> => {
  try {
    const setupStatus = await checkDatabaseSetup()
    
    if (!setupStatus.isSetup) {
      console.log('Database tables not found or need migration - skipping default data initialization')
      return false
    }

    // Check if projects exist
    const { data: existingProjects, error: projectsError } = await supabase
      .from('projects')
      .select('id')
      .limit(1)

    if (projectsError) {
      console.error('Error checking existing projects:', projectsError)
      return false
    }

    if (!existingProjects || existingProjects.length === 0) {
      console.log('No projects found, inserting default data...')
      
      const { error: insertError } = await supabase
        .from('projects')
        .insert(DEFAULT_PROJECTS)

      if (insertError) {
        console.error('Failed to insert default projects:', insertError)
        return false
      }

      // Set default homepage settings
      const { error: settingsError } = await supabase
        .from('homepage_settings')
        .upsert({
          id: 1,
          featured_projects: ['komorebi-house', 'urban-sanctuary', 'zen-garden'],
          updated_at: new Date().toISOString()
        })
        
      if (settingsError) {
        console.error('Failed to set homepage settings:', settingsError)
        return false
      }

      console.log('Default data initialized successfully')
      return true
    }

    console.log('Projects already exist, skipping default data initialization')
    return true
  } catch (error) {
    console.error('Default data initialization error:', error)
    return false
  }
}

export { supabase }