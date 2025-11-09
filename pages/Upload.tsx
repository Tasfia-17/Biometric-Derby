import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../App';
import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/ui/AnimatedButton';
import { celebrityProfiles } from '../data/spermData';
import { CelebrityProfile } from '../types';
import { Check } from 'lucide-react';

const Selection: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleSelect = (celebrity: CelebrityProfile) => {
    if (!context) return;
    if (context.celebrityA?.id === celebrity.id || context.celebrityB?.id === celebrity.id) return;

    if (!context.celebrityA) {
      context.setCelebrityA(celebrity);
    } else if (!context.celebrityB) {
      context.setCelebrityB(celebrity);
    }
  };

  const handleStart = () => {
    if (context?.celebrityA && context?.celebrityB) {
      navigate('/loading');
    }
  };
  
  const handleReset = () => {
    if (!context) return;
    context.setCelebrityA(null);
    context.setCelebrityB(null);
  }

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
        <h1 className="mb-4 text-5xl text-center font-heading">Select Two Contenders</h1>
        <p className="mb-8 text-xl text-gray-400 font-body">Choose the genetic source material for the simulation.</p>

        <div className="flex flex-col items-center justify-center gap-8 mb-8 md:flex-row">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-body">Contender A</h2>
                <div className="flex items-center justify-center w-48 h-12 mt-2 text-xl text-center border border-dashed border-gray-400">
                    {context?.celebrityA ? context.celebrityA.name : '...'}
                </div>
            </div>
            <div className="text-4xl font-heading">&</div>
             <div className="flex flex-col items-center">
                <h2 className="text-2xl font-body">Contender B</h2>
                <div className="flex items-center justify-center w-48 h-12 mt-2 text-xl text-center border border-dashed border-gray-400">
                    {context?.celebrityB ? context.celebrityB.name : '...'}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl">
          {celebrityProfiles.map((celeb) => {
            const isSelected = context?.celebrityA?.id === celeb.id || context?.celebrityB?.id === celeb.id;
            return (
              <motion.div
                key={celeb.id}
                className={`p-4 border-2 cursor-pointer transition-colors duration-200 relative ${isSelected ? 'border-white bg-white/20' : 'border-gray-600 hover:bg-gray-800'}`}
                onClick={() => handleSelect(celeb)}
                whileHover={{ scale: 1.05 }}
              >
                {isSelected && <Check size={24} className="absolute top-2 right-2"/>}
                <img src={celeb.imageUrl} alt={celeb.name} className="object-cover w-full h-32 mb-2" />
                <p className="text-lg font-bold font-heading">{celeb.name}</p>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-8 space-x-4">
            <AnimatedButton 
                onClick={handleStart} 
                disabled={!context?.celebrityA || !context?.celebrityB}
            >
              Begin Analysis
            </AnimatedButton>
            <button onClick={handleReset} className="px-8 py-3 text-xl font-body text-gray-400 uppercase hover:text-white">
                Reset
            </button>
        </div>

      </div>
    </PageTransition>
  );
};

export default Selection;
