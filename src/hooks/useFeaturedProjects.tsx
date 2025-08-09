import { useState, useEffect } from 'react';
import { api, Project } from '../utils/api';
import { FALLBACK_PROJECTS } from '../utils/constants';

export function useFeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [setupRequired, setSetupRequired] = useState(false);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        setSetupRequired(false);

        // First check if server is connected and setup
        const connectionStatus = await api.testConnection();
        
        if (!connectionStatus.connected) {
          console.log('Server not connected, using fallback projects');
          setFeaturedProjects(FALLBACK_PROJECTS);
          setError('Server not available');
          return;
        }

        if (connectionStatus.setupRequired) {
          console.log('Database setup required, using fallback projects');
          setFeaturedProjects(FALLBACK_PROJECTS);
          setSetupRequired(true);
          setError('Database setup required');
          return;
        }

        const [allProjects, homepageSettings] = await Promise.all([
          api.getProjects(),
          api.getHomepageSettings()
        ]);

        // Filter projects to only show featured ones on homepage
        const featured = allProjects.filter(project => 
          homepageSettings.featuredProjects.includes(project.id)
        );

        // Sort featured projects based on the order in homepage settings
        const sortedFeatured = homepageSettings.featuredProjects
          .map(id => featured.find(p => p.id === id))
          .filter(Boolean) as Project[];

        if (sortedFeatured.length > 0) {
          setFeaturedProjects(sortedFeatured);
        } else {
          // No featured projects found, use fallback
          setFeaturedProjects(FALLBACK_PROJECTS);
        }
      } catch (error: any) {
        console.error('Failed to load featured projects:', error);
        setError(error.message);
        
        // Check if this is a setup error
        if (error.setupRequired) {
          setSetupRequired(true);
        }
        
        // Fallback to default projects if API fails
        setFeaturedProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  return { featuredProjects, loading, error, setupRequired };
}