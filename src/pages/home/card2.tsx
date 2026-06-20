import { FaCheckCircle } from 'react-icons/fa';

import phoneImg from "../../assets/1.png"; 

const DeviceSection = () => {
  return (
    <section className="w-full py-24 px-4 sm:px-6 bg-gray-50 dark:bg-[#0B0F17] border-t border-gray-950">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ҚИСМИ ЧАП: СУРАТИ ТЕЛЕФОН ДАР КАНТЕЙНЕРИ ТОРИК */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-[#0D111A]/30 p-8 flex items-center justify-center backdrop-blur-sm shadow-xl shadow-black/40">
            {/* Дурахши кабуд дар пушти телефон */}
            <div className="absolute w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none"></div>
            
            <img 
              src={phoneImg} 
              alt="Mobile Application View" 
              className="w-64 h-auto object-contain relative z-10 transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* ҚИСМИ РОСТ: МАТНҲО ВА ХУСУСИЯТҲО */}
        <div className="lg:col-span-6 space-y-8 text-left">
          
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Ready for All Your Devices
            </h2>
            <div className="h-[2px] w-12 bg-blue-500 rounded-full"></div>
          </div>

          {/* Рӯйхати хусусиятҳо бо нишони тасдиқ (Checkmark) */}
          <div className="space-y-6">
            
            {/* Пункт 1 */}
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full text-blue-500/80 bg-blue-500/5">
                <FaCheckCircle className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">Cloud Synchronization</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Work seamlessly across your mobile phone, tablet, and desktop browser. Your data stays in perfect harmony instantly.
                </p>
              </div>
            </div>

            {/* Пункт 2 */}
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full text-blue-500/80 bg-blue-500/5">
                <FaCheckCircle className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">Intuitive & Minimalist Interface</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  A clean, streamlined layout designed carefully for quick daily operations without any visual clutter.
                </p>
              </div>
            </div>

            {/* Пункт 3 */}
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full text-blue-500/80 bg-blue-500/5">
                <FaCheckCircle className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-200">24/7 Dedicated Support</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our core support team is constantly available to keep your asset-tracking pipeline reliable and uncompromised.
                </p>
              </div>
            </div>

          </div>

          {/* ИКОНКАҲОИ МАҒОЗАҲО (App Store / Google Play) */}
          <div className="flex items-center gap-4 pt-4">
            <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#0D111A]/60 flex items-center justify-center cursor-pointer hover:border-gray-700 transition-colors shadow-inner">
              <svg className="w-6 h-6 text-gray-800 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.14-.5-2.07-.5-3.23 0-1.37.6-2.11.48-3.07-.4C3.83 16.2 3.1 9.42 6.35 5.86c1.62-1.74 3.44-1.66 4.47-1.13 1.18.6 1.93.57 3.15 0 1.05-.53 3.08-.73 4.43.93-2.83 2.1-2.2 6.78.43 8.16-1.1 2.87-2.6 5.25-4.18 6.46zm-2.92-17.2c.4-.04.83-.07 1.25-.07.45 0 .86.03 1.23.07.13-1.6-.54-3.15-1.58-4.08C14-.14 12.43.2 11.4 1.23c-1.04.97-1.6 2.5-1.4 4.07 1.7.1 3.1-.73 4.13-2.22z"/>
              </svg>
            </div>
            <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-[#0D111A]/60 flex items-center justify-center cursor-pointer hover:border-gray-700 transition-colors shadow-inner">
              <svg className="w-5 h-5 text-gray-800 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.782 12 3.609 22.186A2.22 2.22 0 0 1 3 20.596V3.404c0-.629.219-1.217.609-1.59M15.196 13.414l3.197 3.197L4.764 21.64c-.167-.132-.315-.295-.436-.486zm4.614-3.326c.78.442.78 1.562 0 2.004l-3.224 1.83-2.193-2.192 2.193-2.193zM4.328 2.846l14.062 7.994-3.194 3.194L4.764 2.36c.121-.19.269-.354.436-.486z"/>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DeviceSection;