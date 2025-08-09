import { Header } from './components/Header';
import { PageRouter } from './components/PageRouter';
import { SetupNotice } from './components/SetupNotice';
import { AdminDashboard } from './components/AdminDashboard';
import { Loader } from './components/ui/loader';
import { useNavigation } from './hooks/useNavigation';
import { useFeaturedProjects } from './hooks/useFeaturedProjects';
import { Project } from './utils/api';

export default function App() {
  const { currentPage, currentProject, navigateTo } = useNavigation();
  const { featuredProjects, loading, error, setupRequired } = useFeaturedProjects();

  // Handle project clicks from home page
  const handleProjectClick = (project: Project) => {
    navigateTo('project', project.id);
  };

  // Loading state for main site pages (not admin)
  if (loading && currentPage === 'home') {
    return <Loader isVisible={true} />;
  }

  // Admin page - completely separate layout
  if (currentPage === 'admin') {
    return <AdminDashboard />;
  }

  // Main site layout
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Setup Notice - only show on home page */}
      {setupRequired && currentPage === 'home' && (
        <SetupNotice onSetupClick={() => navigateTo('admin')} />
      )}
      
      <PageRouter 
        currentPage={currentPage}
        currentProject={currentProject}
        featuredProjects={featuredProjects}
        onProjectClick={handleProjectClick}
      />
    </div>
  );
}