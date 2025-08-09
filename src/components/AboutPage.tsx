// Removed Figma asset imports that are unavailable in Vite
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AboutSection } from './AboutSection';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <AboutSection title="ABOUT" />

      {/* Philosophy Section */}
      <section className="min-h-[60vh] md:h-[60vh] flex items-center justify-center bg-white px-4 sm:px-6 py-8 md:py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h1 
              className="leading-tight mb-6 md:mb-8"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
                lineHeight: '1.1'
              }}
            >
              PHILOSOPHY
            </h1>
          </div>
          
          <div className="space-y-6 md:space-y-8" style={{ fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            <p className="leading-relaxed mb-6 md:mb-8" style={{ 
              color: '#292929',
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
            }}>
              At <span style={{ color: 'rgb(4, 0, 255)' }}>One Blue Dot</span>, our philosophy is guided by three essential beliefs:
            </p>
            
            {/* Philosophy Points */}
            <div className="space-y-6 md:space-y-8">
              {/* Make it Simple & Sensitive */}
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'Graphik, Arial, sans-serif',
                    fontWeight: '600',
                    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                    lineHeight: '1.4',
                    color: 'rgb(40, 40, 40)',
                    fontStyle: 'italic'
                  }}
                >
                  Make it Simple & Sensitive
                </h3>
                <p className="leading-relaxed" style={{ 
                  color: '#292929',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                }}>
                  Our practice focuses on creating designs that are elegant, functional, and responsive to their context. We strive to distill 
                  complex ideas into clear and uncomplicated forms, while being sensitive to the needs and experiences of users, communities, and 
                  the environment.
                </p>
              </div>

              {/* Make it Natural */}
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'Graphik, Arial, sans-serif',
                    fontWeight: '600',
                    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                    lineHeight: '1.4',
                    color: 'rgb(40, 40, 40)',
                    fontStyle: 'italic'
                  }}
                >
                  Make it Natural
                </h3>
                <p className="leading-relaxed" style={{ 
                  color: '#292929',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                }}>
                  Drawing inspiration from the delicate balance of our blue planet, we approach each project with a deep sense of responsibility and 
                  stewardship. Natural elements like air, light and greenscape fosters tranquil living and allows a safe space to cultivate a positive 
                  attitude.
                </p>
              </div>

              {/* Make it Diverse */}
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: 'Graphik, Arial, sans-serif',
                    fontWeight: '600',
                    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
                    lineHeight: '1.4',
                    color: 'rgb(40, 40, 40)',
                    fontStyle: 'italic'
                  }}
                >
                  Make it Diverse
                </h3>
                <p className="leading-relaxed" style={{ 
                  color: '#292929',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                }}>
                  Our design practice is driven by a passion for collaboration and exploration of diverse cultures, traditions, and architectural styles. 
                  We derive inspiration by integrating elements from around the world to create unique ones that are both timeless and forward-thinking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="min-h-[60vh] md:h-[60vh] flex items-center justify-center bg-white px-4 sm:px-6 py-8 md:py-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h1 
              className="leading-tight mb-6 md:mb-8"
              style={{ 
                fontFamily: 'Arial, sans-serif',
                fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
                lineHeight: '1.1'
              }}
            >
              FOUNDER
            </h1>
          </div>
          
          <div className="space-y-4 md:space-y-6" style={{ fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            {/* Photo */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 mb-6 md:mb-8 overflow-hidden rounded-lg mx-auto lg:mx-0">
              <ImageWithFallback
                src={`${import.meta.env.BASE_URL}Founder.png`}
                alt="Ar. Shweta Arade"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Name */}
            <h3
              className="mb-2 text-center lg:text-left"
              style={{
                fontFamily: 'Graphik, Arial, sans-serif',
                fontWeight: '600',
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                lineHeight: '1.4',
                color: 'rgb(4, 0, 255)'
              }}
            >
              Ar. Shweta Arade
            </h3>
            
            {/* Bio */}
            <div className="space-y-3 md:space-y-4 text-center lg:text-left">
              <p
                className="leading-relaxed"
                style={{
                  fontFamily: 'Graphik, Arial, sans-serif',
                  fontWeight: '500',
                  fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                  lineHeight: '1.6',
                  color: '#292929'
                }}
              >
                Founder | Head Architect
              </p>
              
              <p className="leading-relaxed" style={{ 
                color: '#292929',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
              }}>
                With over 10 years of experience in the field of architecture Shweta is a 
                seasoned architect renowned for her innovative designs and attention to 
                detail. She has worked on a diverse range of projects spanning residential, 
                commercial, and institutional sectors, earning accolades for their creativity 
                and expertise, in Australia and India.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}