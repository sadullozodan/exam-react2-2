import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaApple, FaUser, FaLock, FaAt, FaShieldHalved } from 'react-icons/fa6';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Zustand store
  const { register, isLoading, error, clearError } = useAuthStore();

  // Local UI state (form fields only)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Паролҳо бо ҳам мувофиқат намекунанд!");
      return;
    }

    if (!agreeTerms) {
      setLocalError("Шумо бояд шартҳои истифодабариро қабул кунед!");
      return;
    }

    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch {
      // error already set in store
    }
  };

  const displayError = localError || error;

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-[#0B0F17] text-slate-900 dark:text-white font-sans">
      
      <div className="relative hidden w-1/2 flex-col justify-between p-12 overflow-hidden lg:flex border-r border-gray-200 dark:border-gray-800/30 bg-[#070a10]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-b from-blue-500/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 self-start flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs text-blue-400">
          <FaShieldHalved className="h-3.5 w-3.5" />
          <span>Enterprise Grade Security</span>

          <h1 onClick={() => navigate('/')} className='text-[20px] font-medium cursor-pointer bg-blue-500/60 rounded-full px-3 py-1'>Home</h1>
        </div>

        <div className="relative z-10 max-w-lg my-auto space-y-6">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            Precision <br />
            meets <br />
            performa<br />
            nce in <br />
            <span className="text-blue-500">FinTech.</span>
          </h1>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-md">
            Experience the next generation of financial management with Adl 5:8. Built for clarity, engineered for scale.
          </p>
          
          <div className="pt-6 flex gap-4">
            <div className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800/60 bg-[#0D111A]/40 p-4 space-y-2">
              <div className="text-blue-500 text-lg">📊</div>
              <div className="font-semibold text-sm text-gray-900 dark:text-gray-200">Advanced Analytics</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 leading-normal">Real-time data streaming and predictive modeling.</div>
            </div>
            <div className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800/60 bg-[#0D111A]/40 p-4 space-y-2">
              <div className="text-emerald-500 text-lg">💼</div>
              <div className="font-semibold text-sm text-gray-900 dark:text-gray-200">Multi-Asset</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 leading-normal">Manage diverse portfolios across global markets.</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-gray-600">
          © 2026 Adl 5:8 Financial. Precision Redefined.
        </div>
      </div>

      <div className="flex w-full flex-col justify-between px-6 py-12 lg:w-1/2 sm:px-16 lg:px-24 bg-gray-50 dark:bg-[#0D111A]">
        <div className="flex justify-between items-center w-full max-w-xl mx-auto">
          <span className="text-xl font-bold tracking-tight text-blue-400">Adl 5:8</span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {t('auth.already')} {' '}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">{t('auth.login')}</Link>
          </span>
        </div>

        <div className="mx-auto w-full max-w-md my-auto py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('auth.createAccount')}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t('auth.enterDetails')}
            </p>
          </div>

          {displayError && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              {displayError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-2.5 text-sm font-medium text-slate-900 dark:text-white transition-all hover:bg-gray-950">
              <FaGoogle className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
              <span className="text-xs">Google</span>
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-2.5 text-sm font-medium text-slate-900 dark:text-white transition-all hover:bg-gray-950">
              <FaApple className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
              <span className="text-xs">Apple</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-800/60"></div></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 dark:bg-[#0D111A] px-3 text-[10px] tracking-widest text-gray-500 font-medium">
                Or continue with email
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500"><FaUser className="h-3.5 w-3.5" /></span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError(); setLocalError(null); }}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-2.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Corporate Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500"><FaAt className="h-3.5 w-3.5" /></span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); setLocalError(null); }}
                  placeholder="j.doe@company.com"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-2.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500"><FaLock className="h-3.5 w-3.5" /></span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError(); setLocalError(null); }}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-2.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Confirm</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500"><FaLock className="h-3.5 w-3.5" /></span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearError(); setLocalError(null); }}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-2.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-start pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600 dark:text-gray-400 select-none leading-normal">
                I agree to the <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>, including automated data processing for financial reporting.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 py-3 text-sm font-semibold text-slate-900 dark:text-white transition-all hover:opacity-90 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? t('auth.creating') : t('auth.signUp')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;