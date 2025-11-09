export interface CelebrityProfile {
  id: number;
  name: string;
  imageUrl: string;
  bioSnippet: string;
  baseSpeed: number; // Represents inherent drive or ambition
  stamina: number; // Represents resilience or longevity of influence
}

export interface WikipediaArticle {
  studyId: string;
  abstract: string;
  phenotypeProjection: string;
  impactAnalysis: string;
  conclusion: string;
}

export interface BiometricAnalysis {
  compatibility: number;
  dominantTraits: string[];
  hypotheticalLegacy: string;
  geneticSynergy: string;
  wikipediaArticle: WikipediaArticle;
  progenyBio?: string;
}

export interface Racer {
  id: number;
  name: string;
  profile: CelebrityProfile;
  progress: number;
  faceUrl: string;
}

export interface RaceResult {
  winner: Racer;
  analysis: BiometricAnalysis;
  contenderA: CelebrityProfile;
  contenderB: CelebrityProfile;
}