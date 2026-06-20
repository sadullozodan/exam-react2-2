import React, { useEffect, useState } from 'react';
import { BiHistory, BiWallet } from 'react-icons/bi';
import { FiBell, FiEdit2, FiFileText, FiGrid, FiPlus, FiSearch, FiTrash2, FiUserCheck, FiUsers, FiX } from 'react-icons/fi';
import { MdTrendingDown, MdTrendingUp } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuthStore } from '../../store/authStore';
import { useDashboardStore } from './useDashboard';

const CustomTooltip: React.FC<{ active?: boolean; payload?: any[] }> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] p-2.5 rounded-xl shadow-2xl">
        <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-0.5">{payload[0].payload.name}</p>
        <p className="text-xs font-bold text-[#8faeff]">{payload[0].value.toLocaleString()} TJS</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { 
    activeTab, setActiveTab, balance, debtors, recentPayments, chartData,
    remindDebtor, fetchDebtors, addDebtor, isModalOpen, setIsModalOpen,
    // ФУНКСИЯҲОИ БЭКЕНД БАРОИ КОРБАР (дар мағозаи умумии худ илова кун)
    updateUser, deleteUser, workspaceUsers 
  } = useDashboardStore();

  const navigate = useNavigate();
  const { user, isAuthenticated, getMe, logout } = useAuthStore();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState('they_owe_me'); // ADDED DIRECTION
  const [searchQuery, setSearchQuery] = useState('');

  // Стейтҳо барои Модали Таҳрири Корбар (Edit User)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('Admin');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    getMe();
  }, [isAuthenticated, navigate, getMe]);

  useEffect(() => {
    fetchDebtors();
  }, [fetchDebtors]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    addDebtor({ name, amount, direction }); // Pass direction
    
    setName('');
    setAmount('');
    setDirection('they_owe_me');
    setIsModalOpen(false);
  };

  // Функсияи кушодани модали таҳрир
  const openEditModal = (u: any) => {
    setEditingUser(u);
    setEditName(u.name || '');
    setEditEmail(u.email || '');
    setEditRole(u.role || 'Admin');
    setIsEditModalOpen(true);
  };

  // Сабти тағйироти корбар дар бэкенд
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUser) {
      updateUser(editingUser.id, { name: editName, email: editEmail, role: editRole });
    } else {
      console.log("Пайваст ба бэкенд:", { id: editingUser.id, name: editName, email: editEmail, role: editRole });
    }
    setIsEditModalOpen(false);
  };

  // Нест кардани корбар аз бэкенд
  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Шумо дар ҳақиқат мехоҳед ин корбарро нест кунед?")) {
      if (deleteUser) {
        deleteUser(userId);
      } else {
        console.log("Корбар нест карда шуд бо ID:", userId);
      }
    }
  };

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <FiGrid className="w-5 h-5" /> },
    { id: 'Debts', label: 'Debts', icon: <FiUserCheck className="w-5 h-5" /> },
    { id: 'Contacts', label: 'Contacts', icon: <BiHistory className="w-5 h-5" /> },
    { id: 'Users', label: 'Users', icon: <FiUsers className="w-5 h-5" /> },
  ];

  const filteredDebtors = debtors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Рӯйхати корбарон (агар аз бэкенд наояд, ҳамчун модел нишон медиҳад)
  const displayUsers = workspaceUsers || [
    { id: user?.id || 'current-admin', name: user?.name || 'Иброҳим А.', email: user?.email || 'admin@adl.com', role: 'Owner' },
    { id: 'user-2', name: 'Салимҷон Н.', email: 'salim@adl.com', role: 'Admin' },
    { id: 'user-3', name: 'Комрон Б.', email: 'komron@adl.com', role: 'Manager' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            {/* Карты баланса */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-5 relative overflow-hidden">
                <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider">Total Balance</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mt-2">{balance.total} <span className="text-amber-500 font-medium text-lg">TJS</span></h3>
                <p className="text-emerald-500 text-xs mt-3 flex items-center gap-1">↗ +12.5% this month</p>
                <BiWallet className="absolute right-4 top-5 w-12 h-12 text-slate-700 opacity-20" />
              </div>

              <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-5 relative overflow-hidden">
                <p className="text-emerald-500 text-xs font-semibold uppercase tracking-wider">Debts Given</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mt-2">{balance.given} <span className="text-emerald-500 font-medium text-lg">TJS</span></h3>
                <p className="text-emerald-500 text-xs mt-3 flex items-center gap-1">🔄 {debtors.length} active borrowers</p>
                <MdTrendingUp className="absolute right-4 top-5 w-12 h-12 text-emerald-500 opacity-10" />
              </div>

              <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-5 relative overflow-hidden">
                <p className="text-rose-400 text-xs font-semibold uppercase tracking-wider">Debts Taken</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-200 mt-2">{balance.taken} <span className="text-rose-400 font-medium text-lg">TJS</span></h3>
                <p className="text-amber-500 text-xs mt-3 flex items-center gap-1">⚠️ 2 pending repayments</p>
                <MdTrendingDown className="absolute right-4 top-5 w-12 h-12 text-rose-400 opacity-10" />
              </div>
            </div>

            {/* График ва Тӯловҳои охирин */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-5 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-300">Debt Analytics 2026</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500">Comparative monthly flow of credit vs debt</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-[#0f131c] p-0.5 rounded-xl flex">
                    <button className="bg-[#8faeff] text-[#0f131c] text-xs font-bold px-3 py-1.5 rounded-lg">Yearly</button>
                    <button className="text-slate-600 dark:text-slate-400 text-xs px-3 py-1.5 rounded-lg ml-1">Monthly</button>
                  </div>
                </div>
                <div className="w-full h-48 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData || []} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#222938" strokeDasharray="4 4" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#475569" 
                        tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }} 
                        axisLine={false}
                        tickLine={false}
                        dy={8}
                      />
                      <YAxis 
                        stroke="#475569" 
                        tick={{ fill: '#64748b', fontSize: 10 }} 
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => v >= 1000 ? `${v / 1000}k` : v}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#222938', strokeWidth: 1 }} />
                      <Area type="monotone" dataKey="credit" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#chartGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-300">Recent Payments</h4>
                  <button className="text-xs text-[#8faeff] hover:underline">View All</button>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {recentPayments.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 text-center py-4">No recent payments</p>
                  ) : (
                    recentPayments.map((p) => (
                      <div key={p.id} className="bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#1e2533] rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[#1d2433] flex items-center justify-center text-slate-600 dark:text-slate-400">
                            <BiWallet className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-900 dark:text-slate-200">{p.name}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-500 mt-0.5">{p.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold ${p.color || 'text-emerald-400'}`}>{p.amount}</span>
                          <p className="text-[9px] text-slate-500 dark:text-slate-500 dark:text-slate-500 uppercase tracking-tight mt-0.5">{p.type}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Қарздорони Актив */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-5">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-300 mb-4">Active Debtors</h4>
                
                {debtors.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 text-center py-8">Рӯйхат холӣ аст. Одам илова кунед.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {debtors.slice(0, 3).map((d) => (
                      <div key={d.id} className="bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#1e2533] rounded-xl p-4 flex flex-col items-center text-center">
                        <Link to={`/debtor/${d.id}`} className="hover:opacity-80 transition cursor-pointer">
                          <img 
                            src={d.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
                            alt={d.name} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 mb-2" 
                          />
                        </Link>
                        <Link to={`/debtor/${d.id}`} className="hover:text-[#8faeff] transition cursor-pointer">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-300">{d.name}</p>
                        </Link>
                        <p className="text-xs text-emerald-400 font-bold mt-1">
                          {String(d.amount).includes('TJS') ? d.amount : `${d.amount} TJS`}
                        </p>
                        <button 
                          onClick={() => remindDebtor(d.name)}
                          className="mt-3 w-full bg-white dark:bg-[#161b26] hover:bg-[#1e2533] text-[10px] text-slate-600 dark:text-slate-400 py-1.5 rounded-lg border border-gray-200 dark:border-[#222938] font-medium tracking-wider uppercase transition"
                        >
                          Remind
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between gap-3">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-[#b0c4de] hover:bg-[#c5d3e8] text-[#0f131c] font-bold rounded-2xl flex items-center justify-center gap-2 text-sm transition py-4 lg:py-0"
                >
                  <FiPlus className="w-5 h-5 stroke-[3]" /> New Loan
                </button>
                <button className="flex-1 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] hover:bg-[#1e2533] text-emerald-400 font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm transition py-4 lg:py-0">
                  <FiFileText className="w-5 h-5" /> Reports
                </button>
              </div>
            </div>
          </>
        );

      case 'Debts':
        return (
          <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-md font-bold text-slate-900 dark:text-slate-200">All Active Loans</h3>
                <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500">Manage and track your active lent amounts</p>
              </div>
              <div className="relative w-full sm:w-64">
                <FiSearch className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500 dark:text-slate-500 dark:text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search debtor..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 dark:bg-[#0f131c] text-xs pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-[#222938] w-full text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8faeff]"
                />
              </div>
            </div>

            {filteredDebtors.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 text-center py-8">Ҳеҷ гуна қарздор пайдо нашуд.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#222938] text-[11px] uppercase text-slate-500 dark:text-slate-500 dark:text-slate-500 font-mono tracking-wider">
                      <th className="pb-3 pl-2">Debtor</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222938]/40 text-xs">
                    {filteredDebtors.map((d) => (
                      <tr key={d.id} className="hover:bg-[#0f131c]/40 transition">
                        <td className="py-3.5 pl-2 flex items-center gap-3">
                          <img src={d.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} className="w-8 h-8 rounded-full object-cover" alt="" />
                          <Link to={`/debtor/${d.id}`} className="font-semibold text-slate-800 dark:text-slate-300 hover:text-[#8faeff]">{d.name}</Link>
                        </td>
                        <td className="py-3.5 text-emerald-400 font-bold">
                          {String(d.amount).includes('TJS') ? d.amount : `${d.amount} TJS`}
                        </td>
                        <td className="py-3.5">
                          {d.status === 'paid' ? (
                            <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-medium font-mono uppercase">Paid</span>
                          ) : d.status === 'partial' ? (
                            <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded text-[10px] font-medium font-mono uppercase">Partial</span>
                          ) : (
                            <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-[10px] font-medium font-mono uppercase">Pending</span>
                          )}
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          <button onClick={() => remindDebtor(d.name)} className="bg-gray-100 dark:bg-[#1d2433] hover:bg-[#252f42] text-slate-800 dark:text-slate-300 text-[10px] px-3 py-1.5 rounded-lg transition font-medium">Remind</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'Contacts':
        return (
          <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6 text-center py-12">
            <BiHistory className="w-12 h-12 text-slate-600 mx-auto mb-3 opacity-40" />
            <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 mb-1">Transaction History & Contacts</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 max-w-md mx-auto">Here you will see historical logs of communication and automatically archived settled loans.</p>
          </div>
        );

      case 'Users':
        return (
          <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl p-6">
            <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 mb-2">Workspace Members</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 dark:text-slate-500 mb-6">Manage roles and permissions for secondary administrative panels.</p>
            
            <div className="space-y-3">
              {displayUsers.map((u: any) => (
                <div key={u.id} className="bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#1e2533] rounded-xl p-4 flex items-center justify-between hover:border-[#222938] transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1e293b] flex items-center justify-center text-xs font-bold text-[#8faeff]">
                      {u.name ? u.name.substring(0, 2).toUpperCase() : 'US'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-200">
                        {u.name} {u.id === user?.id && '(You)'}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-500">{u.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                      u.role === 'Owner' ? 'bg-[#8faeff]/10 text-[#8faeff]' : 'bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {u.role}
                    </span>
                    
                    {/* ТУГМАҲОИ EDIT ВА DELETE */}
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => openEditModal(u)}
                        className="p-2 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-lg text-slate-600 dark:text-slate-400 hover:text-[#8faeff] hover:border-[#8faeff]/30 transition"
                        title="Таҳрир"
                      >
                        <FiEdit2 className="w-3.5 h-3.5" />
                      </button>
                      
                      {u.id !== user?.id && (
                        <button 
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-lg text-slate-600 dark:text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition"
                          title="Нест кардан"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div className="text-slate-600 dark:text-slate-400 p-8 text-center bg-white dark:bg-[#161b26] rounded-2xl border border-gray-200 dark:border-[#222938]">Саҳифа ёфт нашуд.</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f131c] text-slate-800 dark:text-slate-300 antialiased">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-50 dark:bg-[#0f131c] border-r border-gray-200 dark:border-[#1e2533] flex flex-col justify-between p-5 hidden md:flex">
        <div>
          <div className="text-slate-900 dark:text-slate-200 font-bold text-lg mb-8 px-2 font-mono">Adl 5:8</div>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                  activeTab === item.id ? 'bg-gray-100 dark:bg-[#1e293b] text-[#8faeff] border-l-4 border-[#8faeff] pl-3' : 'text-slate-600 dark:text-slate-400 hover:bg-[#161b26]'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/20 rounded-xl mb-4 transition"
          >
            Logout
          </button>
          <div className="border-t border-gray-200 dark:border-[#1e2533] pt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-[#8faeff]">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'IA'}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-200">{user?.name || 'Иброҳим А.'}</p>
              <span className="text-[9px] text-[#8faeff] font-mono uppercase bg-gray-100 dark:bg-[#1e293b] px-1.5 py-0.5 rounded">Premium Plan</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          {/* АКУНУН БА САҲИФАИ ПРОФИЛИ ХУДАТ МЕРАВАД, НА КАРЗДОР */}
          <Link 
            to="/profile" 
            className="group flex items-center gap-3 hover:opacity-90 transition focus:outline-none"
          >
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'} 
              alt="User Avatar" 
              className="w-9 h-9 rounded-xl object-cover border border-gray-200 dark:border-[#222938] group-hover:border-[#8faeff] transition"
            />
            <div>
              <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-200 group-hover:text-[#8faeff] transition line-clamp-1">
                {activeTab === 'Dashboard' ? `Хуш омадед, ${user?.name || 'Иброҳим'}!` : activeTab}
              </h1>
              {activeTab === 'Dashboard' && (
                <p className="text-[10px] text-slate-500 dark:text-slate-500 dark:text-slate-500 text-left">Таҳрири профил →</p>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {activeTab === 'Dashboard' && (
              <div className="relative hidden sm:block">
                <FiSearch className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500 dark:text-slate-500 dark:text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="bg-white dark:bg-[#161b26] text-xs pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-[#222938] w-64 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8faeff]" 
                />
              </div>
            )}
            <button className="w-9 h-9 bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-xl flex items-center justify-center relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 transition">
              <FiBell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {renderContent()}
      </main>

      {/* МОДАЛ БАРОИ ИЛОВА КАРДАНИ QАРЗДОР */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 transition"
            >
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 mb-4">Илова кардани Qарздор</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Ному Насаб</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Масалан: Алиев Насим" 
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Маблағ (TJS)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Масалан: 2400" 
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Самти Қарз</label>
                <select 
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#8faeff]"
                >
                  <option value="they_owe_me">Онҳо ба ман қарздоранд (Ман додам)</option>
                  <option value="i_owe_them">Ман ба онҳо қарздорам (Ман гирифтам)</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#b0c4de] hover:bg-[#c5d3e8] text-[#0f131c] font-bold py-3 rounded-xl text-xs transition mt-2"
              >
                Илова кардан
              </button>
            </form>
          </div>
        </div>
      )}

      {/* МОДАЛИ НАВ БАРОИ EDIT КАРДАНИ КОРБАР (WORKSPACE USER) */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#161b26] border border-gray-200 dark:border-[#222938] rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute right-4 top-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 transition"
            >
              <FiX className="w-5 h-5" />
            </button>
            <h3 className="text-md font-bold text-slate-900 dark:text-slate-200 mb-4">Таҳрири Маълумоти Корбар</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Ном</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Нақш (Role)</label>
                <select 
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#0f131c] border border-gray-200 dark:border-[#222938] rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#8faeff] hover:bg-[#a3bfff] text-[#0f131c] font-bold py-3 rounded-xl text-xs transition mt-2"
              >
                Захира кардан
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;