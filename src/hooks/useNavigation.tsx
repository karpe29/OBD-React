import { useState, useEffect } from 'react';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  // Handle URL changes and navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/contact') {
        setCurrentPage('contact');
        setCurrentProject(null);
      } else if (path === '/work') {
        setCurrentPage('work');
        setCurrentProject(null);
      } else if (path === '/about') {
        setCurrentPage('about');
        setCurrentProject(null);
      } else if (path === '/admin') {
        setCurrentPage('admin');
        setCurrentProject(null);
      } else if (path.startsWith('/project/')) {
        const projectId = path.replace('/project/', '');
        setCurrentPage('project');
        setCurrentProject(projectId);
      } else {
        setCurrentPage('home');
        setCurrentProject(null);
      }
    };

    // Set initial page based on URL
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle navigation
  const navigateTo = (page: string, projectId?: string) => {
    setCurrentPage(page);
    setCurrentProject(projectId || null);
    
    if (page === 'home') {
      window.history.pushState({}, '', '/');
    } else if (page === 'project' && projectId) {
      window.history.pushState({}, '', `/project/${projectId}`);
    } else {
      window.history.pushState({}, '', `/${page}`);
    }
  };

  // Make navigation function available globally for header and components
  useEffect(() => {
    (window as any).navigateTo = navigateTo;
  }, []);

  return {
    currentPage,
    currentProject,
    navigateTo
  };
}