import { useState, useRef, useEffect } from 'react';
import { Project, api } from '../utils/api';

interface ProjectFormProps {
  project?: Project | null;
  onSave: (project: Partial<Project>) => void;
  onCancel: () => void;
  accessToken?: string;
  isDemoMode?: boolean;
}

export function ProjectForm({ project, onSave, onCancel, accessToken = '', isDemoMode = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || 'architecture',
    location: project?.location || '',
    year: project?.year || '',
    status: project?.status || 'completed',
    tagline: project?.tagline || '',
    description: project?.description || '',
    cover_image: project?.cover_image || '',
    galleryImages: project?.galleryImages || []
  });
  
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [error, setError] = useState('');
  
  const coverImageRef = useRef<HTMLInputElement>(null);
  const galleryImagesRef = useRef<HTMLInputElement>(null);

  // Update form data when project prop changes
  useEffect(() => {
    setFormData({
      title: project?.title || '',
      category: project?.category || 'architecture',
      location: project?.location || '',
      year: project?.year || '',
      status: project?.status || 'completed',
      tagline: project?.tagline || '',
      description: project?.description || '',
      cover_image: project?.cover_image || '',
      galleryImages: project?.galleryImages || []
    });
  }, [project]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isDemoMode) {
      // In demo mode, just use a placeholder URL
      const demoUrl = URL.createObjectURL(file);
      handleInputChange('cover_image', demoUrl);
      return;
    }

    try {
      setUploadingCover(true);
      setError('');
      
      const url = await api.uploadImage(file, accessToken);
      handleInputChange('cover_image', url);
    } catch (err: any) {
      console.error('Cover image upload failed:', err);
      setError(`Failed to upload cover image: ${err.message}`);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (isDemoMode) {
      // In demo mode, just use placeholder URLs
      const demoUrls = files.map(file => URL.createObjectURL(file));
      handleInputChange('galleryImages', [...formData.galleryImages, ...demoUrls]);
      return;
    }

    try {
      setUploadingGallery(true);
      setError('');
      
      const uploadPromises = files.map(file => api.uploadImage(file, accessToken));
      const urls = await Promise.all(uploadPromises);
      
      handleInputChange('galleryImages', [...formData.galleryImages, ...urls]);
    } catch (err: any) {
      console.error('Gallery images upload failed:', err);
      setError(`Failed to upload gallery images: ${err.message}`);
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = formData.galleryImages.filter((_, i) => i !== index);
    handleInputChange('galleryImages', newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.description || !formData.tagline) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const projectData = {
        ...formData,
        id: project?.id || `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      
      onSave(projectData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">
          {project ? 'Edit Project' : 'Create New Project'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {isDemoMode && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <strong>Demo Mode:</strong> Image uploads will use temporary URLs and won't be saved permanently.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Project Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="OBD Studio"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Hyderabad, India"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="architecture">Architecture</option>
                <option value="interior">Interior</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year *</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="2023"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tagline *</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="There is beauty in Minimalism and Deep connection with each element that a space comprises of."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Detailed project description..."
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <div className="space-y-4">
              <input
                ref={coverImageRef}
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              
              {uploadingCover && (
                <div className="text-blue-600">Uploading cover image...</div>
              )}
              
              {formData.cover_image && (
                <div className="relative inline-block">
                  <img
                    src={formData.cover_image}
                    alt="Cover preview"
                    className="w-32 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleInputChange('cover_image', '')}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Gallery Images</label>
            <div className="space-y-4">
              <input
                ref={galleryImagesRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImagesUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              
              {uploadingGallery && (
                <div className="text-blue-600">Uploading gallery images...</div>
              )}
              
              {formData.galleryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {formData.galleryImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading || uploadingCover || uploadingGallery}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}