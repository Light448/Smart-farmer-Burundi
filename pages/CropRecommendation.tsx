import React, { useState } from 'react';
import { MapPin, Calendar, Leaf, ChevronDown, ChevronUp, Droplets, BarChart3, Lightbulb } from 'lucide-react';
import { PROVINCES_ZONES, getCropRecommendations, type Season, type CropRecommendation } from '../data/cropRecommendations';

interface Props {
  lang: 'en' | 'fr';
}

const CropRecommendationPage: React.FC<Props> = ({ lang }) => {
  const [zone, setZone] = useState('');
  const [season, setSeason] = useState<Season>('rainy');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isEn = lang === 'en';
  const crops = zone ? getCropRecommendations(season, zone) : [];
  const zoneLabel = PROVINCES_ZONES.find((z) => z.value === zone);
  const locationLabel = zoneLabel ? (isEn ? zoneLabel.labelEn : zoneLabel.labelFr) : '—';
  const seasonLabel = season === 'rainy' ? (isEn ? 'Rainy' : 'Pluvieuse') : (isEn ? 'Dry' : 'Sèche');

  const isBurundiZone = zone && PROVINCES_ZONES.some((z) => z.value === zone);
  const burundiOnlyMessage = isEn
    ? 'This service currently supports farming recommendations within Burundi only.'
    : 'Ce service propose des recommandations agricoles uniquement au Burundi.';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-10">
      {/* Section title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Leaf className="text-green-600" />
        {isEn ? 'Crop Recommendation by Region' : 'Recommandation de cultures par région'}
      </h1>
      <p className="text-gray-600 text-sm mb-1">
        {isEn ? 'Select a Burundi province and season. Recommendations are for Burundi only.' : 'Sélectionnez une province du Burundi et la saison. Recommandations pour le Burundi uniquement.'}
      </p>
      <p className="text-amber-700 text-xs mb-6 bg-amber-50 border border-amber-100 rounded px-3 py-2 inline-block">
        🌍 {burundiOnlyMessage}
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            📍 {isEn ? 'Province / Zone' : 'Province / Zone'} (Burundi)
          </label>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">{isEn ? 'Select zone' : 'Choisir une zone'}</option>
            {PROVINCES_ZONES.map((z) => (
              <option key={z.value} value={z.value}>
                {isEn ? z.labelEn : z.labelFr}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            🗓️ {isEn ? 'Season' : 'Saison'}
          </label>
          <div className="flex gap-3 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="season"
                checked={season === 'rainy'}
                onChange={() => setSeason('rainy')}
                className="text-green-600"
              />
              <span>🌧️ {isEn ? 'Rainy' : 'Pluvieuse'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="season"
                checked={season === 'dry'}
                onChange={() => setSeason('dry')}
                className="text-green-600"
              />
              <span>☀️ {isEn ? 'Dry' : 'Sèche'}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Location Summary Card (Burundi only) */}
      {zone && isBurundiZone && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            🧭 {isEn ? 'Location Summary' : 'Résumé du lieu'}
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>{isEn ? 'Country' : 'Pays'}:</strong> 🇧🇮 Burundi</li>
            <li><strong>{isEn ? 'Province / Zone' : 'Province / Zone'}:</strong> {locationLabel}</li>
            <li><strong>{isEn ? 'Season' : 'Saison'}:</strong> {seasonLabel}</li>
          </ul>
        </div>
      )}

      {/* Recommended crops (2–4 cards) */}
      {zone && isBurundiZone && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            🌾 <Leaf size={20} className="text-green-600" />
            {isEn ? 'Recommended Crops' : 'Cultures recommandées'}
          </h2>
          <div className="grid gap-4">
            {crops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                lang={lang}
                expanded={expandedId === crop.id}
                onToggle={() => setExpandedId(expandedId === crop.id ? null : crop.id)}
              />
            ))}
          </div>
        </div>
      )}

      {zone && !isBurundiZone && (
        <p className="text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          {burundiOnlyMessage}
        </p>
      )}
      {zone && isBurundiZone && crops.length === 0 && (
        <p className="text-gray-500 text-center py-6">{isEn ? 'No crops for this selection.' : 'Aucune culture pour cette sélection.'}</p>
      )}
    </div>
  );
};

function CropCard({
  crop,
  lang,
  expanded,
  onToggle,
}: {
  crop: CropRecommendation;
  lang: 'en' | 'fr';
  expanded: boolean;
  onToggle: () => void;
}) {
  const isEn = lang === 'en';
  const name = isEn ? crop.nameEn : crop.nameFr;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="p-5">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
          <span className="text-green-600">🌱</span> {name}
        </h3>
        <p className="text-sm text-gray-700 mb-3 flex items-start gap-2">
          <span className="text-green-600">✅</span> {crop.whyFits}
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
            <BarChart3 size={14} /> {isEn ? 'Expected Yield' : 'Rendement attendu'}: <strong>{crop.expectedYield}</strong>
          </span>
          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
            <Droplets size={14} /> {isEn ? 'Water Requirement' : 'Besoin en eau'}: <strong>{crop.waterNeed}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="mt-3 flex items-center gap-1 text-green-700 font-medium text-sm hover:underline"
        >
          <Lightbulb size={16} /> {isEn ? 'Planting Advice' : 'Conseils de plantation'} {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expanded && (
          <div className="mt-3 p-4 bg-green-50 rounded-lg border border-green-100 text-sm text-gray-800 space-y-2">
            <p><strong>{isEn ? 'Best planting time' : 'Période de plantation'}:</strong> {crop.plantingPeriod}</p>
            <p><strong>{isEn ? 'Basic spacing guidance' : 'Espacement'}:</strong> {crop.spacing}</p>
            <p><strong>{isEn ? 'General care tips' : 'Soins de base'}:</strong> {crop.careAdvice}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommendationPage;
