import React, { useState, createContext, useMemo } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Selection from './pages/Upload'; // Renamed Upload to Selection conceptually
import Loading from './pages/Loading';
import Race from './pages/Race';
import Results from './pages/Results';
import { CelebrityProfile, BiometricAnalysis, RaceResult } from './types';

interface AppContextType {
  celebrityA: CelebrityProfile | null;
  setCelebrityA: React.Dispatch<React.SetStateAction<CelebrityProfile | null>>;
  celebrityB: CelebrityProfile | null;
  setCelebrityB: React.Dispatch<React.SetStateAction<CelebrityProfile | null>>;
  analysis: BiometricAnalysis | null;
  setAnalysis: React.Dispatch<React.SetStateAction<BiometricAnalysis | null>>;
  raceResult: RaceResult | null;
  setRaceResult: React.Dispatch<React.SetStateAction<RaceResult | null>>;
}

export const AppContext = createContext<AppContextType | null>(null);

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/race" element={<Race />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [celebrityA, setCelebrityA] = useState<CelebrityProfile | null>(null);
  const [celebrityB, setCelebrityB] = useState<CelebrityProfile | null>(null);
  const [analysis, setAnalysis] = useState<BiometricAnalysis | null>(null);
  const [raceResult, setRaceResult] = useState<RaceResult | null>(null);

  const contextValue = useMemo(() => ({
    celebrityA,
    setCelebrityA,
    celebrityB,
    setCelebrityB,
    analysis,
    setAnalysis,
    raceResult,
    setRaceResult
  }), [celebrityA, celebrityB, analysis, raceResult]);

  return (
    <AppContext.Provider value={contextValue}>
      <HashRouter>
        <div className="relative min-h-screen w-full bg-black font-body dither-bg">
          <AppRoutes />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
