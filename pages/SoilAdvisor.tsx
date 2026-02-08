import React, { useState } from 'react';
import { getSoilAdvice } from '../services/geminiService';
import { Loader2, Sprout } from 'lucide-react';

interface Props {
  lang: 'en' | 'fr';
}

const SoilAdvisor: React.FC<Props> = ({ lang }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{recommendation: string, fertilizer: string} | null>(null);
  
  // Form state
  const [soilType, setSoilType] = useState('Loamy');
  const [crop, setCrop] = useState('');
  const [ph, setPh] = useState('6.5');
  const [season, setSeason] = useState('Rainy Season A');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
        const advice = await getSoilAdvice(soilType, crop, season, ph, lang);
        setResult(advice);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Sprout className="text-green-600" /> 
        {lang === 'en' ? 'Soil Advisor' : 'Conseiller Sol'}
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                <select value={soilType} onChange={e => setSoilType(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm border p-2">
                    <option>Clay (Argileux)</option>
                    <option>Sandy (Sablonneux)</option>
                    <option>Loamy (Limoneux)</option>
                    <option>Peaty (Tourbeux)</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Crop</label>
                <input 
                    type="text" 
                    value={crop} 
                    onChange={e => setCrop(e.target.value)}
                    placeholder="e.g. Maize, Beans..."
                    required
                    className="w-full border-gray-300 rounded-md shadow-sm border p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
                <input 
                    type="number" 
                    step="0.1"
                    value={ph} 
                    onChange={e => setPh(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm border p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                <select value={season} onChange={e => setSeason(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm border p-2">
                    <option>Rainy Season A (Impeshi)</option>
                    <option>Rainy Season B (Itumba)</option>
                    <option>Dry Season (Impeshi)</option>
                </select>
            </div>
            
            <div className="md:col-span-2">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 flex justify-center items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : "Get Recommendation"}
                </button>
            </div>
        </form>

        {result && (
            <div className="bg-green-50 p-6 border-t border-green-100 animate-fade-in">
                <h3 className="font-bold text-lg text-green-900 mb-4">Expert Recommendation</h3>
                
                <div className="mb-4">
                    <span className="font-semibold text-green-800">Plan: </span>
                    <p className="text-green-700 mt-1">{result.recommendation}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                    <span className="font-semibold text-green-800">Suggested Fertilizer: </span>
                    <p className="text-green-600 font-bold text-lg">{result.fertilizer}</p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SoilAdvisor;
