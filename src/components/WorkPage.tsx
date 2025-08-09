import { useState, useEffect } from 'react';
import { api, Project } from '../utils/api';
import { Loader } from './ui/loader';

interface Category {
  id: string;
  name: string;
  projects: Project[];
}

export function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Fixed category list based on user requirements
  const FIXED_CATEGORIES = [
    { id: 'architecture', name: 'Architecture' },
    { id: 'interior', name: 'Interior' },
    { id: 'landscape', name: 'Landscape' }
  ];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projects = await api.getProjects();

        // Group projects by category
        const groupedProjects: { [key: string]: Project[] } = {};
        projects.forEach(project => {
          const category = project.category || 'other';
          if (!groupedProjects[category]) {
            groupedProjects[category] = [];
          }
          groupedProjects[category].push(project);
        });

        // Create categories based on fixed list, with projects if they exist
        const categoryList: Category[] = FIXED_CATEGORIES.map(fixedCat => ({
          id: fixedCat.id,
          name: fixedCat.name,
          projects: groupedProjects[fixedCat.id] || []
        }));

        setCategories(categoryList);
      } catch (error) {
        console.error('Failed to load projects:', error);
        // Fallback to fixed categories with empty project arrays
        const fallbackCategories: Category[] = FIXED_CATEGORIES.map(fixedCat => ({
          id: fixedCat.id,
          name: fixedCat.name,
          projects: []
        }));
        setCategories(fallbackCategories);
      } finally {
        setLoading(false);
        // Hide loader and show content with delay
        setTimeout(() => {
          setShowLoader(false);
        }, 500); // Small delay to see the loader
      }
    };

    loadProjects();
  }, []);

  // Handle loader hide complete
  const handleLoaderHideComplete = () => {
    setShowContent(true);
  };

  // Handle project click navigation
  const handleProjectClick = (project: Project) => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo('project', project.id);
    }
  };

  // Always show the page structure, but with different animation states
  // Use fixed categories if still loading or if categories is empty
  const displayCategories = categories.length > 0 ? categories : FIXED_CATEGORIES.map(fixedCat => ({
    id: fixedCat.id,
    name: fixedCat.name,
    projects: []
  }));

  return (
    <>
      {/* Breathing Loader */}
      <Loader 
        isVisible={showLoader}
        onHideComplete={handleLoaderHideComplete}
        size={50}
        color="rgb(4, 0, 255)"
        duration={2}
      />

      <div className="min-h-screen bg-white px-4 sm:px-6" style={{ paddingTop: 'clamp(15vh, 30vh, 30vh)' }}>
        {/* Dots Section - Constrained Width */}
        <div className="max-w-7xl mx-auto">
          <div className="w-full">
            <div className="grid grid-cols-2 sm:flex sm:justify-between items-start gap-4 sm:gap-0">
              {displayCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[60px] relative ${
                    showContent 
                      ? index === 0 
                        ? 'fade-in-dot' 
                        : index === 1 
                          ? 'fade-in-dot-delay-1' 
                          : 'fade-in-dot-delay-2'
                      : 'opacity-0'
                  }`}
                style={{
                  flex: '1'
                }}
                onMouseEnter={() => setActiveCategory(category.id)}
                onClick={() => setActiveCategory(category.id)}
              >
                {/* Unicode Dot */}
                <div
                  style={{
                    fontSize: 'clamp(30px, 8vw, 50px)',
                    color: activeCategory === category.id ? 'rgb(4, 0, 255)' : 'black',
                    lineHeight: '0.7',
                    transition: 'color 0.3s ease',
                    marginBottom: '8px'
                  }}
                >
                  ●
                </div>
                
                {/* Category Name - Always visible on mobile, hidden on desktop unless active */}
                <span
                  className={`block sm:absolute transition-opacity duration-300 ${activeCategory === category.id ? 'sm:opacity-100 sm:visible' : 'sm:opacity-0 sm:invisible'}`}
                  style={{
                    position: 'static',
                    bottom: '-20px',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '400',
                    fontSize: 'clamp(0.9em, 3vw, 1.4em)',
                    color: 'rgb(40, 40, 40)'
                  }}
                >
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project List Section - Full Width */}
      {activeCategory && showContent && (
        <div className="w-full transition-opacity duration-300 opacity-100" style={{ marginTop: 'clamp(15vh, 30vh, 30vh)' }}>
          <div className="space-y-3 sm:space-y-4">
            {displayCategories
              .find(cat => cat.id === activeCategory)
              ?.projects.map((project, index) => (
              <div
                key={project.id}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-8 p-4 sm:py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Project Name */}
                <div className="sm:col-span-1">
                  <p
                    style={{
                      fontFamily: 'Graphik, Arial, sans-serif',
                      fontWeight: '400',
                      fontSize: 'clamp(0.9em, 2.5vw, 1em)',
                      color: 'rgb(40, 40, 40)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {project.title}
                  </p>
                </div>
                
                {/* Location */}
                <div className="sm:text-center">
                  <p
                    style={{
                      fontFamily: 'Graphik, Arial, sans-serif',
                      fontWeight: '400',
                      fontSize: 'clamp(0.9em, 2.5vw, 1em)',
                      color: 'rgb(40, 40, 40)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {project.location}
                  </p>
                </div>
                
                {/* Year */}
                <div className="sm:text-right">
                  <p
                    style={{
                      fontFamily: 'Graphik, Arial, sans-serif',
                      fontWeight: '400',
                      fontSize: 'clamp(0.9em, 2.5vw, 1em)',
                      color: 'rgb(40, 40, 40)',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {project.year || 'N/A'}
                  </p>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {displayCategories.find(cat => cat.id === activeCategory)?.projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
}