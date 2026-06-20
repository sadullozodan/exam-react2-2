import { create } from 'zustand';
import { axiosRequest } from '../../store/authStore';

export interface Balance {
  total: string;
  given: string;
  taken: string;
}

export interface Debtor {
  id: string;
  contact_id: string;
  name: string;
  amount: number | string;
  currency: string;
  direction: 'they_owe_me' | 'i_owe_them';
  status: 'pending' | 'partial' | 'paid';
  avatar: string;
}

export interface NewDebtor {
  contact_id?: string;
  name?: string;
  amount: string | number;
  direction?: 'they_owe_me' | 'i_owe_them';
}

export interface UpdateDebtorData {
  name?: string;
  amount?: string | number;
}

export interface PaymentData {
  id?: string;
  debt_id?: string;
  amount: string | number;
  note?: string;
  name?: string;
  time?: string;
  color?: string;
  type?: string;
}

export interface ChartDataPoint {
  name: string;
  credit: number;
  debt: number;
}

export interface ApiContact {
  id: string;
  name: string;
}

export interface ApiDebt {
  id: string;
  contact_id: string;
  contact_name?: string;
  amount: number;
  currency: string;
  direction: 'they_owe_me' | 'i_owe_them';
  status: 'pending' | 'partial' | 'paid';
}

export interface DashboardState {
  activeTab: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  setActiveTab: (tab: string) => void;
  
  balance: Balance;
  debtors: Debtor[];
  recentPayments: PaymentData[];
  loading: boolean;
  
  fetchDebtors: () => Promise<void>;
  addDebtor: (newDebtor: NewDebtor) => Promise<void>;
  updateDebtor: (id: string, updatedData: UpdateDebtorData) => Promise<void>;
  deleteDebtor: (id: string) => Promise<void>;
  addPayment: (payment: PaymentData) => Promise<void>;
  remindDebtor: (name: string) => void;
  
  chartData: ChartDataPoint[];
  // Optional workspace user management (some pages expect these)
  updateUser?: (id: string, data: { name?: string; email?: string; role?: string }) => Promise<void> | void;
  deleteUser?: (id: string) => Promise<void> | void;
  workspaceUsers?: Array<{ id: string; name?: string; email?: string; role?: string }>;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeTab: 'Dashboard',
  isModalOpen: false, 
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  
  balance: {
    total: '0.00',
    given: '0.00',
    taken: '0.00'
  },
  
  debtors: [], 
  recentPayments: [], 
  loading: false,

  fetchDebtors: async () => {
    set({ loading: true });
    try {
      const [summaryRes, debtsRes, contactsRes] = await Promise.all([
        axiosRequest.get(`/dashboard/summary`),
        axiosRequest.get(`/debts`),
        axiosRequest.get(`/contacts`)
      ]);
      
      const data = summaryRes.data;
      const balance: Balance = {
        total: data.outstanding?.net_balance?.toFixed(2) || '0.00',
        given: data.outstanding?.they_owe_me?.toFixed(2) || '0.00',
        taken: data.outstanding?.i_owe_them?.toFixed(2) || '0.00'
      };

      const allDebts = debtsRes.data || [];
      const allContacts = contactsRes.data || [];

      // Филтр кардани қарзҳои пӯшиданашуда (pending ё partial) агар лозим бошад. 
      // Дар ин ҷо ҳамаи қарзҳоро нишон медиҳем.
      const debtors: Debtor[] = allDebts.map((d: ApiDebt) => {
        const contact = allContacts.find((c: ApiContact) => String(c.id) === String(d.contact_id));
        return {
          id: d.id,
          contact_id: d.contact_id,
          name: contact ? contact.name : (d.contact_name || 'Номаълум'),
          amount: d.amount,
          currency: d.currency || 'TJS',
          direction: d.direction,
          status: d.status,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
        };
      });

      set({ balance, debtors, loading: false });
    } catch (error) {
      console.error("Хатоги ҳангоми гирифтани маълумот:", error);
      set({ loading: false });
    }
  },

  // 2. Илова кардани қарздори нав
  addDebtor: async (newDebtor: NewDebtor) => {
    try {
      // 1. Create the contact first
      let contact_id = newDebtor.contact_id;
      if (!contact_id && newDebtor.name) {
        const contactRes = await axiosRequest.post('/contacts', { name: newDebtor.name });
        contact_id = contactRes.data.id;
      }

      // 2. Create the debt
      const payload = {
        contact_id: contact_id || '00000000-0000-0000-0000-000000000000',
        direction: newDebtor.direction || 'they_owe_me', 
        amount: parseFloat(String(newDebtor.amount)),
        currency: 'TJS'
      };
      await axiosRequest.post(`/debts`, payload);
      get().fetchDebtors(); // refresh after add
    } catch (err) {
      const error = err as Error & { response?: { data?: unknown } };
      console.error("Хатоги ҳангоми сайт кардан:", error?.response?.data || error);
      alert("Хатогӣ: " + JSON.stringify(error?.response?.data || error.message));
    }
  },

  
  updateDebtor: async (id: string, updatedData: UpdateDebtorData) => {
    try {
      const debtor = get().debtors.find((d: Debtor) => String(d.id) === String(id));
      if (updatedData.name && debtor && debtor.contact_id) {
        await axiosRequest.patch(`/contacts/${debtor.contact_id}`, { name: updatedData.name });
      }
      
      const debtPayload: Partial<ApiDebt> = {};
      if (updatedData.amount !== undefined) {
        const amt = parseFloat(String(updatedData.amount));
        if (amt === 0) {
          debtPayload.status = 'paid';
        } else {
          debtPayload.amount = amt;
          debtPayload.status = 'partial'; // Or leave it alone, but this ensures it updates correctly
        }
      }
      
      if (Object.keys(debtPayload).length > 0) {
        await axiosRequest.patch(`/debts/${id}`, debtPayload);
      }
      get().fetchDebtors(); // refresh
    } catch (err) {
      console.error("Хатогӣ ҳангоми таҳрир (Бэкенд кор накард):", err);
    }
  },

  deleteDebtor: async (id: string) => {
    try {
      await axiosRequest.delete(`/debts/${id}`);
      get().fetchDebtors(); // refresh
    } catch (err) {
      console.error("Хатогӣ ҳангоми нест кардан (Бэкенд кор накард):", err);
    }
  },


  addPayment: async (payment: PaymentData) => {
    try {
      const debt_id = payment.debt_id || payment.id; // assume payment contains debt_id
      if (!debt_id) {
        console.error("No debt_id provided for payment");
        return;
      }
      await axiosRequest.post(`/debts/${debt_id}/payments`, {
        amount: parseFloat(String(payment.amount)),
        note: payment.note || 'Payment from UI'
      });
      get().fetchDebtors(); // refresh after payment
    } catch (error) {
      console.error("Хатоги ҳангоми иловаи пардохт:", error);
    }
  },

  remindDebtor: (name: string) => {
    alert(`Паём ба ${name} фиристода шуд!`);
  },

  chartData: [
    { name: 'JAN', credit: 2000, debt: 1000 },
    { name: 'FEB', credit: 5000, debt: 2500 },
    { name: 'MAR', credit: 11000, debt: 4000 },
    { name: 'APR', credit: 9000, debt: 5000 },
    { name: 'MAY', credit: 4000, debt: 3000 },
    { name: 'JUN', credit: 8000, debt: 2000 },
    { name: 'JUL', credit: 14000, debt: 7000 },
    { name: 'AUG', credit: 22000, debt: 9000 }, 
    { name: 'SEP', credit: 15000, debt: 6000 },
    { name: 'OCT', credit: 4000, debt: 2000 },
    { name: 'NOV', credit: 2000, debt: 1000 },
    { name: 'DEC', credit: 13000, debt: 5000 },
  ],
}));