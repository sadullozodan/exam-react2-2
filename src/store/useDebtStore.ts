import { create } from 'zustand';
import { axiosRequest } from './authStore';

interface Debt {
  id: string;
  contact_id?: string;
  name?: string;
  amount?: string | number;
  currency?: string;
  avatar?: string;
}

interface DebtState {
  debts: Debt[];
  loading: boolean;
  fetchDebts: () => Promise<void>;
  addDebt: (newDebt: any) => Promise<void>;
  updateDebt: (id: string, updatedData: any) => Promise<void>;
  deleteDebt: (id: string) => Promise<void>;
  addPayment: (payment: any) => Promise<void>;
  remindDebtor: (name: string) => void;
}

export const useDebtStore = create<DebtState>((set, get) => ({
  debts: [],
  loading: false,

  fetchDebts: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosRequest.get(`/dashboard/summary`);
      
      const debts: Debt[] = (data?.upcoming_due || []).map((d: any) => ({
        id: d.id,
        contact_id: d.contact_id,
        name: d.contact_name,
        amount: d.amount,
        currency: d.currency || 'TJS',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'
      }));

      set({ debts, loading: false });
    } catch (error) {
      console.error("Error fetching debts:", error);
      set({ loading: false });
    }
  },

  addDebt: async (newDebt: any) => {
    try {
      let contact_id = newDebt.contact_id;
      if (!contact_id && newDebt.name) {
        const contactRes = await axiosRequest.post('/contacts', { name: newDebt.name });
        contact_id = contactRes.data.id;
      }

      const payload = {
        contact_id: contact_id || '00000000-0000-0000-0000-000000000000',
        direction: newDebt.direction || 'they_owe_me', 
        amount: parseFloat(newDebt.amount),
        currency: 'TJS'
      };
      await axiosRequest.post(`/debts`, payload);
      get().fetchDebts();
    } catch (error: any) {
      console.error("Error adding debt:", error?.response?.data || error);
      alert("Хатогӣ: " + JSON.stringify(error?.response?.data || error.message));
    }
  },

  updateDebt: async (id: string, updatedData: any) => {
    try {
      const debtor = get().debts.find((d: Debt) => String(d.id) === String(id));
      if (updatedData.name && debtor && debtor.contact_id) {
        await axiosRequest.patch(`/contacts/${debtor.contact_id}`, { name: updatedData.name });
      }
      
      const debtPayload: any = {};
      if (updatedData.amount !== undefined) {
        const amt = parseFloat(updatedData.amount);
        if (amt === 0) {
          debtPayload.status = 'paid';
        } else {
          debtPayload.amount = amt;
          debtPayload.status = 'partial';
        }
      }
      
      if (Object.keys(debtPayload).length > 0) {
        await axiosRequest.patch(`/debts/${id}`, debtPayload);
      }
      get().fetchDebts();
    } catch (err) {
      console.error("Error updating debt:", err);
    }
  },

  deleteDebt: async (id: string) => {
    try {
      await axiosRequest.delete(`/debts/${id}`);
      get().fetchDebts();
    } catch (err) {
      console.error("Error deleting debt:", err);
    }
  },

  addPayment: async (payment: any) => {
    try {
      const debt_id = payment.debt_id || payment.id;
      if (!debt_id) {
        console.error("No debt_id provided for payment");
        return;
      }
      await axiosRequest.post(`/debts/${debt_id}/payments`, {
        amount: parseFloat(payment.amount),
        note: payment.note || 'Payment from UI'
      });
      get().fetchDebts();
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  },

  remindDebtor: (name: string) => {
    alert(`Напоминание отправлено: ${name}!`);
  },
}));
