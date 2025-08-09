import { Project, HomepageSettings } from '../utils/api';

interface HomepageTabProps {
  projects: Project[];
  homepageSettings: HomepageSettings;
}

export function HomepageTab({ projects, homepageSettings }: HomepageTabProps) {
  return (
    <div>
      <h2 className="text-xl mb-6">Homepage Settings</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg mb-4">Featured Projects ({homepageSettings.featuredProjects.length})</h3>
        <p className="text-gray-600 mb-4">
          These projects will appear on the homepage. You can reorder them by managing individual projects.
        </p>
        
        {homepageSettings.featuredProjects.length > 0 ? (
          <div className="space-y-3">
            {homepageSettings.featuredProjects.map((projectId, index) => {
              const project = projects.find(p => p.id === projectId);
              return (
                <div key={projectId} className="flex items-center gap-4 p-3 border rounded">
                  <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  {project ? (
                    <>
                      <div className="flex-1">
                        <div className="text-sm">{project.title}</div>
                        <div className="text-xs text-gray-500">{project.location}</div>
                      </div>
                      {project.cover_image && (
                        <img
                          src={project.cover_image}
                          alt={project.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                    </>
                  ) : (
                    <div className="flex-1 text-red-500">Project not found (ID: {projectId})</div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No projects featured on homepage yet.</p>
        )}
      </div>
    </div>
  );
}