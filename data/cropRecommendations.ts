/**
 * Rule-based crop recommendations for Burundi only.
 * UI Section 1: Crop Recommendation by Region. No Kirundi; EN/FR only.
 */

export type Season = 'rainy' | 'dry';
export type YieldLevel = 'Low' | 'Medium' | 'High';
export type WaterNeed = 'Low' | 'Medium' | 'High';

export interface CropRecommendation {
  id: string;
  nameEn: string;
  nameFr: string;
  whyFits: string;
  expectedYield: YieldLevel;
  waterNeed: WaterNeed;
  plantingPeriod: string;
  spacing: string;
  careAdvice: string;
}

/** Burundi provinces/zones only. Non-Burundi locations are not supported. */
export const PROVINCES_ZONES: { value: string; labelEn: string; labelFr: string }[] = [
  { value: 'bujumbura', labelEn: 'Bujumbura', labelFr: 'Bujumbura' },
  { value: 'gitega', labelEn: 'Gitega', labelFr: 'Gitega' },
  { value: 'ngozi', labelEn: 'Ngozi', labelFr: 'Ngozi' },
  { value: 'kirundo', labelEn: 'Kirundo', labelFr: 'Kirundo' },
  { value: 'bururi', labelEn: 'Bururi', labelFr: 'Bururi' },
  { value: 'makamba', labelEn: 'Makamba', labelFr: 'Makamba' },
  { value: 'muyinga', labelEn: 'Muyinga', labelFr: 'Muyinga' },
  { value: 'rutana', labelEn: 'Rutana', labelFr: 'Rutana' },
  { value: 'cibitoke', labelEn: 'Cibitoke', labelFr: 'Cibitoke' },
  { value: 'kayanza', labelEn: 'Kayanza', labelFr: 'Kayanza' },
];

const CROPS_RAINY: CropRecommendation[] = [
  { id: 'maize', nameEn: 'Maize', nameFr: 'Maïs', whyFits: 'Main rainy-season staple in Burundi; good moisture for growth.', expectedYield: 'High', waterNeed: 'Medium', plantingPeriod: 'Sept–Oct or Feb–Mar', spacing: '75–90 cm between rows, 25–30 cm between plants', careAdvice: 'Weed early; top-dress with nitrogen at 6 weeks.' },
  { id: 'beans', nameEn: 'Beans', nameFr: 'Haricots', whyFits: 'Fixes nitrogen; fits rotation with maize in local conditions.', expectedYield: 'Medium', waterNeed: 'Low', plantingPeriod: 'Oct–Nov or Feb–Mar', spacing: '50 cm between rows, 10 cm between plants', careAdvice: 'Keep soil moist at flowering; avoid waterlogging.' },
  { id: 'rice', nameEn: 'Rice', nameFr: 'Riz', whyFits: 'Suitable in marshland and irrigated areas in Burundi.', expectedYield: 'High', waterNeed: 'High', plantingPeriod: 'Nov–Dec or Mar–Apr', spacing: '20×20 cm for transplanting', careAdvice: 'Level fields; control weeds until canopy closes.' },
  { id: 'cassava', nameEn: 'Cassava', nameFr: 'Manioc', whyFits: 'Drought-tolerant; stores well; fits long rainy season.', expectedYield: 'High', waterNeed: 'Low', plantingPeriod: 'Oct–Nov or Mar–Apr', spacing: '1 m × 1 m', careAdvice: 'Plant stakes 15–20 cm; weed first 3 months.' },
];

const CROPS_DRY: CropRecommendation[] = [
  { id: 'beans_short', nameEn: 'Short-season beans', nameFr: 'Haricots courte durée', whyFits: 'Quick cycle using residual moisture; suits dry transition.', expectedYield: 'Medium', waterNeed: 'Low', plantingPeriod: 'Jun–Jul (early dry)', spacing: '50 cm between rows, 10 cm between plants', careAdvice: 'Plant at first rains of dry-season transition; mulch.' },
  { id: 'irish_potato', nameEn: 'Irish potato', nameFr: 'Pomme de terre', whyFits: 'Cool-season crop; fits highlands in dry period.', expectedYield: 'High', waterNeed: 'Medium', plantingPeriod: 'Jun–Jul or Jan–Feb', spacing: '75 cm between rows, 30 cm in row', careAdvice: 'Use certified seed; hill when 15–20 cm tall.' },
  { id: 'tomato', nameEn: 'Tomato', nameFr: 'Tomate', whyFits: 'Fewer diseases in dry season; good for local market.', expectedYield: 'Medium', waterNeed: 'Medium', plantingPeriod: 'Jun–Aug or Jan–Mar', spacing: '60 cm × 50 cm', careAdvice: 'Stake or trellis; water at base.' },
  { id: 'cabbage', nameEn: 'Cabbage', nameFr: 'Chou', whyFits: 'Cool, dry conditions reduce pests and rot.', expectedYield: 'Medium', waterNeed: 'Medium', plantingPeriod: 'Jun–Jul or Dec–Jan', spacing: '50 cm × 50 cm', careAdvice: 'Transplant seedlings; keep even moisture for head formation.' },
];

/** Returns 2–4 crops for Burundi only. Zone must be a Burundi province. */
export function getCropRecommendations(season: Season, zone: string): CropRecommendation[] {
  const list = season === 'rainy' ? CROPS_RAINY : CROPS_DRY;
  const validZone = PROVINCES_ZONES.some((z) => z.value === zone);
  if (!validZone || !zone) return [];
  return list.slice(0, 4);
}
