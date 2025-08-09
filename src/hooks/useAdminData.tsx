import { useState, useEffect } from 'react';
import { api, Project, HomepageSettings } from '../utils/api';
import { DEMO_PROJECTS, DEMO_HOMEPAGE_SETTINGS } from '../utils/demoData';

export function useAdminData(accessToken: string, isDemoMode: boolean) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>({ featuredProjects: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (isDemoMode) {
        // Load demo data
        setProjects(DEMO_PROJECTS);
        setHomepageSettings(DEMO_HOMEPAGE_SETTINGS);
      } else {
        // Check connection and setup status first
        const connectionStatus = await api.testConnection();
        
        if (!connectionStatus.connected) {
          console.log('Server not connected, using demo data as fallback');
          setProjects(DEMO_PROJECTS);
          setHomepageSettings(DEMO_HOMEPAGE_SETTINGS);
          setError('Server not available - using demo data');
          return;
        }

        if (connectionStatus.setupRequired) {
          console.log('Database setup required, using demo data as fallback');
          setProjects(DEMO_PROJECTS);
          setHomepageSettings(DEMO_HOMEPAGE_SETTINGS);
          setError('Database setup required - using demo data');
          return;
        }

        const [projectsData, settingsData] = await Promise.all([
          api.getProjects(),
          api.getHomepageSettings()
        ]);
        setProjects(projectsData);
        setHomepageSettings(settingsData);
      }
    } catch (err: any) {
      console.error('Failed to load data:', err);
      setError(err.message);
      // Use demo data as fallback
      setProjects(DEMO_PROJECTS);
      setHomepageSettings(DEMO_HOMEPAGE_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isDemoMode]);

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };

  const updateHomepageSettings = (newSettings: HomepageSettings) => {
    setHomepageSettings(newSettings);
  };

  return {
    projects,
    homepageSettings,
    loading,
    error,
    setError,
    updateProjects,
    updateHomepageSettings,
    loadData
  };
}