import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectSectionProps {
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  isReversed?: boolean;
}

export function ProjectSection({ title, location, image, imageAlt, isReversed = false }: ProjectSectionProps) {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />

      </div>
      

      
      {/* Project title overlay */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-white">
        <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)' }}>
          {title} | {location}
        </h3>
      </div>
    </section>
  );
}