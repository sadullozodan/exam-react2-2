import { FaShieldHalved, FaWifi, FaBell, FaChartPie } from 'react-icons/fa6';

import shieldImg from "../../assets/Hero Image Preview_margin.png"; 
import chartImg from "../../assets/Background+Border.png";   

const FeaturesSection = () => {
  return (
    <section className="w-full py-24 px-4 sm:px-6 bg-gray-50 dark:bg-[#0B0F17] border-t border-gray-900/60">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
            Хусусиятҳои асосии Adl 5:8
          </h2>
          <div className="mx-auto h-[2px] w-12 bg-blue-500/80 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-7 rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-[#0D111A]/40 p-6 flex flex-col sm:flex-row gap-6 items-center justify-between hover:border-gray-200 dark:border-gray-800 transition-colors">
            <div className="space-y-4 max-w-xs">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/50 text-blue-400 border border-gray-700/30">
                <FaShieldHalved className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">Bank-Grade Security</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your data is strictly shielded with AES-256 military encryption standards. Absolute confidentiality ensuring only you hold the keys.
                </p>
              </div>
            </div>
            
            <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800/30 bg-[#070A10] flex items-center justify-center">
              <img 
                src={shieldImg} 
                alt="Security Shield" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-[#0D111A]/40 p-6 flex flex-col justify-start space-y-4 hover:border-gray-200 dark:border-gray-800 transition-colors">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/50 text-emerald-400 border border-gray-700/30">
              <FaWifi className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-emerald-400">Offline Mode</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Operate seamlessly even without active network access. The application buffers all financial records locally and performs safe data reconciliation upon internet recovery.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-[#0D111A]/40 p-6 flex flex-col justify-start space-y-4 hover:border-gray-200 dark:border-gray-800 transition-colors">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/50 text-amber-500 border border-gray-700/30">
              <FaBell className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-amber-500">Smart Reminders</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Never skip a settlement threshold again. Tailor automated prompt delivery systems to flag pending credit intervals and recurring operational debts effortlessly.
              </p>
            </div>
          </div>

                <div className="md:col-span-7 rounded-2xl border border-gray-200 dark:border-gray-800/40 bg-[#0D111A]/40 p-6 flex flex-col sm:flex-row gap-6 items-center justify-between hover:border-gray-200 dark:border-gray-800 transition-colors">
            
            <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800/30 bg-[#070A10] flex items-center justify-center order-2 sm:order-1">
              <img 
                src={chartImg} 
                alt="Analytics Chart" 
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            <div className="space-y-4 max-w-xs order-1 sm:order-2 text-left w-full">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800/50 text-indigo-400 border border-gray-700/30">
                <FaChartPie className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200">Detailed Analytics</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Visualize balance developments through dynamic metric pipelines. Uncover systemic capital allocations and get real-time clarity over your immediate expenditure patterns.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;