import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, DollarSign } from 'lucide-react';

interface Props {
  lang: 'en' | 'fr';
}

const AdminDashboard: React.FC<Props> = ({ lang }) => {
  // Mock Data
  const activityData = [
    { name: 'Mon', scans: 12, sales: 4 },
    { name: 'Tue', scans: 19, sales: 8 },
    { name: 'Wed', scans: 15, sales: 12 },
    { name: 'Thu', scans: 25, sales: 10 },
    { name: 'Fri', scans: 32, sales: 15 },
    { name: 'Sat', scans: 40, sales: 20 },
    { name: 'Sun', scans: 38, sales: 18 },
  ];

  const diseaseData = [
    { name: 'Healthy', value: 400 },
    { name: 'Blight', value: 300 },
    { name: 'Rust', value: 300 },
    { name: 'Wilt', value: 200 },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6366F1'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
       
       {/* Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-purple-100 rounded-full text-purple-600"><Users /></div>
                    <span className="text-gray-500 font-medium">Total Users</span>
                </div>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-xs text-green-500 font-medium">+12% this week</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-red-100 rounded-full text-red-600"><AlertTriangle /></div>
                    <span className="text-gray-500 font-medium">Disease Alerts</span>
                </div>
                <p className="text-3xl font-bold">89</p>
                <p className="text-xs text-red-500 font-medium">Active outbreaks</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-green-100 rounded-full text-green-600"><DollarSign /></div>
                    <span className="text-gray-500 font-medium">Market Volume</span>
                </div>
                <p className="text-3xl font-bold">15.2M BIF</p>
            </div>
       </div>

       {/* Charts */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
             <h3 className="font-bold text-gray-700 mb-4">Weekly Activity</h3>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="scans" fill="#10B981" radius={[4, 4, 0, 0]} name="AI Scans" />
                    <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Market Sales" />
                </BarChart>
             </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80">
             <h3 className="font-bold text-gray-700 mb-4">Detected Crop Health Status</h3>
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={diseaseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {diseaseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="flex justify-center gap-4 text-xs">
                {diseaseData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                        <span>{entry.name}</span>
                    </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default AdminDashboard;
