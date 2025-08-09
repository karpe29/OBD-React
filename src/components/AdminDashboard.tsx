import { useState, useEffect } from 'react';
import { api, Project } from '../utils/api';
import { ProjectForm } from './ProjectForm';
import { AdminHeader } from './AdminHeader';
import { AdminTabs } from './AdminTabs';
import { ProjectsTab } from './ProjectsTab';
import { HomepageTab } from './HomepageTab';
import { AdminLogin } from './AdminLogin';
import { useAdminData } from '../hooks/useAdminData';
import { supabase } from '../utils/supabase/client';

interface User {
  id: string;
  email: string;
}

interface AdminDashboardInternalProps {
  user: User;
  accessToken: string;
  onLogout: () => void;
}

function AdminDashboardInternal({ user, accessToken, onLogout }: AdminDashboardInternalProps) {
  const isDemoMode = accessToken === 'demo-token';
  const {
    projects,
    homepageSettings,
    loading,
    error,
    setError,
    updateProjects,
    updateHomepageSettings,
    loadData
  } = useAdminData(accessToken, isDemoMode);

  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      if (isDemoMode) {
        updateProjects(projects.filter(p => p.id !== projectId));
        setError('Demo mode: Changes are not saved permanently.');
      } else {
        await api.deleteProject(projectId, accessToken);
        updateProjects(projects.filter(p => p.id !== projectId));
        
        // Remove from homepage if featured
        if (homepageSettings.featuredProjects.includes(projectId)) {
          const updatedSettings = {
            ...homepageSettings,
            featuredProjects: homepageSettings.featuredProjects.filter(id => id !== projectId)
          };
          await api.updateHomepageSettings(updatedSettings, accessToken);
          updateHomepageSettings(updatedSettings);
        }
      }
    } catch (err: any) {
      console.error('Failed to delete project:', err);
      setError(err.message);
    }
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      if (isDemoMode) {
        const newProject = {
          ...projectData,
          id: projectData.id || `demo-${Date.now()}`
        } as Project;
        
        if (editingProject) {
          const updatedProject = { ...editingProject, ...projectData };
          updateProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
        } else {
          updateProjects([...projects, newProject]);
        }
        
        setError('Demo mode: Changes are not saved permanently.');
      } else {
        if (editingProject) {
          const updatedProject = await api.updateProject(editingProject.id, projectData, accessToken);
          updateProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
        } else {
          const projectId = await api.createProject(projectData, accessToken);
          const newProject = await api.getProject(projectId);
          updateProjects([...projects, newProject]);
        }
        await loadData();
      }
      
      setEditingProject(null);
      setShowProjectForm(false);
    } catch (err: any) {
      console.error('Failed to save project:', err);
      setError(err.message);
    }
  };

  const handleToggleHomepage = async (projectId: string) => {
    try {
      const isCurrentlyFeatured = homepageSettings.featuredProjects.includes(projectId);
      let updatedFeatured: string[];

      if (isCurrentlyFeatured) {
        updatedFeatured = homepageSettings.featuredProjects.filter(id => id !== projectId);
      } else {
        updatedFeatured = [...homepageSettings.featuredProjects, projectId];
      }

      const updatedSettings = { ...homepageSettings, featuredProjects: updatedFeatured };
      
      if (isDemoMode) {
        updateHomepageSettings(updatedSettings);
        setError('Demo mode: Changes are not saved permanently.');
      } else {
        await api.updateHomepageSettings(updatedSettings, accessToken);
        updateHomepageSettings(updatedSettings);
      }
    } catch (err: any) {
      console.error('Failed to update homepage settings:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader user={user} onLogout={handleLogout} />
      
      {/* Demo Mode Warning & Error Messages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {isDemoMode && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <strong>Demo Mode:</strong> You're using the admin panel in demo mode. Changes won't be saved and functionality is limited.
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button onClick={() => setError('')} className="ml-2 text-red-800 hover:text-red-900">&times;</button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminTabs activeTab={activeTab} onTabChange={setActiveTab} projectCount={projects.length} />

        {activeTab === 'projects' && (
          <ProjectsTab
            projects={projects}
            homepageSettings={homepageSettings}
            onEdit={(project) => {
              setEditingProject(project);
              setShowProjectForm(true);
            }}
            onDelete={handleDeleteProject}
            onToggleHomepage={handleToggleHomepage}
            onAddNew={() => {
              setEditingProject(null);
              setShowProjectForm(true);
            }}
          />
        )}

        {activeTab === 'homepage' && (
          <HomepageTab
            projects={projects}
            homepageSettings={homepageSettings}
          />
        )}
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setEditingProject(null);
            setShowProjectForm(false);
          }}
          accessToken={accessToken}
          isDemoMode={isDemoMode}
        />
      )}
    </div>
  );
}

// Main AdminDashboard component that handles authentication
export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && session?.access_token) {
        setUser({
          id: session.user.id,
          email: session.user.email || ''
        });
        setAccessToken(session.access_token);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user && session?.access_token) {
        setUser({
          id: session.user.id,
          email: session.user.email || ''
        });
        setAccessToken(session.access_token);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (userData: User, token: string) => {
    setUser(userData);
    setAccessToken(token);
  };

  const handleLogout = () => {
    setUser(null);
    setAccessToken(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !accessToken) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminDashboardInternal
      user={user}
      accessToken={accessToken}
      onLogout={handleLogout}
    />
  );
}