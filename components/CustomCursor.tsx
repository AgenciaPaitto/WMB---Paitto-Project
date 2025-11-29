import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div className={`
          relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out
          ${isPointer ? 'w-12 h-12 border-gold-400 opacity-80' : 'w-4 h-4 border-white opacity-50'}
          border border-solid rounded-full flex items-center justify-center
        `}>
          <div className="w-[1px] h-full bg-current absolute top-0 left-1/2 -translate-x-1/2" />
          <div className="h-[1px] w-full bg-current absolute left-0 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;