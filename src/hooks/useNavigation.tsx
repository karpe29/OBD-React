import { useState, useEffect } from 'react';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const baseUrl = (import.meta as any).env?.BASE_URL || '/';

  const normalizeBase = (base: string) => base.replace(/\/$/, '');
  const normalizedBase = normalizeBase(baseUrl);
  const stripBase = (pathname: string) =>
    normalizedBase && pathname.startsWith(normalizedBase)
      ? pathname.slice(normalizedBase.length) || '/'
      : pathname;
  const joinPath = (segment: string) => {
    const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    const sub = segment.replace(/^\//, '');
    return base + sub;
  };

  // Handle URL changes and navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = stripBase(window.location.pathname);
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
      window.history.pushState({}, '', baseUrl);
    } else if (page === 'project' && projectId) {
      window.history.pushState({}, '', joinPath(`project/${projectId}`));
    } else {
      window.history.pushState({}, '', joinPath(page));
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