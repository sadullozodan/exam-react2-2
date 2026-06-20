import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/login/login';
import DashboardPage from './pages/dashboard/dashboard';
import SignUpPage from './pages/signUp/signUp';
import HomePage from './pages/home/home';
import DebtorProfile from "./pages/DebtorProfile/DebtorProfile"
import Profile from './pages/profile/profile';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/debtor/:id" element={<DebtorProfile />} />
        
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;