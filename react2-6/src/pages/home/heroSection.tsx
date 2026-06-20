import { useNavigate } from 'react-router-dom';
import img from "../../assets/Hero Image Preview_margin.png";
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-[#0B0F17] text-slate-900 dark:text-white px-4 sm:px-6 text-center pt-20 sm:pt-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-gray-400">
          {t('hero.title1')} <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {t('hero.title2')}
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="pt-2">
          <button
            onClick={() => navigate('/signUpPage')} 
            className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-slate-900 dark:text-white shadow-lg shadow-blue-500/20 transition-all hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {t('hero.startBtn')}
          </button>
        </div>
      </div>

      <div className="relative mt-16 sm:mt-24 w-full max-w-5xl px-2 z-10 group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-70 blur-md transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
        
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800/60 bg-[#0D111A]/60 p-2 backdrop-blur-sm shadow-2xl shadow-black/80">
          <img 
            className="w-full h-auto rounded-lg object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.005]" 
            src={img} 
            alt="Dashboard Preview" 
          />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;