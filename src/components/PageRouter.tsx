import { HomePage } from './HomePage';
import { WorkPage } from './WorkPage';
import { AboutPage } from './AboutPage';
import { ContactSection } from './ContactSection';
import { ProjectDetailPage } from './ProjectDetailPage';
import { Footer } from './Footer';
import { Project } from '../utils/api';

interface PageRouterProps {
  currentPage: string;
  currentProject: string | null;
  featuredProjects: Project[];
  onProjectClick: (project: Project) => void;
}

export function PageRouter({ currentPage, currentProject, featuredProjects, onProjectClick }: PageRouterProps) {
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage featuredProjects={featuredProjects} onProjectClick={onProjectClick} />;
      
      case 'work':
        return <WorkPage />;
      
      case 'about':
        return <AboutPage />;
      
      case 'contact':
        return <ContactSection />;
      
      case 'project':
        if (currentProject) {
          return <ProjectDetailPage projectId={currentProject} />;
        }
        // Fallback to home if no project specified
        return <HomePage featuredProjects={featuredProjects} onProjectClick={onProjectClick} />;
      
      default:
        return <HomePage featuredProjects={featuredProjects} onProjectClick={onProjectClick} />;
    }
  };

  return (
    <>
      {renderPage()}
      <Footer />
    </>
  );
}