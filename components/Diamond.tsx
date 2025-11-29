import React from 'react';
import { motion } from 'framer-motion';

const Diamond: React.FC = () => {
  return (
    <div className="w-[300px] h-[300px] perspective-1000 relative flex items-center justify-center">
        <motion.div 
            className="w-full h-full preserve-3d absolute"
            animate={{ rotateY: 360, rotateX: 15 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            {/* Using a simplified octahedron representation via CSS borders/transforms for wireframe look */}
            {/* Top Pyramid */}
            <div className="absolute top-[10%] left-1/2 w-[140px] h-[140px] border border-gold-400/30 origin-bottom -translate-x-1/2 rotate-x-30 bg-gold-900/5 backdrop-blur-sm" style={{ transform: 'translateX(-50%) rotateX(30deg) translateZ(70px)' }} />
            <div className="absolute top-[10%] left-1/2 w-[140px] h-[140px] border border-gold-400/30 origin-bottom -translate-x-1/2 -rotate-x-30 bg-gold-900/5 backdrop-blur-sm" style={{ transform: 'translateX(-50%) rotateX(-30deg) translateZ(-70px)' }} />
            <div className="absolute top-[10%] left-1/2 w-[140px] h-[140px] border border-gold-400/30 origin-bottom -translate-x-1/2 rotate-y-90 rotate-x-30 bg-gold-900/5 backdrop-blur-sm" style={{ transform: 'translateX(-50%) rotateY(90deg) rotateX(30deg) translateZ(70px)' }} />
            <div className="absolute top-[10%] left-1/2 w-[140px] h-[140px] border border-gold-400/30 origin-bottom -translate-x-1/2 rotate-y-90 -rotate-x-30 bg-gold-900/5 backdrop-blur-sm" style={{ transform: 'translateX(-50%) rotateY(90deg) rotateX(-30deg) translateZ(-70px)' }} />

            {/* A center glow */}
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gold-400 rounded-full blur-[20px] -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    </div>
  );
};

export default Diamond;