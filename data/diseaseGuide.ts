/**
 * Rule-based disease treatment & prevention guide for Burundi.
 * Used for UI Section 2 when a disease is detected from crop image.
 */

export type SeverityLevel = 'Low' | 'Medium' | 'High';

export interface DiseaseGuideEntry {
  prevention: string[];
  organic: { name: string; howToApply: string; frequency: string };
  chemical?: { name: string; dosage: string; timing: string };
}

const DISEASE_GUIDES: Record<string, DiseaseGuideEntry> = {
  'leaf blight': {
    prevention: ['Remove and burn infected leaves.', 'Rotate with non-host crops (e.g. beans).', 'Avoid overhead watering; water at base.'],
    organic: { name: 'Copper-based spray (Bordeaux or copper soap)', howToApply: 'Spray on leaves (top and bottom) until runoff. Apply in cool morning.', frequency: 'Every 7–10 days until controlled.' },
    chemical: { name: 'Chlorothalonil (generic)', dosage: 'As per label (e.g. 30–50 ml per 15 L water).', timing: 'First sign of spots; repeat every 7–10 days. Stop before harvest as per label.' },
  },
  'rust': {
    prevention: ['Remove crop residues after harvest.', 'Rotate with non-cereal crops for 1–2 years.', 'Space plants for air flow; avoid excess nitrogen.'],
    organic: { name: 'Neem oil or sulphur spray', howToApply: 'Spray leaves thoroughly; cover both sides. Best in early morning.', frequency: 'Every 7 days until no new pustules.' },
    chemical: { name: 'Triazole fungicide (e.g. tebuconazole)', dosage: 'As per product label.', timing: 'At first signs of rust; max 2–3 applications per season.' },
  },
  'streak': {
    prevention: ['Plant resistant or tolerant varieties where available.', 'Control weeds (hosts for vectors).', 'Avoid late planting in high-risk areas.'],
    organic: { name: 'No curative treatment; remove infected plants', howToApply: 'Uproot and destroy severely infected plants to limit spread.', frequency: 'As soon as symptoms appear.' },
    chemical: { name: 'Virus not treatable with chemicals', dosage: 'N/A', timing: 'Prevention only; control vectors if applicable.' },
  },
  'blight': {
    prevention: ['Use certified seed; avoid planting in wet, cold soil.', 'Improve drainage; avoid waterlogging.', 'Rotate out of potatoes/tomatoes for 2–3 years.'],
    organic: { name: 'Copper-based fungicide', howToApply: 'Spray foliage and stems; start before wet weather.', frequency: 'Every 7–10 days in rainy or humid periods.' },
    chemical: { name: 'Metalaxyl or mancozeb (as per label)', dosage: 'Follow label for potato/tomato blight.', timing: 'Preventive at emergence; repeat if weather favours disease.' },
  },
  'anthracnose': {
    prevention: ['Use disease-free seed; treat seed if recommended.', 'Rotate with non-host crops.', 'Avoid working in field when plants are wet.'],
    organic: { name: 'Copper soap or sulphur', howToApply: 'Spray all above-ground parts; good coverage.', frequency: 'Every 7–10 days.' },
    chemical: { name: 'Chlorothalonil or azoxystrobin (generic)', dosage: 'As per label.', timing: 'First signs; repeat at label interval.' },
  },
  'mosaic': {
    prevention: ['Use virus-free planting material.', 'Control aphids and whiteflies (vectors).', 'Remove and destroy infected plants early.'],
    organic: { name: 'No cure; remove infected plants', howToApply: 'Uproot and burn or bury infected plants.', frequency: 'As soon as detected.' },
    chemical: { name: 'No effective chemical for virus', dosage: 'N/A', timing: 'Prevention and vector control only.' },
  },
  'powdery mildew': {
    prevention: ['Improve air circulation; avoid dense planting.', 'Remove severely infected leaves.', 'Avoid excess nitrogen.'],
    organic: { name: 'Sulphur or baking soda spray (1 tsp/L water)', howToApply: 'Spray on leaves, both sides; avoid hot midday sun.', frequency: 'Every 7 days until controlled.' },
    chemical: { name: 'Sulphur-based or triazole fungicide', dosage: 'As per label.', timing: 'At first white patches; repeat as label.' },
  },
  'wilt': {
    prevention: ['Use resistant varieties if available.', 'Rotate with non-host crops 2–3 years.', 'Ensure good drainage; avoid overwatering.'],
    organic: { name: 'No effective organic cure; remove plants', howToApply: 'Uproot and destroy infected plants; do not compost.', frequency: 'As soon as wilt is confirmed.' },
    chemical: { name: 'Soil/seed treatment only in some crops; consult extension', dosage: 'As per label and local advice.', timing: 'Preventive at planting.' },
  },
};

const PREVENTION_CHECKLIST_DEFAULT = [
  'Field hygiene: remove and destroy infected plants and crop residues.',
  'Crop rotation: avoid same family in same plot for 1–2 years.',
  'Water management: water at base, avoid wet foliage; improve drainage.',
];

const ORGANIC_DEFAULT = {
  name: 'Neem oil or copper soap',
  howToApply: 'Spray on leaves (both sides) in early morning. Follow product label.',
  frequency: 'Every 7–10 days until improvement.',
};

const CHEMICAL_DEFAULT = {
  name: 'Contact local extension for recommended product',
  dosage: 'Always follow product label.',
  timing: 'Apply at first signs; respect pre-harvest interval.',
};

export function getDiseaseGuide(diseaseName: string | null | undefined): DiseaseGuideEntry {
  if (!diseaseName || typeof diseaseName !== 'string') {
    return {
      prevention: PREVENTION_CHECKLIST_DEFAULT,
      organic: ORGANIC_DEFAULT,
      chemical: CHEMICAL_DEFAULT,
    };
  }
  const key = diseaseName.toLowerCase().trim();
  for (const [disease, entry] of Object.entries(DISEASE_GUIDES)) {
    if (key.includes(disease) || disease.includes(key)) return entry;
  }
  return {
    prevention: PREVENTION_CHECKLIST_DEFAULT,
    organic: ORGANIC_DEFAULT,
    chemical: CHEMICAL_DEFAULT,
  };
}

export function getSeverityFromConfidence(confidence: number): SeverityLevel {
  if (confidence >= 80) return 'High';
  if (confidence >= 50) return 'Medium';
  return 'Low';
}
