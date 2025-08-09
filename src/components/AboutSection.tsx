interface AboutSectionProps {
  title?: string;
}

export function AboutSection({ title }: AboutSectionProps) {
  const defaultTitle = "Designing\nImmersive and\nArt-driven spaces";
  const displayTitle = title || defaultTitle;
  
  return (
    <section id="about" className="min-h-[60vh] md:h-[60vh] flex items-center justify-center bg-white px-4 sm:px-6 py-8 md:py-0">
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
            {displayTitle.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < displayTitle.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>
        </div>
        
        <div className="space-y-4 md:space-y-6" style={{ fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p className="leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
            <strong>ONE BLUE DOT</strong> means Crafting bespoke, meaningful spaces as 
            distinctive as the planet itself.
          </p>
          
          <p className="leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
            Our aim is to blend art, sustainability, and modern luxury to create 
            timeless designs tailored to each client's lifestyle and micro needs.
          </p>
          
          <p className="leading-relaxed" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
            To create it, we have to ask the right questions, research, rethink, re-
            everything. This is the only way to ensure that our clients get that 
            functional, powerful visual and physical dream they've been looking 
            for.
          </p>
        </div>
      </div>
    </section>
  );
}