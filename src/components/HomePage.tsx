import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ProjectSection } from './ProjectSection';
import { Project } from '../utils/api';

interface HomePageProps {
  featuredProjects: Project[];
  onProjectClick: (project: Project) => void;
}

export function HomePage({ featuredProjects, onProjectClick }: HomePageProps) {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <div id="work">
        {featuredProjects.map((project) => (
          <div 
            key={project.id}
            onClick={() => onProjectClick(project)} 
            className="cursor-pointer"
          >
            <ProjectSection 
              title={project.title}
              location={project.location}
              image={project.cover_image}
              imageAlt={`${project.title} - ${project.description}`}
            />
          </div>
        ))}
        
        {featuredProjects.length === 0 && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl mb-4">No Projects Featured</h2>
              <p className="text-gray-600">Admin can add projects and feature them on the homepage.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}