import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../App';
import PageTransition from '../components/PageTransition';
import AnimatedButton from '../components/ui/AnimatedButton';
import { WikipediaArticle } from '../types';

const ArticleDisplay: React.FC<{ article: WikipediaArticle }> = ({ article }) => (
    <div className="p-8 mt-8 border-2 border-white">
        <h3 className="mb-2 text-3xl text-center font-heading">{article.studyId}</h3>
        <p className="mb-4 text-center text-gray-400">An auto-generated speculative report.</p>
        <div className="w-1/4 h-px mx-auto my-6 bg-gray-600"></div>
        
        <h4 className="text-xl font-heading mt-6 mb-2">Abstract</h4>
        <p className="text-lg text-gray-400 font-body">{article.abstract}</p>

        <h4 className="text-xl font-heading mt-6 mb-2">Phenotypic & Cognitive Projections</h4>
        <p className="text-lg text-gray-400 font-body">{article.phenotypeProjection}</p>

        <h4 className="text-xl font-heading mt-6 mb-2">Socio-Historical Impact Analysis</h4>
        <p className="text-lg text-gray-400 font-body">{article.impactAnalysis}</p>

        <h4 className="text-xl font-heading mt-6 mb-2">Conclusion & Further Research</h4>
        <p className="text-lg text-gray-400 font-body">{article.conclusion}</p>
    </div>
);


const Results: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.raceResult) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!context?.raceResult) {
    return null; 
  }

  const { winner, analysis, contenderA, contenderB } = context.raceResult;

  return (
    <PageTransition>
      <div className="min-h-screen px-4 py-8 overflow-y-auto bg-black">
        <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
            }}
        >
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl text-center font-heading"
          >
            Biometric Report
          </motion.h1>

          {analysis.progenyBio && (
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              className="mt-12"
            >
              <h2 className="text-3xl text-center text-gray-300 font-heading">Projected Progeny</h2>
              <div className="w-1/4 h-px mx-auto my-4 bg-gray-600"></div>
              <div className="p-6 mx-auto mt-4 border-2 border-gray-600 max-w-2xl bg-gray-800/20">
                <p className="text-lg text-gray-300 font-body leading-relaxed" style={{ textIndent: '2em' }}>
                  {analysis.progenyBio}
                </p>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="p-8 mt-12 text-center border-2 border-white"
          >
            <h2 className="text-2xl font-body">VICTOR:</h2>
            <p className="text-4xl font-heading">{winner.name.toUpperCase()}</p>
          </motion.div>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2"
          >
            {/* Contenders */}
            <div className="p-6 border border-gray-600">
                <h3 className="mb-4 text-3xl text-center font-heading">Contenders</h3>
                <div className="flex items-start justify-around">
                    <div className="text-center">
                        <img src={contenderA.imageUrl} alt={contenderA.name} className="object-cover w-32 h-32 mx-auto mb-2 border-2 border-white"/>
                        <p className="font-bold">{contenderA.name}</p>
                    </div>
                     <div className="pt-16 text-4xl font-heading">&</div>
                     <div className="text-center">
                        <img src={contenderB.imageUrl} alt={contenderB.name} className="object-cover w-32 h-32 mx-auto mb-2 border-2 border-white"/>
                        <p className="font-bold">{contenderB.name}</p>
                    </div>
                </div>
            </div>
            {/* Analysis */}
            <div className="p-6 border border-gray-600">
                <h3 className="mb-4 text-3xl text-center font-heading">Analysis</h3>
                <p className="text-xl font-body">COMPATIBILITY: {analysis.compatibility.toFixed(2)}%</p>
                <p className="mt-2 text-xl font-body">GENETIC SYNERGY: <span className="text-gray-400">{analysis.geneticSynergy}</span></p>
                <p className="mt-2 text-xl font-body">DOMINANT TRAITS:</p>
                <ul className="ml-4 text-gray-400 list-disc list-inside font-body">
                    {analysis.dominantTraits.map(t => <li key={t}>{t}</li>)}
                </ul>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="p-6 mt-8 border border-gray-600"
          >
            <h3 className="mb-2 text-3xl text-center font-heading">Hypothetical Legacy</h3>
            <p className="text-lg text-gray-400 font-body">{analysis.hypotheticalLegacy}</p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <ArticleDisplay article={analysis.wikipediaArticle} />
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} 
            className="mt-12 text-center"
          >
            <AnimatedButton onClick={() => navigate('/selection')}>
              New Simulation
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Results;