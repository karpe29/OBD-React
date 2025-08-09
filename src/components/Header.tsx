import { useState, useEffect } from 'react';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // No admin logic in the site header; admin is accessible via direct route if needed

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <button 
            onClick={() => (window as any).navigateTo?.('home')}
            className="text-black tracking-wider hover:opacity-70 transition-opacity cursor-pointer"
            style={{ 
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: '600',
              fontSize: 'clamp(0.9em, 2.5vw, 1.25em)',
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              padding: 0
            }}
          >
            ONE BLUE DOT
          </button>
          
          <nav className="flex space-x-4 sm:space-x-8 items-center">
            <button 
              onClick={() => (window as any).navigateTo?.('about')}
              className="text-black hover:text-gray-600 transition-colors tracking-wide cursor-pointer px-2 py-1 min-h-[44px] flex items-center"
              style={{ 
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: '400',
                fontSize: 'clamp(0.8em, 2vw, 1em)',
                background: 'none',
                border: 'none'
              }}
            >
              ABOUT
            </button>
            <button 
              onClick={() => (window as any).navigateTo?.('work')}
              className="text-black hover:text-gray-600 transition-colors tracking-wide cursor-pointer px-2 py-1 min-h-[44px] flex items-center"
              style={{ 
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: '400',
                fontSize: 'clamp(0.8em, 2vw, 1em)',
                background: 'none',
                border: 'none'
              }}
            >
              WORK
            </button>
            <button 
              onClick={() => (window as any).navigateTo?.('contact')}
              className="text-black hover:text-gray-600 transition-colors tracking-wide cursor-pointer px-2 py-1 min-h-[44px] flex items-center"
              style={{ 
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: '400',
                fontSize: 'clamp(0.8em, 2vw, 1em)',
                background: 'none',
                border: 'none'
              }}
            >
              CONTACT
            </button>
          </nav>
        </div>
      </header>

      {/* No admin modal */}
    </>
  );
}