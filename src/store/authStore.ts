import { create } from 'zustand';
import axios from 'axios';


export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API.endsWith('/api') ? import.meta.env.VITE_API : `${import.meta.env.VITE_API}/api`,
});


interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  created_at?: string;
}

interface AuthState {
  
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;


  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  getMe: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}


const getStoredTokens = () => ({
  accessToken: localStorage.getItem('access'),
  refreshToken: localStorage.getItem('refresh'),
});

const saveTokens = (access: string, refresh: string) => {
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
};

const removeTokens = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
const storedTokens = getStoredTokens();

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: storedTokens.accessToken,
  refreshToken: storedTokens.refreshToken,
  isLoading: false,
  error: null,
  isAuthenticated: !!storedTokens.accessToken,

  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosRequest.post('/auth/login', { email, password });
      
      saveTokens(data.accessToken, data.refreshToken);
      
      set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      console.log('Логин бомуваффақият иҷро шуд:', data);
    } catch (err: any) {
      console.error(err);
      set({
        isLoading: false,
        error: err?.response?.data?.error || err?.response?.data?.message || 'Email ё парол хато аст!',
      });
      throw err;
    }
  },
  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosRequest.post('/auth/register', { name, email, password });

      if (data.accessToken && data.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      }

      set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      console.log('Регистратсия бомуваффақият иҷро шуд:', data);
    } catch (err: any) {
      console.error(err);
      set({
        isLoading: false,
        error: err?.response?.data?.error || err?.response?.data?.message || 'Хатогӣ ҳангоми регистратсия. Дигарбора кӯшиш кунед.',
      });
      throw err;
    }
  },

  getMe: async () => {
    const { accessToken } = get();
    if (!accessToken) return;

    try {
      const { data } = await axiosRequest.get('/users/me');
      set({ user: data, isAuthenticated: true });
      console.log('Маълумоти ман:', data);
    } catch (err) {
      console.log('Корбар логин нашудааст', err);
      const state = get();
      state.logout();
    }
  },

  updateProfile: async (profileData: any) => {
    try {
      // API expects { name: string }
      const payload = {
        name: profileData.name || profileData.fullName
      };
      await axiosRequest.patch('/users/me', payload);
      await get().getMe();
    } catch (err) {
      console.error('Хатогӣ ҳангоми навсозии профил:', err);
      throw err;
    }
  },

  logout: () => {
    removeTokens();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

 
  clearError: () => set({ error: null }),
}));



axiosRequest.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
