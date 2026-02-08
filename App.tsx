import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { User, UserRole } from './types';
import { getCurrentUser, logout } from './services/authService';
import { TRANSLATIONS } from './constants';
import { 
  Leaf, ShoppingBag, BarChart3, Sprout, MessageCircle, 
  Menu, X, LogOut, Phone, ShieldCheck, User as UserIcon 
} from 'lucide-react';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import CropDoctor from './pages/CropDoctor';
import SoilAdvisor from './pages/SoilAdvisor';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
  }, []);

  const t = TRANSLATIONS[lang];

  const handleLogout = () => {
    logout();
    setUser(null);
    window.location.hash = '/';
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'fr' : 'en');
  };

  const NavLink = ({ to, icon: Icon, label, onClick }: any) => (
    <Link 
      to={to} 
      onClick={() => { setIsMenuOpen(false); if(onClick) onClick(); }}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-100 rounded-md transition-colors"
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                  <div className="bg-green-600 p-2 rounded-full">
                    <Leaf className="text-white" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl text-green-800 tracking-tight">Smart Farmer</span>
                    <span className="text-xs text-green-600 font-medium">Burundi</span>
                  </div>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-4">
                {user && <NavLink to="/crop-doctor" icon={ShieldCheck} label="AI Doctor" />}
                {user && <NavLink to="/soil-advisor" icon={Sprout} label={t.soilAdvisor} />}
                <NavLink to="/marketplace" icon={ShoppingBag} label={t.marketplace} />
                
                {user ? (
                  <>
                    {user.role === UserRole.ADMIN ? (
                      <NavLink to="/admin" icon={BarChart3} label={t.admin} />
                    ) : (
                      <NavLink to="/dashboard" icon={UserIcon} label={t.dashboard} />
                    )}
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut size={20} />
                      {t.logout}
                    </button>
                  </>
                ) : (
                  <NavLink to="/auth" icon={UserIcon} label={t.login} />
                )}
                
                <button 
                  onClick={toggleLang}
                  className="ml-4 px-3 py-1 border border-green-600 text-green-600 rounded-full text-sm font-semibold hover:bg-green-600 hover:text-white transition-colors"
                >
                  {t.language}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user && <NavLink to="/crop-doctor" icon={ShieldCheck} label="AI Doctor" />}
              {user && <NavLink to="/soil-advisor" icon={Sprout} label={t.soilAdvisor} />}
              <NavLink to="/marketplace" icon={ShoppingBag} label={t.marketplace} />
              <NavLink to="/contact" icon={Phone} label={t.contact} />
              {user ? (
                <>
                   <NavLink to={user.role === UserRole.ADMIN ? "/admin" : "/dashboard"} icon={UserIcon} label={user.role === UserRole.ADMIN ? "Admin" : "Dashboard"} />
                   <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <LogOut size={20} />
                      {t.logout}
                    </button>
                </>
              ) : (
                <NavLink to="/auth" icon={UserIcon} label={t.login} />
              )}
               <button 
                  onClick={() => { toggleLang(); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-green-600 font-semibold"
                >
                  Switch to {t.language}
                </button>
            </div>
          )}
        </nav>

        {/* Content Area */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/auth" element={!user ? <Auth setUser={setUser} lang={lang} /> : <Navigate to="/dashboard" />} />
            <Route path="/contact" element={<Contact lang={lang} />} />
            <Route path="/marketplace" element={<Marketplace lang={lang} user={user} />} />
            
            {/* Protected Routes */}
            <Route path="/crop-doctor" element={user ? <CropDoctor lang={lang} user={user} /> : <Navigate to="/auth" />} />
            <Route path="/soil-advisor" element={user ? <SoilAdvisor lang={lang} /> : <Navigate to="/auth" />} />
            <Route path="/dashboard" element={user ? <Dashboard lang={lang} user={user} /> : <Navigate to="/auth" />} />
            <Route path="/admin" element={user && user.role === UserRole.ADMIN ? <AdminDashboard lang={lang} /> : <Navigate to="/dashboard" />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-green-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Smart Farmer Burundi</h3>
              <p className="text-green-200 text-sm">Innovating agriculture in Burundi through Artificial Intelligence and Community.</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Contact</h4>
              <p className="text-green-200 text-sm">Phone: +257 77176419</p>
              <p className="text-green-200 text-sm">Email: smartaifarmer@gmail.com</p>
            </div>
            <div>
               <Link to="/contact" className="block text-green-200 hover:text-white text-sm mb-1">{t.report}</Link>
               <Link to="/contact" className="block text-green-200 hover:text-white text-sm mb-1">{t.contact}</Link>
            </div>
          </div>
          <div className="text-center mt-8 text-xs text-green-400 border-t border-green-800 pt-4">
            {t.copyright}
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
