import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/ui/AnimatedButton';
import PageTransition from '../components/PageTransition';
import { Dna, FlaskConical, BookOpen } from 'lucide-react';

const Home: React.FC = () => {
  const title = "Biometric Derby";
  
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
        <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden text-center bg-black">
            <main className="z-10 flex flex-col items-center">
                <motion.h1 
                    className="mb-4 text-6xl md:text-8xl font-heading"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                >
                {title.split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block">
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
                </motion.h1>
                <motion.p 
                    className="mb-8 text-xl text-gray-400 md:text-2xl font-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1.5, duration: 1 } }}
                >
                    A Speculative Simulation of Genetic Legacy.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 2 } }}
                >
                    <Link to="/selection">
                        <AnimatedButton onClick={() => {}}>
                            Begin Simulation
                        </AnimatedButton>
                    </Link>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 gap-8 mt-24 md:grid-cols-3 max-w-4xl"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.2, delayChildren: 2.5 } }
                    }}
                >
                    <FeatureCard icon={<Dna size={40}/>} title="Biometric Analysis" description="Analyze compatibility between historical genetic codes." />
                    <FeatureCard icon={<FlaskConical size={40}/>} title="Simulated Motility" description="Witness a theoretical race for genetic viability." />
                    <FeatureCard icon={<BookOpen size={40}/>} title="Hypothetical Legacy" description="Explore the potential outcome of a genetic union." />
                </motion.div>
            </main>
        </div>
    </PageTransition>
  );
};

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <motion.div 
            className="flex flex-col items-center p-6 border border-gray-600"
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
            }}
        >
            <div>{icon}</div>
            <h3 className="mt-4 text-2xl font-heading">{title}</h3>
            <p className="mt-2 text-gray-400 font-body">{description}</p>
        </motion.div>
    )
}

export default Home;
