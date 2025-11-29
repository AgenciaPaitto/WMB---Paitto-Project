import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: House outline
    const t1 = setTimeout(() => setStage(1), 500);
    // Stage 2: Morph to diamond
    const t2 = setTimeout(() => setStage(2), 2500);
    // Stage 3: Complete
    const t3 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        <AnimatePresence mode="wait">
           {/* Abstract House Outline */}
           {stage < 2 && (
             <motion.svg 
               key="house"
               width="100" height="100" viewBox="0 0 100 100"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
               className="absolute"
             >
               <motion.path 
                 d="M10,40 L50,10 L90,40 L90,90 L10,90 Z"
                 fill="transparent"
                 stroke="#D4AF37"
                 strokeWidth="1"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
               />
             </motion.svg>
           )}

           {/* Diamond Shape */}
           {stage >= 2 && (
             <motion.svg 
               key="diamond"
               width="100" height="100" viewBox="0 0 100 100"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="absolute"
             >
               <motion.path 
                 d="M50,10 L90,50 L50,90 L10,50 Z"
                 fill="transparent"
                 stroke="#D4AF37"
                 strokeWidth="1"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
               />
               <motion.path
                  d="M50,10 L50,90 M10,50 L90,50"
                   fill="transparent"
                   stroke="#D4AF37"
                   strokeWidth="0.5"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 0.5 }}
                   transition={{ delay: 0.5, duration: 1 }}
               />
             </motion.svg>
           )}
        </AnimatePresence>
      </div>
      
      <motion.p 
        className="absolute bottom-10 font-serif text-gold-400 tracking-widest text-xs uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage > 0 ? 1 : 0 }}
      >
        WM Bustamante
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;