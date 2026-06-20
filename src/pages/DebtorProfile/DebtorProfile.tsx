import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../dashboard/useDashboard'; 
import { FiArrowLeft, FiCalendar, FiX, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { BiWallet, BiHistory } from 'react-icons/bi';

const DebtorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Амалҳоро аз Zustand стори худат мегирем
  // Боварӣ ҳосил кун, ки усулҳои updateDebtor ва deleteDebtor дар useDashboardStore мавҷуданд
  const { 
    debtors, 
    recentPayments, 
    updateDebtor, 
    deleteDebtor,
    addPayment // Агар функсияи тӯлов бошад, варна усули фармоиширо истифода мебарем
  } = useDashboardStore();

  const debtor = debtors.find((d) => String(d.id) === String(id));

  // Тӯловҳои ҳамин корбар (бехатар бо шарт)
  const debtorPayments = debtor
    ? recentPayments.filter((p) => String(p.name || '').toLowerCase() === String(debtor.name || '').toLowerCase())
    : [];

  // Ҳолатҳо (States) барои модалҳо ва инпутҳо
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
    
  const [editName, setEditName] = useState<string>(debtor?.name || '');
  const [editAmount, setEditAmount] = useState<string>(String(debtor?.amount || ''));
  const [paymentAmount, setPaymentAmount] = useState<string>('');

  // 1. Амал барои нест кардани қарздор (Delete)
  const handleDelete = async () => {
    if (!debtor) return;
    const confirmDelete = window.confirm(`Оё мехоҳед "${debtor.name}"-ро аз рӯйхат нест кунед?`);
    if (confirmDelete) {
      await deleteDebtor(debtor.id);
      navigate('/dashboard'); // Баъди удол кадан ба саҳифаи асосӣ бармегардад
    }
  };

  // 2. Амал барои таҳрир кардани маълумот (Edit)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtor) return;
    if (!editName || !editAmount) return;

    await updateDebtor(debtor.id, { name: editName, amount: editAmount });
    setIsEditModalOpen(false);
  };

  // 3. Амал барои илова кардани тӯлов (Add Payment)
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtor) return;
    if (!paymentAmount || Number(paymentAmount) <= 0) return;

    const currentDebt = parseFloat(String(debtor.amount));
    const payValue = parseFloat(paymentAmount);
    const newAmount = Math.max(0, currentDebt - payValue);

    await updateDebtor(debtor.id, { ...debtor, amount: `${newAmount}` });
    
    if (typeof addPayment === 'function') {
      await addPayment({
        debt_id: debtor.id,
        name: debtor.name,
        amount: `${payValue}`,
        time: 'Ҳозир',
        type: 'Қисман баргардонида шуд',
        color: 'text-emerald-400'
      });
    }

    setPaymentAmount('');
    setIsPaymentModalOpen(false);
  };


  const handleCloseDebt = async () => {
    if (!debtor) return;
    const confirmClose = window.confirm(`Оё боварӣ доред, ки қарзи ${debtor.name} пурра пӯшида шуд?`);
    if (confirmClose) {
      await updateDebtor(debtor.id, { ...debtor, amount: '0' });
    }
  };

  if (!debtor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f131c] text-slate-800 dark:text-slate-300 flex flex-col items-center justify-center p-6">
        <p className="text-sm text-slate-500 dark:text-slate-500 dark:text-slate-500 mb-4">Қарздор бо чунин ID ёфт нашуд.</p>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] text-xs text-[#8faeff] px-4 py-2 rounded-xl hover:bg-[#1e2533] transition"
        >
          ← Баргаштан ба Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f131c] text-slate-800 dark:text-slate-300 p-6 md:p-8 antialiased">
      
      {/* Тугмаи баргашт */}
      <button 
        onClick={() => navigate('/dashboard')} 
        className="flex items-center gap-2 text-xs text-[#8faeff] mb-6 hover:underline font-medium bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] px-3.5 py-2 rounded-xl transition"
      >
        <FiArrowLeft className="w-4 h-4" /> Баргаштан ба Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* КАРТАИ МАЪЛУМОТИ ШАХСӢ (ПРОФИЛ) */}
        <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6 flex flex-col items-center text-center justify-center relative overflow-hidden">
          
          <img 
            src={debtor.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
            alt={debtor.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-[#1e2533] mb-4 shadow-xl" 
          />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-200">{debtor.name}</h2>
          <span className="text-[10px] text-[#8faeff] font-mono uppercase bg-gray-100 dark:bg-[#1e293b] px-2 py-0.5 rounded mt-1.5 font-bold tracking-wider">
            ID: {debtor.id}
          </span>

          {/* ТУГМАҲОИ EDIT ВА DELETE УД ПАСТ РАСМ */}
            <div className="flex gap-2 mt-4">
            <button 
              onClick={() => { setEditName(debtor.name); setEditAmount(String(parseFloat(String(debtor.amount)))); setIsEditModalOpen(true); }}
              className="flex items-center gap-1 bg-[#1e2433] hover:bg-[#252f42] text-xs text-slate-800 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-[#2c354a] transition"
            >
              <FiEdit2 className="w-3.5 h-3.5 text-amber-500" /> Edit
            </button>
            <button 
              onClick={handleDelete}
              className="flex items-center gap-1 bg-rose-950/20 hover:bg-rose-950/40 text-xs text-rose-400 px-3 py-1.5 rounded-lg border border-rose-900/30 transition"
            >
              <FiTrash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>

          <div className="w-full border-t border-[#222938]/60 my-5"></div>

          {/* Баланси умумии қарзи ҳамин одам */}
          <div className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#1e2533] rounded-xl p-4">
            <p className="text-slate-500 dark:text-slate-500 dark:text-slate-500 text-[10px] font-semibold uppercase tracking-wider">Қарзи Боқимонда</p>
            <h3 className="text-xl font-bold text-emerald-400 mt-1">
              {String(debtor.amount).includes('TJS') ? debtor.amount : `${debtor.amount} TJS`}
            </h3>
          </div>
        </div>

        {/* ТАЪРИХИ ТӮЛОВҲОИ ҲАМИН ҚАРЗДОР */}
        <div className="lg:col-span-2 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BiHistory className="w-5 h-5 text-[#8faeff]" />
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-300">Таърихи Тӯловҳо</h4>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {debtorPayments.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-200 dark:border-[#222938] rounded-xl">
                  <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500">Ҳеҷ гуна тӯлови охирин барои ин корбар ба қайд гирифта нашудааст.</p>
                </div>
              ) : (
                debtorPayments.map((p) => (
                  <div key={p.id} className="bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#1e2533] rounded-xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[#1d2433] flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <BiWallet className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-900 dark:text-slate-200">{p.type || 'Қисман баргардонида шуд'}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                          <FiCalendar className="w-3 h-3" /> {p.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold ${p.color || 'text-emerald-400'}`}>{p.amount}</span>
                      <p className="text-[9px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono uppercase tracking-tight mt-1 inline-block">
                        Success
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Қисми функсионалии тӯловҳо */}
          <div className="flex gap-3 mt-6">
            <button 
              onClick={() => setIsPaymentModalOpen(true)}
              className="flex-1 bg-gray-100 dark:bg-[#1d2433] hover:bg-[#252f42] border border-gray-200 dark:border-[#222938] text-slate-800 dark:text-slate-300 text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <FiPlus /> Илова кардани Тӯлов
            </button>
            <button 
              onClick={handleCloseDebt}
              className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold py-3 rounded-xl transition"
            >
              Пурра Пӯшидани Қарз
            </button>
          </div>
        </div>

      </div>

      {/* МОДАЛИ ТАҲРИР КАРДАН (EDIT MODAL) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button onClick={() => setIsEditModalOpen(false)} className="absolute right-4 top-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 transition">
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 mb-4">Таҳрири Маълумот</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Ному Насаб</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Маблағи Қарз (TJS)</label>
                <input 
                  type="number" 
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-[#b0c4de] hover:bg-[#c5d3e8] text-[#0f131c] font-bold py-3 rounded-xl text-xs transition">
                Сабт кардан
              </button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛИ ИЛОВА КАРДАНИ ТӮЛОВ (ADD PAYMENT MODAL) */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute right-4 top-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 transition">
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 mb-4">Илова кардани Тӯлов</h3>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Маблағи воридшуда (TJS)</label>
                <input 
                  type="number" 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Масалан: 500"
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-[#0f131c] font-bold py-3 rounded-xl text-xs transition">
                Тӯловро қабул кардан
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DebtorProfile;