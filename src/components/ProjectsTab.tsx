import { Project, HomepageSettings } from '../utils/api';

interface ProjectsTabProps {
  projects: Project[];
  homepageSettings: HomepageSettings;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onToggleHomepage: (projectId: string) => void;
  onAddNew: () => void;
}

export function ProjectsTab({ 
  projects, 
  homepageSettings, 
  onEdit, 
  onDelete, 
  onToggleHomepage, 
  onAddNew 
}: ProjectsTabProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Manage Projects</h2>
        <button
          onClick={onAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Project
        </button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg">{project.title}</h3>
                  {homepageSettings.featuredProjects.includes(project.id) && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Featured on Homepage
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{project.location}</p>
                <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Category: {project.category}</span>
                  <span>•</span>
                  <span>Year: {project.year}</span>
                  <span>•</span>
                  <span>Status: {project.status}</span>
                  <span>•</span>
                  <span>{project.galleryImages?.length || 0} images</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {project.cover_image && (
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEdit(project)}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
              >
                Edit
              </button>
              <button
                onClick={() => onToggleHomepage(project.id)}
                className={`px-3 py-1 rounded text-sm ${
                  homepageSettings.featuredProjects.includes(project.id)
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {homepageSettings.featuredProjects.includes(project.id) ? 'Remove from Homepage' : 'Add to Homepage'}
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No projects yet</p>
            <button
              onClick={onAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}