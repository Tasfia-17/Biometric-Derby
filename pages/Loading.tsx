import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../App';
import PageTransition from '../components/PageTransition';
import { useBiometricAnalysis } from '../hooks/useFaceMatch';
import { Dna } from 'lucide-react';

const loadingMessages = [
  "Analyzing chromosomal compatibility...",
  "Cross-referencing genetic markers...",
  "Simulating meiotic division...",
  "Calculating potential for hereditary traits...",
  "Querying historical biometric database...",
  "Compiling predictive legacy report...",
];

const Loading: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const { analyze } = useBiometricAnalysis();
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!context?.celebrityA || !context?.celebrityB) {
      navigate('/selection');
      return;
    }

    analyze(context.celebrityA, context.celebrityB).then((analysisResult) => {
      if (context) {
        context.setAnalysis(analysisResult);
      }
      setProgress(100);
      setTimeout(() => navigate('/race'), 1500);
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);
    
    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(p + 5, 99));
    }, 250);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Dna size={96} className="text-white" />
        </motion.div>
        <h1 className="mt-8 text-4xl font-heading">ANALYZING...</h1>
        <div className="w-full max-w-md mt-8 overflow-hidden border-2 h-8 border-white p-1">
            <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
        </div>
        <AnimatePresence mode="wait">
            <motion.p 
                key={currentMessage}
                className="mt-4 text-xl text-gray-400 font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {currentMessage}
            </motion.p>
        </AnimatePresence>
        {progress === 100 && (
            <motion.h2 
                className="mt-12 text-5xl font-heading text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                ANALYSIS COMPLETE
            </motion.h2>
        )}
      </div>
    </PageTransition>
  );
};

export default Loading;
