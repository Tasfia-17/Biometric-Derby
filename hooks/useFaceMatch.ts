import { useState, useCallback } from 'react';
import { BiometricAnalysis, CelebrityProfile, WikipediaArticle } from '../types';

const generateArticle = (
  celebA: CelebrityProfile,
  celebB: CelebrityProfile,
  analysis: Omit<BiometricAnalysis, 'wikipediaArticle'>,
  winner: CelebrityProfile,
): WikipediaArticle => {
  const loser = winner.id === celebA.id ? celebB : celebA;
  const studyId = `FUSION-${celebA.id.toString().padStart(2, '0')}${celebB.id.toString().padStart(2, '0')}-${Math.floor(Math.random() * 9000) + 1000}`;

  return {
    studyId: `Biometric Study: ${studyId}`,
    abstract: `This document outlines the projected outcome of a hypothetical genetic fusion between the biometric data of ${celebA.name} and ${celebB.name}. The motility simulation determined that the genetic analogue from ${winner.name} exhibited superior viability. This report extrapolates on the potential phenotype and socio-historical impact.`,
    phenotypeProjection: `The resulting entity is projected to inherit a complex mosaic of traits. The dominant traits identified were ${analysis.dominantTraits.join(' and ')}. Analysis of the (simulated) Karyotype-L7 indicates a high probability of inheriting ${winner.name}'s strategic acumen, while integrating ${loser.name}'s creative or philosophical inclinations. The synergy report—"${analysis.geneticSynergy}"—suggests a near-zero chance of developing mundane interests, such as filing taxes or enjoying daytime television.`,
    impactAnalysis: `The projected legacy is staggering. As our initial analysis suggested, this fusion points toward "${analysis.hypotheticalLegacy}". This individual would likely disrupt multiple fields simultaneously. We predict an 87% probability of them authoring a groundbreaking physics treatise that is also a best-selling opera, or leading a political revolution based on principles of abstract expressionism.`,
    conclusion: `The fusion of ${celebA.name} and ${celebB.name} represents a theoretical apex of human potential, a being capable of both calculating the circumference of a black hole and making a truly excellent sourdough starter. Further simulations are required to determine their stance on pineapple on pizza, a crucial data point currently missing from our models.`
  };
};

const generateProgenyBio = (
  celebA: CelebrityProfile,
  celebB: CelebrityProfile,
  analysis: Omit<BiometricAnalysis, 'wikipediaArticle' | 'progenyBio'>,
): string => {
  const bios = [
    `The theoretical progeny of ${celebA.name} and ${celebB.name} would likely be a figure of immense intellectual and creative force. Possessing ${celebA.name}'s analytical rigor and ${celebB.name}'s visionary spirit, they would be uniquely positioned to pioneer new fields of study that bridge the arts and sciences. Their legacy, as suggested by the analysis "${analysis.hypotheticalLegacy}", would not be one of quiet contemplation, but of active, paradigm-shifting discovery. Historians would likely note their uncanny ability to articulate complex scientific principles through hauntingly beautiful poetry, a direct synthesis of their paradoxical genetic heritage.`,
    `A union of ${celebA.name} and ${celebB.name} suggests an individual with a formidable will and a profound capacity for leadership. Drawing on the strategic brilliance of one and the unwavering conviction of the other, this individual could inspire movements and reshape societal norms. The dominant traits of ${analysis.dominantTraits.join(' and ')} point to a personality that is both charismatic and deeply analytical. Their life's work would likely involve the establishment of new philosophical or social frameworks, challenging the status quo with a combination of rigorous logic and passionate rhetoric.`,
    `From the genetic synergy of ${celebA.name} and ${celebB.name}, one could project the emergence of a transcendent artist. This individual would inherit a deep well of emotional intelligence and a revolutionary approach to their chosen medium. Their work, whether in literature, music, or visual arts, would be characterized by a startling originality, blending disparate styles and ideas into a cohesive, powerful whole. The high compatibility in creative loci suggests a natural fluency in expression, allowing them to translate the most abstract of concepts into tangible, moving experiences for a global audience.`
  ];
  return bios[Math.floor(Math.random() * bios.length)];
};


export const useBiometricAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback((celebA: CelebrityProfile, celebB: CelebrityProfile): Promise<BiometricAnalysis> => {
    setIsLoading(true);
    setError(null);

    // Simulate complex API call delay
    return new Promise((resolve) => {
      setTimeout(() => {

        const partialAnalysis = {
          compatibility: Math.random() * 50 + 50, // 50-100%
          dominantTraits: [
            "Intellectual Prowess",
            "Artistic Vision",
            "Unyielding Resolve",
            "Charismatic Influence",
            "Pioneering Spirit"
          ].sort(() => 0.5 - Math.random()).slice(0, 2),
          hypotheticalLegacy: [
            `A legacy defined by revolutionary breakthroughs in both arts and sciences.`,
            `The resulting progeny would likely possess a sharp, analytical mind paired with a profound creative drive.`,
            `A potential for leadership that could reshape political landscapes through sheer force of will and intellect.`,
            `This combination suggests a predisposition for challenging established dogmas and forging new paradigms.`,
          ][Math.floor(Math.random() * 4)],
          geneticSynergy: [
            "High compatibility in loci associated with creativity.",
            "Moderate divergence in markers for strategic thinking.",
            "Strong resonance in genetic sequences related to perseverance.",
            "Optimal pairing for abstract reasoning and problem-solving.",
          ][Math.floor(Math.random() * 4)]
        };

        // This is a simplification; in the real app, the winner would be passed from the race.
        // For the hook, we'll just pick one randomly to generate the text.
        const simulatedWinner = Math.random() > 0.5 ? celebA : celebB;
        
        const wikipediaArticle = generateArticle(celebA, celebB, partialAnalysis, simulatedWinner);
        const progenyBio = generateProgenyBio(celebA, celebB, partialAnalysis);

        const analysis: BiometricAnalysis = {
          ...partialAnalysis,
          wikipediaArticle,
          progenyBio,
        };
        
        setIsLoading(false);
        resolve(analysis);
      }, 3000 + Math.random() * 2000); // 3-5 second delay
    });
  }, []);

  return { analyze, isLoading, error };
};