export const SERVER_CONFIG = {
  BUCKET_NAME: 'make-2a3badc1-project-images',
  API_PREFIX: '/make-server-2a3badc1',
  SIGNED_URL_EXPIRES: 365 * 24 * 60 * 60, // 1 year
  FILE_SIZE_LIMIT: 10 * 1024 * 1024, // 10MB
  ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp']
};

export const DEFAULT_PROJECTS = [
  {
    id: 'komorebi-house',
    title: 'Komorebi House',
    category: 'architecture',
    location: 'Bangalore, India',
    year: '2024',
    status: 'completed',
    tagline: 'Capturing the essence of filtered light in modern living spaces.',
    description: 'Modern Japanese-inspired architecture with filtered light creating serene living spaces. This project explores the concept of komorebi - the interplay of light and shadows through leaves.',
    cover_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ]
  },
  {
    id: 'urban-sanctuary',
    title: 'Urban Sanctuary',
    category: 'interior',
    location: 'Mumbai, India',
    year: '2024',
    status: 'completed',
    tagline: 'Creating tranquil spaces within the urban chaos.',
    description: 'Luxury high-rise apartment with panoramic city views and sustainable design principles. This interior design project focuses on creating a peaceful retreat in the heart of the city.',
    cover_image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ]
  },
  {
    id: 'zen-garden',
    title: 'Zen Garden',
    category: 'landscape',
    location: 'Goa, India',
    year: '2024',
    status: 'completed',
    tagline: 'Where nature and design find perfect harmony.',
    description: 'Minimalist coastal landscape design with clean lines and seamless integration with the natural environment. This project emphasizes sustainable landscaping and water conservation.',
    cover_image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80'
    ]
  }
];