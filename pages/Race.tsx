import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { AppContext } from '../App';
import PageTransition from '../components/PageTransition';
import { commentaryLines } from '../data/commentary';
import { Racer } from '../types';

const GameteRacer: React.FC<{ racer: Racer, progress: number }> = ({ racer, progress }) => {

  return (
    <motion.div 
      className="absolute h-12 transition-all duration-100 ease-linear flex items-center"
      initial={{ left: '0%' }}
      animate={{ left: `calc(${progress}% - 24px)` }}
      style={{ top: racer.id === 1 ? '25%' : '75%', transform: 'translateY(-50%)' }}
    >
        <img src={racer.faceUrl} alt={racer.name} className="w-12 h-12 border-2 border-white rounded-full bg-black object-cover"/>
        <div className="w-16 h-px bg-white -ml-2"></div>
    </motion.div>
  );
};


const Race: React.FC = () => {
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const [racers, setRacers] = useState<Racer[]>([]);
    const [commentary, setCommentary] = useState(commentaryLines.start[0]);
    const [isRaceFinished, setIsRaceFinished] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!context?.celebrityA || !context.celebrityB || !context.analysis) {
            navigate('/selection');
            return;
        }

        const initialRacers: Racer[] = [
            { id: 1, name: context.celebrityA.name, profile: context.celebrityA, progress: 0, faceUrl: context.celebrityA.imageUrl },
            { id: 2, name: context.celebrityB.name, profile: context.celebrityB, progress: 0, faceUrl: context.celebrityB.imageUrl }
        ];
        setRacers(initialRacers);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (racers.length > 0 && !isRaceFinished) {
            intervalRef.current = setInterval(() => {
                let winner: Racer | null = null;
                const updatedRacers = racers.map(racer => {
                    if (racer.progress >= 100) return racer;

                    const speedBoost = (Math.random() * 0.4 + racer.profile.baseSpeed) * 0.7;
                    const newProgress = Math.min(racer.progress + speedBoost, 100);
                    
                    if (newProgress >= 100 && !winner) {
                        winner = { ...racer, progress: 100 };
                    }
                    return { ...racer, progress: newProgress };
                });
                
                setRacers(updatedRacers);

                if (winner) {
                    setIsRaceFinished(true);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    
                    if (context) {
                        context.setRaceResult({
                            winner,
                            analysis: context.analysis!,
                            contenderA: context.celebrityA!,
                            contenderB: context.celebrityB!,
                        });
                    }

                    setCommentary(commentaryLines.finish[Math.floor(Math.random() * commentaryLines.finish.length)]);

                    setTimeout(() => navigate('/results'), 3000);
                } else if (Math.random() < 0.1) {
                    setCommentary(commentaryLines.event[Math.floor(Math.random() * commentaryLines.event.length)]);
                }
            }, 100);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [racers, isRaceFinished, context, navigate]);

    return (
        <PageTransition>
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
                <h1 className="mb-8 text-5xl text-center font-heading">Motility Simulation</h1>
                <div className="relative w-full max-w-5xl h-64 border-y-2 border-white overflow-hidden">
                    {racers.map(racer => (
                        <GameteRacer key={racer.id} racer={racer} progress={racer.progress} />
                    ))}
                    <div className="absolute top-0 right-0 w-2 h-full bg-white"/>
                </div>
                <div className="fixed bottom-5 left-5 z-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={commentary}
                            className="p-4 bg-black border-2 border-white max-w-sm font-body text-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {commentary}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </PageTransition>
    );
};

export default Race;
