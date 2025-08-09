import { useEffect, useState } from 'react';

interface LoaderProps {
  /** Size of the dot in pixels */
  size?: number;
  /** Duration of the breathing animation in seconds */
  duration?: number;
  /** Color of the dot */
  color?: string;
  /** Whether to show the loader */
  isVisible?: boolean;
  /** Callback when the loader finishes hiding */
  onHideComplete?: () => void;
}

export function Loader({
  size = 40,
  duration = 2,
  color = 'rgb(4, 0, 255)',
  isVisible = true,
  onHideComplete
}: LoaderProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (!isVisible) {
      // Start the hide animation
      const timer = setTimeout(() => {
        setShouldRender(false);
        onHideComplete?.();
      }, 500); // Match the CSS transition duration

      return () => clearTimeout(timer);
    } else {
      setShouldRender(true);
    }
  }, [isVisible, onHideComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`flex items-center justify-center transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
      }}
    >
      <div
        className="breathing-dot"
        style={{
          width: `clamp(30px, ${size * 0.026}vw, ${size}px)`,
          height: `clamp(30px, ${size * 0.026}vw, ${size}px)`,
          backgroundColor: color,
          borderRadius: '50%'
        }}
      />
    </div>
  );
}
