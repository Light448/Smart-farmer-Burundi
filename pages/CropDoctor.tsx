import React, { useState } from 'react';
import { analyzeCropHealth } from '../services/geminiService';
import { CropAnalysis, User } from '../types';
import { TRANSLATIONS } from '../constants';
import { Camera, Upload, AlertTriangle, CheckCircle, Loader2, Save } from 'lucide-react';

interface Props {
  lang: 'en' | 'fr';
  user: User;
}

const CropDoctor: React.FC<Props> = ({ lang, user }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<CropAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeCropHealth(image, lang);
      setAnalysis(result);
      
      // Save to local history (simulated DB)
      const historyKey = `sfb_history_${user.id}`;
      const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
      history.unshift(result);
      localStorage.setItem(historyKey, JSON.stringify(history));

    } catch (err) {
        // Safe check if error is object
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Failed to analyze image. Please try again.");
        }
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Camera /> AI Crop Doctor
          </h1>
          <p className="text-green-100 mt-1">
            {lang === 'en' ? 'Upload a photo of your crop for instant diagnosis.' : 'Téléchargez une photo de votre culture pour un diagnostic instantané.'}
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Upload Section */}
          <div className="mb-8">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:bg-gray-100 transition-colors relative">
              {image ? (
                <div className="relative w-full max-w-sm">
                  <img src={image} alt="Crop preview" className="rounded-lg shadow-md w-full" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <Upload size={48} className="text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">{t.upload}</span>
                  <span className="text-xs text-gray-500 mt-1">JPEG, PNG</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              )}
            </div>

            {image && !analysis && (
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Camera />}
                {loading ? t.analyzing : "Analyze Crop"}
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-3 mb-6">
              <AlertTriangle />
              {error}
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="animate-fade-in space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg flex items-center gap-3 ${analysis.healthy ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {analysis.healthy ? <CheckCircle size={28} /> : <AlertTriangle size={28} />}
                <div>
                  <h3 className="text-lg font-bold">
                    {analysis.healthy ? t.healthy : `${t.diseased}: ${analysis.diseaseName}`}
                  </h3>
                  {analysis.confidence < 50 && (
                     <p className="text-xs font-semibold mt-1 text-red-600">
                        {lang === 'en' ? '⚠️ Low Confidence - Results may be inaccurate.' : '⚠️ Faible confiance - Les résultats peuvent être inexacts.'}
                     </p>
                  )}
                </div>
              </div>

              {/* Confidence Bar */}
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                  <span>{t.confidence}</span>
                  <span>{analysis.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getConfidenceColor(analysis.confidence)}`} 
                    style={{ width: `${analysis.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Advice Section */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">{t.advice}</h4>
                <p className="text-blue-800 whitespace-pre-line">{analysis.advice}</p>
              </div>

              {/* Treatment Section */}
              {!analysis.healthy && analysis.treatment && (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                   <h4 className="font-bold text-yellow-900 mb-2">{t.treatment}</h4>
                   <p className="text-yellow-800 whitespace-pre-line">{analysis.treatment}</p>
                </div>
              )}
              
              <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                 <Save size={12}/> {lang === 'en' ? 'Saved to profile' : 'Enregistré sur le profil'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropDoctor;
