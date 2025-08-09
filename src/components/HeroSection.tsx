// Replaced missing Figma asset with public logo placeholder

export function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-50 relative px-4">
      <div className="text-center">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[rgba(4,0,252,1)] rounded-full flex items-center justify-center mb-8 mx-auto overflow-hidden breathe-animation">
          <img 
            src="/logo512.png" 
            alt="One Blue Dot Logo" 
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain"
          />
        </div>
      </div>
      
  
    </section>
  );
}