import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api, Project } from '../utils/api';

interface ProjectDetailPageProps {
  projectId: string;
}

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError('');
        const projectData = await api.getProject(projectId);
        setProject(projectData);
      } catch (err: any) {
        console.error('Failed to load project:', err);
        setError(err.message || 'Project not found');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Project Not Found</h2>
          <p style={{ fontFamily: 'Graphik, Arial, sans-serif' }} className="text-gray-600 mb-4">
            {error || 'The requested project could not be found.'}
          </p>
          <button 
            onClick={() => (window as any).navigateTo?.('work')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Browse All Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image Section - Full viewport height */}
      <div className="relative h-screen w-full overflow-hidden">
        <ImageWithFallback
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Lower Third Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h1
              className="text-white mb-2"
              style={{
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                fontWeight: '400',
                fontSize: 'clamp(2rem, 5vw, 3.125rem)',
                lineHeight: '1.2',
                letterSpacing: '0.02em'
              }}
            >
              {project.title}
            </h1>
            <p
              className="text-white/90 max-w-2xl"
              style={{
                fontFamily: 'Graphik, Arial, sans-serif',
                fontWeight: '300',
                fontSize: '1.25rem',
                lineHeight: '1.5',
                letterSpacing: '0.01em'
              }}
            >
              {project.location}
            </p>
          </div>
        </div>
      </div>

      {/* Project Information Section */}
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Project Tagline */}
          <div className="text-center mb-8">
            <h2
              style={{
                fontFamily: 'Nunito Sans, Arial, sans-serif',
                fontWeight: '300',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                lineHeight: '1.4',
                color: 'rgb(40, 40, 40)',
                letterSpacing: '0.01em',
                fontStyle: 'italic'
              }}
            >
              "{project.tagline}"
            </h2>
          </div>

          {/* Project Description */}
          <div className="space-y-4 mb-8">
            <div>
              <p
                style={{
                  fontFamily: 'Graphik, Arial, sans-serif',
                  fontWeight: '400',
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  color: 'rgb(40, 40, 40)',
                  letterSpacing: '0.01em',
                  textAlign: 'center'
                }}
              >
                {project.description}
              </p>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mt-8">
              <div>
                <p
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: 'rgb(100, 100, 100)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  Category
                </p>
                <p
                  style={{
                    fontFamily: 'Graphik, Arial, sans-serif',
                    fontWeight: '400',
                    fontSize: '1rem',
                    color: 'rgb(40, 40, 40)',
                    marginTop: '4px'
                  }}
                >
                  {project.category?.charAt(0).toUpperCase() + project.category?.slice(1)}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: 'rgb(100, 100, 100)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  Year
                </p>
                <p
                  style={{
                    fontFamily: 'Graphik, Arial, sans-serif',
                    fontWeight: '400',
                    fontSize: '1rem',
                    color: 'rgb(40, 40, 40)',
                    marginTop: '4px'
                  }}
                >
                  {project.year}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: 'rgb(100, 100, 100)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  Status
                </p>
                <p
                  style={{
                    fontFamily: 'Graphik, Arial, sans-serif',
                    fontWeight: '400',
                    fontSize: '1rem',
                    color: 'rgb(40, 40, 40)',
                    marginTop: '4px'
                  }}
                >
                  {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: 'rgb(100, 100, 100)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}
                >
                  Location
                </p>
                <p
                  style={{
                    fontFamily: 'Graphik, Arial, sans-serif',
                    fontWeight: '400',
                    fontSize: '1rem',
                    color: 'rgb(40, 40, 40)',
                    marginTop: '4px'
                  }}
                >
                  {project.location}
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="w-full h-px bg-gray-300 mb-12"></div>

          {/* Project Images - Full width, vertical stacking */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="flex flex-col items-center space-y-8">
              {project.galleryImages.map((image, index) => (
                <div key={index} className="w-full">
                  <ImageWithFallback
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {/* No additional images message */}
          {(!project.galleryImages || project.galleryImages.length === 0) && (
            <div className="text-center py-12">
              <p 
                style={{ fontFamily: 'Graphik, Arial, sans-serif' }}
                className="text-gray-500"
              >
                No additional images available for this project.
              </p>
            </div>
          )}

          {/* Back to Projects Button */}
          <div className="text-center mt-16">
            <button 
              onClick={() => (window as any).navigateTo?.('work')}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: '400',
                fontSize: '1rem'
              }}
            >
              Browse All Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}