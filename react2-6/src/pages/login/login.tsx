import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaGithub, FaEye, FaEyeSlash, FaLock, FaAt } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {

    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleGoogleLogin = () => console.log('Google Login clicked');
  const handleGithubLogin = () => console.log('GitHub Login clicked');

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-[#0B0F17] text-slate-900 dark:text-white font-sans">
      <div className="relative hidden w-1/2 flex-col justify-between p-12 overflow-hidden lg:flex border-r border-gray-200 dark:border-gray-800/30">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-b from-blue-500/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 -skew-y-12 scale-150 transform bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/50 to-[#0B0F17]"></div>
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-slate-900 dark:text-white shadow-lg shadow-blue-500/30">
            <span className="text-sm">◳</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-blue-400">Adl 5:8</span>
        </div>
        <div className="relative z-10 max-w-md my-auto">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Architecting the <br />
            future of precision <br />
            finance<span className="text-blue-500">.</span>
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Access your strategic dashboard and manage institutional-grade assets with unparalleled modular clarity.
          </p>
          <div className="mt-12 flex gap-12 border-t border-gray-200 dark:border-gray-800/60 pt-8">
            <div>
              <div className="text-2xl font-bold text-blue-400">99.9%</div>
              <div className="text-[10px] tracking-widest text-gray-500 uppercase font-medium mt-1">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400 tracking-wide">SECURE</div>
              <div className="text-[10px] tracking-widest text-gray-500 uppercase font-medium mt-1">Encryption</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-xs text-gray-600">
          © 2026 Adl 5:8 Financial. Precision Redefined.
        </div>
      </div>
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 sm:px-16 lg:px-24 bg-gray-50 dark:bg-[#0D111A]">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t('auth.welcome')}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {t('auth.enterCreds')}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 dark:text-slate-500 dark:text-slate-500">
                  <FaAt className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError(); }}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white placeholder-gray-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  {t('auth.password')}
                </label>
                <Link to="/forgot-password" className="text-xs text-blue-500 hover:underline">
                  {t('auth.forgot')}
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 dark:text-slate-500 dark:text-slate-500">
                  <FaLock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-3 pl-11 pr-12 text-sm text-slate-900 dark:text-white placeholder-gray-600 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 dark:text-slate-500 dark:text-slate-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="remember-device"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-50 dark:focus:ring-offset-[#0D111A]"
              />
              <label htmlFor="remember-device" className="ml-2 text-sm text-gray-600 dark:text-gray-400 select-none">
                {t('auth.remember')}
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-slate-900 dark:text-white transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-[#0D111A] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('auth.connecting') : t('auth.login')}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 dark:bg-[#0D111A] px-3 text-[10px] tracking-widest text-slate-500 dark:text-slate-500 dark:text-slate-500 font-semibold">
                {t('auth.continueWith')}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-3 text-sm font-medium text-slate-900 dark:text-white transition-all hover:bg-gray-100 dark:hover:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700"
            >
              <FaGoogle className="h-4 w-4 text-gray-800 dark:text-gray-300" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#090D14] py-3 text-sm font-medium text-slate-900 dark:text-white transition-all hover:bg-gray-100 dark:hover:bg-gray-950 hover:border-gray-300 dark:hover:border-gray-700"
            >
              <FaGithub className="h-4 w-4 text-gray-800 dark:text-gray-300" />
              <span>GitHub</span>
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('auth.noAccount')} {' '}
            <Link to="/signUpPage" className="font-semibold text-blue-500 hover:underline">
              {t('auth.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;