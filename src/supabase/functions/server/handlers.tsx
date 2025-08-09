import { Context } from 'npm:hono'
import { supabase, checkDatabaseSetup } from './database.tsx'
import { SERVER_CONFIG } from './config.tsx'

// Transform database project to API format
const transformProjectToApi = (project: any) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  location: project.location,
  year: project.year,
  status: project.status,
  tagline: project.tagline,
  description: project.description,
  cover_image: project.cover_image,
  galleryImages: project.gallery_images || []
})

// Transform API project to database format
const transformProjectToDb = (project: any) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  location: project.location,
  year: project.year,
  status: project.status,
  tagline: project.tagline,
  description: project.description,
  cover_image: project.cover_image,
  gallery_images: project.galleryImages || []
})

// Verify user authentication
const verifyAuth = async (c: Context) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1]
  if (!accessToken || accessToken === 'undefined') {
    return { error: 'Authorization token required', status: 401 }
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken)
  
  if (!user || error) {
    console.log(`Auth error: ${error?.message}`)
    return { error: 'Unauthorized', status: 401 }
  }

  return { user }
}

// Check setup requirement
const checkSetupRequired = async () => {
  const setupStatus = await checkDatabaseSetup()
  if (!setupStatus.isSetup) {
    let errorMessage = 'Database setup required.'
    
    if (setupStatus.needsMigration) {
      errorMessage = 'Database schema needs to be updated. Please run the latest SQL schema in your Supabase SQL Editor.'
    } else if (!setupStatus.projectsExists) {
      errorMessage = 'Projects table not found. Please run the SQL schema in your Supabase SQL Editor.'
    } else if (!setupStatus.settingsExists) {
      errorMessage = 'Settings table not found. Please run the SQL schema in your Supabase SQL Editor.'
    }
    
    return { 
      error: errorMessage,
      setupRequired: true,
      setupStatus,
      status: 503
    }
  }
  return null
}

export const handlers = {
  // Health check
  health: async (c: Context) => {
    const setupStatus = await checkDatabaseSetup()
    return c.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'ONE BLUE DOT Admin Server is running',
      database: setupStatus
    })
  },

  // Root endpoint
  root: async (c: Context) => {
    const setupStatus = await checkDatabaseSetup()
    return c.json({ 
      status: 'ok', 
      service: 'ONE BLUE DOT Admin API',
      version: '2.0.0',
      database: 'Supabase PostgreSQL',
      storage: 'Supabase Storage',
      timestamp: new Date().toISOString(),
      setup: setupStatus
    })
  },

  // Setup status
  setupStatus: async (c: Context) => {
    const setupStatus = await checkDatabaseSetup()
    return c.json(setupStatus)
  },

  // Admin signup
  adminSignup: async (c: Context) => {
    try {
      const { email, password, name } = await c.req.json()
      console.log(`Admin signup attempt for email: ${email}`)
      
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: { name, role: 'admin' },
        email_confirm: true
      })

      if (error) {
        console.log(`Admin signup error: ${error.message}`)
        return c.json({ error: error.message }, 400)
      }

      console.log(`Admin signup successful for: ${email}`)
      return c.json({ success: true, user: data.user })
    } catch (err) {
      console.log(`Admin signup error: ${err}`)
      return c.json({ error: 'Internal server error' }, 500)
    }
  },

  // Get all projects
  getProjects: async (c: Context) => {
    try {
      const setupCheck = await checkSetupRequired()
      if (setupCheck) return c.json(setupCheck, setupCheck.status)

      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        console.error('Get projects error:', error)
        return c.json({ error: 'Failed to fetch projects' }, 500)
      }

      const transformedProjects = projects.map(transformProjectToApi)
      console.log(`Retrieved ${transformedProjects.length} projects`)
      return c.json({ projects: transformedProjects })
    } catch (err) {
      console.log(`Get projects error: ${err}`)
      return c.json({ error: 'Failed to fetch projects' }, 500)
    }
  },

  // Get project by ID
  getProject: async (c: Context) => {
    try {
      const setupCheck = await checkSetupRequired()
      if (setupCheck) return c.json(setupCheck, setupCheck.status)

      const id = c.req.param('id')
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error || !project) {
        return c.json({ error: 'Project not found' }, 404)
      }
      
      return c.json({ project: transformProjectToApi(project) })
    } catch (err) {
      console.log(`Get project error: ${err}`)
      return c.json({ error: 'Failed to fetch project' }, 500)
    }
  },

  // Upload image
  uploadImage: async (c: Context) => {
    try {
      const authResult = await verifyAuth(c)
      if ('error' in authResult) return c.json({ error: authResult.error }, authResult.status)

      const formData = await c.req.formData()
      const file = formData.get('file') as File
      
      if (!file) {
        return c.json({ error: 'No file provided' }, 400)
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(SERVER_CONFIG.BUCKET_NAME)
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return c.json({ error: 'Failed to upload image' }, 500)
      }

      // Get signed URL for the uploaded image
      const { data: signedUrlData } = await supabase.storage
        .from(SERVER_CONFIG.BUCKET_NAME)
        .createSignedUrl(filePath, SERVER_CONFIG.SIGNED_URL_EXPIRES)

      console.log(`Image uploaded successfully: ${fileName}`)
      return c.json({ 
        success: true, 
        url: signedUrlData?.signedUrl,
        path: filePath
      })
    } catch (err) {
      console.log(`Upload image error: ${err}`)
      return c.json({ error: 'Failed to upload image' }, 500)
    }
  },

  // Create project
  createProject: async (c: Context) => {
    try {
      const setupCheck = await checkSetupRequired()
      if (setupCheck) return c.json(setupCheck, setupCheck.status)

      const authResult = await verifyAuth(c)
      if ('error' in authResult) return c.json({ error: authResult.error }, authResult.status)

      const projectData = await c.req.json()
      const projectId = projectData.id || `project-${Date.now()}`
      
      const dbProject = {
        ...transformProjectToDb(projectData),
        id: projectId
      }

      const { error } = await supabase
        .from('projects')
        .insert([dbProject])

      if (error) {
        console.error('Create project error:', error)
        return c.json({ error: 'Failed to create project' }, 500)
      }

      console.log(`Project created: ${projectId}`)
      return c.json({ success: true, projectId })
    } catch (err) {
      console.log(`Create project error: ${err}`)
      return c.json({ error: 'Failed to create project' }, 500)
    }
  },

  // Update project
  updateProject: async (c: Context) => {
    try {
      const setupCheck = await checkSetupRequired()
      if (setupCheck) return c.json(setupCheck, setupCheck.status)

      const authResult = await verifyAuth(c)
      if ('error' in authResult) return c.json({ error: authResult.error }, authResult.status)

      const id = c.req.param('id')
      const updates = await c.req.json()
      
      const dbUpdates = transformProjectToDb(updates)

      const { data, error } = await supabase
        .from('projects')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Update project error:', error)
        return c.json({ error: 'Failed to update project' }, 500)
      }

      if (!data) {
        return c.json({ error: 'Project not found' }, 404)
      }

      return c.json({ success: true, project: transformProjectToApi(data) })
    } catch (err) {
      console.log(`Update project error: ${err}`)
      return c.json({ error: 'Failed to update project' }, 500)
    }
  },

  // Delete project
  deleteProject: async (c: Context) => {
    try {
      const setupCheck = await checkSetupRequired()
      if (setupCheck) return c.json(setupCheck, setupCheck.status)

      const authResult = await verifyAuth(c)
      if ('error' in authResult) return c.json({ error: authResult.error }, authResult.status)

      const id = c.req.param('id')
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Delete project error:', error)
        return c.json({ error: 'Failed to delete project' }, 500)
      }
      
      return c.json({ success: true })
    } catch (err) {
      console.log(`Delete project error: ${err}`)
      return c.json({ error: 'Failed to delete project' }, 500)
    }
  },

  // Get homepage settings
  getHomepageSettings: async (c: Context) => {
    try {
      const setupCheck = await checkSetupRequired()
      if (setupCheck) return c.json(setupCheck, setupCheck.status)

      const { data: settings, error } = await supabase
        .from('homepage_settings')
        .select('*')
        .eq('id', 1)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Get homepage settings error:', error)
        return c.json({ error: 'Failed to fetch homepage settings' }, 500)
      }

      const result = settings ? {
        featuredProjects: settings.featured_projects || []
      } : { featuredProjects: [] }

      return c.json({ settings: result })
    } catch (err) {
      console.log(`Get homepage settings error: ${err}`)
      return c.json({ error: 'Failed to fetch homepage settings' }, 500)
    }
  },

  // Update homepage settings
  updateHomepageSettings: async (c: Context) => {
    try {
      const setupCheck = await checkSetupRequired()
      if (setupCheck) return c.json(setupCheck, setupCheck.status)

      const authResult = await verifyAuth(c)
      if ('error' in authResult) return c.json({ error: authResult.error }, authResult.status)

      const settingsData = await c.req.json()
      
      const { data, error } = await supabase
        .from('homepage_settings')
        .upsert({
          id: 1,
          featured_projects: settingsData.featuredProjects,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Update homepage settings error:', error)
        return c.json({ error: 'Failed to update homepage settings' }, 500)
      }
      
      const transformedSettings = {
        featuredProjects: data.featured_projects || []
      }

      return c.json({ success: true, settings: transformedSettings })
    } catch (err) {
      console.log(`Update homepage settings error: ${err}`)
      return c.json({ error: 'Failed to update homepage settings' }, 500)
    }
  }
}