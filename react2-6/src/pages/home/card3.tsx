import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 px-4 sm:px-6 bg-gray-50 dark:bg-[#0B0F17] flex justify-center items-center">
      
      {/* КОНТЕЙНЕРИ АСОСИИ БЛОК (Маҳз мисли сурати фиристодаат) */}
      <div className="relative w-full max-w-5xl rounded-[32px] border border-gray-200 dark:border-gray-800/30 bg-[#0E131F]/70 px-6 py-16 text-center shadow-2xl backdrop-blur-md overflow-hidden sm:px-12">
        
        {/* Эффекти дурахши замина */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          
          {/* Сарлавҳаи калон */}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Ready to bring order to your finances?
          </h2>
          
          {/* Тавсифи зери сарлавҳа */}
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Join over 10,000+ users worldwide and take absolute control of your cash flow and financial liabilities today.
          </p>

          {/* ТУГМАИ АСОСӢ - БА Саҳифаи РЕГИСТРАТСИЯ ПАЙВАСТ АСТ */}
          <div className="pt-4">
            <button
              onClick={() => navigate('/signUpPage')} // Гузариш ба саҳифаи SignUp бо пахши тугма
              className="inline-block w-full sm:w-auto rounded-xl bg-[#3B82F6] px-10 py-4 text-sm font-semibold text-slate-900 dark:text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-600 hover:scale-[1.01] active:scale-[0.99]"
            >
              Start Now — It's Free
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default CTASection;