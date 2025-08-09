import { Project } from './api';

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'demo-project-1',
    title: 'OBD Studio',
    category: 'interior',
    location: 'Hyderabad, India',
    year: '2023',
    status: 'completed',
    tagline: 'There is beauty in Minimalism and Deep connection with each element that a space comprises of.',
    description: 'This is a demo project showcasing modern interior design principles with a focus on minimalism and functionality.',
    cover_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    galleryImages: []
  }
];

export const DEMO_HOMEPAGE_SETTINGS = { 
  featuredProjects: ['demo-project-1'] 
};