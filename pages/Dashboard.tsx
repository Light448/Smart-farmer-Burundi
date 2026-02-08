import React, { useEffect, useState } from 'react';
import { User, CropAnalysis } from '../types';
import { TRANSLATIONS } from '../constants';
import { Clock, ShoppingBag, Sprout, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  lang: 'en' | 'fr';
  user: User;
}

const Dashboard: React.FC<Props> = ({ lang, user }) => {
  const [history, setHistory] = useState<CropAnalysis[]>([]);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const historyKey = `sfb_history_${user.id}`;
    const stored = localStorage.getItem(historyKey);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, [user.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.dashboard}</h1>
          <p className="text-gray-600">{t.welcome}, {user.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/crop-doctor" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">
            + New Analysis
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Scans</p>
            <p className="text-2xl font-bold">{history.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Diseases Detected</p>
            <p className="text-2xl font-bold">{history.filter(h => !h.healthy).length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
             <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Market Items</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Recent AI Analyses</h2>
        </div>
        
        {history.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Sprout size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No scans yet. Use the AI Crop Doctor to start.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.healthy ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Healthy
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Diseased
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.diseaseName || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.confidence}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
