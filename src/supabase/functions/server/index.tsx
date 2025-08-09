import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { initializeStorage, initializeDefaultData } from './database.tsx'
import { handlers } from './handlers.tsx'
import { SERVER_CONFIG } from './config.tsx'

const app = new Hono()

// Enable CORS for all origins
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('*', logger(console.log))

const { API_PREFIX } = SERVER_CONFIG

// Health check endpoints
app.get(`${API_PREFIX}/health`, handlers.health)
app.get(`${API_PREFIX}/`, handlers.root)
app.get(`${API_PREFIX}/setup-status`, handlers.setupStatus)

// Authentication endpoints
app.post(`${API_PREFIX}/admin/signup`, handlers.adminSignup)

// Project endpoints
app.get(`${API_PREFIX}/projects`, handlers.getProjects)
app.get(`${API_PREFIX}/projects/:id`, handlers.getProject)
app.post(`${API_PREFIX}/projects`, handlers.createProject)
app.put(`${API_PREFIX}/projects/:id`, handlers.updateProject)
app.delete(`${API_PREFIX}/projects/:id`, handlers.deleteProject)

// Image upload endpoint
app.post(`${API_PREFIX}/upload-image`, handlers.uploadImage)

// Homepage settings endpoints
app.get(`${API_PREFIX}/settings/homepage`, handlers.getHomepageSettings)
app.put(`${API_PREFIX}/settings/homepage`, handlers.updateHomepageSettings)

// Initialize server
try {
  await initializeStorage()
  await initializeDefaultData()
  console.log('Server initialized successfully')
} catch (error) {
  console.error('Server initialization error:', error)
}

Deno.serve(app.fetch)