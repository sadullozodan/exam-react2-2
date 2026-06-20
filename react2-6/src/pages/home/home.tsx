import { Link, useNavigate } from 'react-router-dom';
import { FaGlobe, FaMoon, FaSun } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../store/useThemeStore';
import HeroSection from './heroSection';
import FeaturesSection from './card';
import DeviceSection from './card2';
import CTASection from './card3';

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800/40 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md text-slate-800 dark:text-white sticky top-0 z-50 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 hover:opacity-90 transition-all">
            Adl 5:8
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-lg border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-[#090D14] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-950 transition-all cursor-pointer"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
          </button>

          <div className="relative flex items-center rounded-lg border border-gray-300 dark:border-gray-800 bg-gray-100 dark:bg-[#090D14] px-2.5 py-1.5 transition-all hover:border-gray-400 dark:hover:border-gray-700">
            <FaGlobe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 pointer-events-none mr-1.5" />
            <select
              value={i18n.language || 'TJK'}
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
              }}
              className="bg-transparent text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer pr-1"
            >
              <option value="TJK" className="bg-white dark:bg-[#090D14] text-black dark:text-white">Тоҷикӣ</option>
              <option value="RUS" className="bg-white dark:bg-[#090D14] text-black dark:text-white">Русский</option>
              <option value="ENG" className="bg-white dark:bg-[#090D14] text-black dark:text-white">English</option>
            </select>
          </div>

          <button
            onClick={() => navigate('/signUpPage')}
            className="rounded-lg border border-gray-300 dark:border-gray-800 bg-blue-50 dark:bg-[#090D14] px-4 py-1.5 text-xs font-semibold text-blue-600 dark:text-gray-200 transition-all hover:bg-blue-100 dark:hover:bg-gray-950 dark:hover:text-slate-900 dark:text-white cursor-pointer"
          >
            {t('header.login', 'Ворид шудан')}
          </button>

        </div>

      </div>
      <HeroSection/>
      <FeaturesSection/>
      <DeviceSection/>
      <CTASection/>
    </header>
  );
};

export default Header;