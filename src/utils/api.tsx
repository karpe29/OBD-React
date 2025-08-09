import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-2a3badc1`;

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  status: string;
  tagline: string;
  description: string;
  cover_image: string;
  galleryImages: string[];
}

export interface HomepageSettings {
  featuredProjects: string[];
}

class ApiError extends Error {
  constructor(message: string, public status: number, public setupRequired?: boolean) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new ApiError(
      errorData.error || `HTTP ${response.status}`, 
      response.status,
      errorData.setupRequired
    );
  }
  return response.json();
};

export const api = {
  // Test server connection and get setup status
  testConnection: async (): Promise<{ connected: boolean; setupRequired?: boolean; setupStatus?: any }> => {
    try {
      const response = await fetch(`${BASE_URL}/health`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          connected: true,
          setupRequired: !data.database?.isSetup,
          setupStatus: data.database
        };
      }
      
      return { connected: false };
    } catch {
      return { connected: false };
    }
  },

  // Get setup status
  getSetupStatus: async (): Promise<any> => {
    try {
      const response = await fetch(`${BASE_URL}/setup-status`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (response.ok) {
        return await response.json();
      }
      
      return { isSetup: false, projectsExists: false, settingsExists: false };
    } catch {
      return { isSetup: false, projectsExists: false, settingsExists: false };
    }
  },

  // Upload image to Supabase Storage
  uploadImage: async (file: File, accessToken: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/upload-image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: formData
    });

    const result = await handleResponse(response);
    
    if (!result.success || !result.url) {
      throw new Error('Failed to upload image');
    }

    return result.url;
  },

  // Get all projects
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${BASE_URL}/projects`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    const data = await handleResponse(response);
    return data.projects || [];
  },

  // Get single project
  getProject: async (id: string): Promise<Project> => {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    const data = await handleResponse(response);
    return data.project;
  },

  // Create project
  createProject: async (projectData: Partial<Project>, accessToken: string): Promise<string> => {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(projectData)
    });

    const data = await handleResponse(response);
    return data.projectId;
  },

  // Update project
  updateProject: async (id: string, updates: Partial<Project>, accessToken: string): Promise<Project> => {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(updates)
    });

    const data = await handleResponse(response);
    return data.project;
  },

  // Delete project
  deleteProject: async (id: string, accessToken: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    await handleResponse(response);
  },

  // Get homepage settings
  getHomepageSettings: async (): Promise<HomepageSettings> => {
    const response = await fetch(`${BASE_URL}/settings/homepage`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    const data = await handleResponse(response);
    return data.settings || { featuredProjects: [] };
  },

  // Update homepage settings
  updateHomepageSettings: async (settings: HomepageSettings, accessToken: string): Promise<HomepageSettings> => {
    const response = await fetch(`${BASE_URL}/settings/homepage`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(settings)
    });

    const data = await handleResponse(response);
    return data.settings;
  }
};