import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { FiX, FiCheckCircle, FiChevronRight, FiDownload, FiTrash2, FiCamera } from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile, getMe } = useAuthStore();

 
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+1 (555) 123-4567'); 
  const [location, setLocation] = useState('San Francisco, CA');

    
  const [currency, setCurrency] = useState('USD ($)');
  const [timezone, setTimezone] = useState('(GMT-08:00) Pacific Time');
  const [language, setLanguage] = useState('English (US)');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

 
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      if (user.phone) setPhone(user.phone);
      if (user.location) setLocation(user.location);
    }
  }, [user, isAuthenticated, navigate]);

 
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {

      if (updateProfile) {
        await updateProfile({
          name: fullName,
          email: email,
          phone: phone,
          location: location,
          preferences: { currency, timezone, language }
        });
        setMessage({ text: 'Тағйирот бо муваффақият захира шуд!', type: 'success' });
      } else {

        console.log('Фиристодан ба бэкенд:', { fullName, email, phone, location });
        setMessage({ text: 'Пайвастшавӣ ба бэкенд симулятсия шуд.', type: 'success' });
      }
      

      if (getMe) await getMe();
    } catch (error) {
      setMessage({ text: error?.response?.data?.message || 'Хатогӣ ҳангоми сабт!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f131c] text-slate-800 dark:text-slate-300 antialiased p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        

        <div className="flex justify-between items-center mb-2">
          <Link to="/dashboard" className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 hover:text-[#8faeff] transition">
            ← Бозгашт ба Dashboard
          </Link>
          <div className="text-slate-500 dark:text-slate-500 dark:text-slate-500 font-mono text-sm">Adl 5:8</div>
        </div>


        <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6 relative">

          {message.text && (
            <div className={`mb-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 border ${
              message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              <FiCheckCircle /> {message.text}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                  alt="Avatar" 
                  className="w-16 h-16 rounded-2xl object-cover border border-gray-200 dark:border-[#222938]"
                />
                <button className="absolute -bottom-1 -right-1 bg-[#8faeff] text-[#0f131c] p-1.5 rounded-lg hover:bg-[#a3bfff] transition shadow-lg">
                  <FiCamera className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-200">{fullName || user?.name || 'Alex Thompson'}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5">Senior Portfolio Manager • Joined Oct 2023</p>
                <div className="flex gap-1.5 mt-2">
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border border-emerald-500/20">Verified</span>
                  <span className="bg-[#8faeff]/10 text-[#8faeff] text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border border-[#8faeff]/20">Pro Plan</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSave}
              disabled={loading}
              className="bg-[#8faeff] hover:bg-[#a3bfff] disabled:opacity-50 text-[#0f131c] font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-[#8faeff]/5"
            >
              {loading ? 'Сабт рафта истодааст...' : 'Save Changes'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">Full Name</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8faeff] transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8faeff] transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8faeff] transition font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-500 dark:text-slate-500 mb-2 uppercase tracking-wider">Location</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8faeff] transition font-medium"
              />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6 space-y-6">
          <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 border-b border-[#222938]/60 pb-3">Preferences</h3>   
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-1">
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300">Regional Currency</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5">Select the primary currency for your dashboard.</p>
            </div>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-50 dark:bg-[#0f131c] text-xs px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#222938] text-slate-800 dark:text-slate-300 focus:outline-none focus:border-[#8faeff] font-medium w-full sm:w-auto min-w-[160px]"
            >
              <option value="USD ($)">USD ($)</option>
              <option value="TJS (сом.)">TJS (сом.)</option>
              <option value="RUB (₽)">RUB (₽)</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-1">
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300">Timezone</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5">Set your local timezone for transaction timestamps.</p>
            </div>
            <select 
              value={timezone} 
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-gray-50 dark:bg-[#0f131c] text-xs px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#222938] text-slate-800 dark:text-slate-300 focus:outline-none focus:border-[#8faeff] font-medium w-full sm:w-auto min-w-[240px]"
            >
              <option value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific Time</option>
              <option value="(GMT+05:00) Dushanbe Time">(GMT+05:00) Dushanbe Time</option>
              <option value="(GMT+03:00) Moscow Time">(GMT+03:00) Moscow Time</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-1">
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300">Interface Language</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5">Choose the language for the platform UI.</p>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-50 dark:bg-[#0f131c] text-xs px-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#222938] text-slate-800 dark:text-slate-300 focus:outline-none focus:border-[#8faeff] font-medium w-full sm:w-auto min-w-[160px]"
            >
              <option value="English (US)">English (US)</option>
              <option value="Тоҷикӣ">Тоҷикӣ</option>
              <option value="Русский">Русский</option>
            </select>
          </div>
        </div>
        <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6 space-y-4">
          <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 border-b border-[#222938]/60 pb-3">Data & Privacy</h3>
          
          <div className="space-y-3 pt-1">
            <button className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#1e2533] hover:border-[#222938] rounded-xl p-4 flex items-center justify-between text-left group transition">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] text-slate-600 dark:text-slate-400 rounded-xl group-hover:text-slate-900 dark:text-slate-200 transition">
                  <FiDownload className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300">Export Personal Data</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5">Request a copy of all your financial records and profile data.</p>
                </div>
              </div>
              <FiChevronRight className="text-slate-600 group-hover:text-slate-600 dark:text-slate-400 transition" />
            </button>

            <button className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#1e2533] hover:border-rose-950/30 rounded-xl p-4 flex items-center justify-between text-left group transition">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] text-rose-400/70 rounded-xl group-hover:text-rose-400 transition">
                  <FiTrash2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 group-hover:text-rose-400 transition">Deactivate Account</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5">Temporarily disable your profile and hide your debt entries.</p>
                </div>
              </div>
              <FiChevronRight className="text-slate-600 group-hover:text-slate-600 dark:text-slate-400 transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;