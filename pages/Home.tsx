import React from 'react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { ArrowRight, CheckCircle, Shield, TrendingUp } from 'lucide-react';

interface Props {
  lang: 'en' | 'fr';
}

const Home: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-03152b4c84d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Burundi Agriculture" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {t.welcome}
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mb-10">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link 
              to="/auth" 
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link 
              to="/marketplace" 
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Browse Market
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Smart Farmer?</h2>
            <p className="mt-4 text-lg text-gray-600">Complete ecosystem for modern agriculture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Disease Detection</h3>
              <p className="text-gray-600">
                Snap a photo and get instant diagnosis with {'>'}95% accuracy using advanced Gemini AI models.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Marketplace Access</h3>
              <p className="text-gray-600">
                Connect directly with buyers. Sell your harvest at fair prices without middlemen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-yellow-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Soil Advice</h3>
              <p className="text-gray-600">
                Get tailored fertilizer and crop recommendations based on your specific soil conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
