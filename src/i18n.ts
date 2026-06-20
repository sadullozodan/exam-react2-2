import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ENG: {
    translation: {
      "header": {
        "login": "Login"
      },
      "hero": {
        "title1": "Track All Your Debts.",
        "title2": "Manage Your Financials.",
        "subtitle": "Take total control of your cash flow and financial assets right from your pocket. Complete security, maximum privacy, and seamless offline capabilities without any boundaries.",
        "startBtn": "Start for Free"
      },
      "auth": {
        "welcome": "Welcome Back",
        "enterCreds": "Enter your credentials to access your account.",
        "email": "Email Address",
        "password": "Password",
        "forgot": "Forgot password?",
        "remember": "Remember this device",
        "connecting": "Connecting...",
        "login": "Login",
        "continueWith": "Or continue with",
        "noAccount": "Don't have an account?",
        "signUp": "Sign Up",
        "createAccount": "Create Account",
        "enterDetails": "Enter your details to create a new workspace.",
        "name": "Full Name",
        "creating": "Creating...",
        "already": "Already have an account?"
      }
    }
  },
  RUS: {
    translation: {
      "header": {
        "login": "Войти"
      },
      "hero": {
        "title1": "Отслеживайте долги.",
        "title2": "Управляйте финансами.",
        "subtitle": "Возьмите под полный контроль свои денежные потоки и финансовые активы прямо из кармана. Полная безопасность, максимальная конфиденциальность и автономная работа без границ.",
        "startBtn": "Начать бесплатно"
      },
      "auth": {
        "welcome": "С возвращением",
        "enterCreds": "Введите свои учетные данные для доступа.",
        "email": "Электронная почта",
        "password": "Пароль",
        "forgot": "Забыли пароль?",
        "remember": "Запомнить устройство",
        "connecting": "Подключение...",
        "login": "Войти",
        "continueWith": "Или продолжите через",
        "noAccount": "Нет аккаунта?",
        "signUp": "Регистрация",
        "createAccount": "Создать аккаунт",
        "enterDetails": "Введите данные для создания аккаунта.",
        "name": "Полное имя",
        "creating": "Создание...",
        "already": "Уже есть аккаунт?"
      }
    }
  },
  TJK: {
    translation: {
      "header": {
        "login": "Ворид шудан"
      },
      "hero": {
        "title1": "Қарзҳои худро назорат кунед.",
        "title2": "Молияи худро идора кунед.",
        "subtitle": "Назорати пурраи гардиши маблағҳо ва дороиҳои молиявии худро аз телефони худ ба даст оред. Амнияти комил, махфияти максималӣ ва қобилиятҳои бефосилаи офлайн бидуни ҳеҷ маҳдудият.",
        "startBtn": "Ройгон оғоз кунед"
      },
      "auth": {
        "welcome": "Хуш омадед",
        "enterCreds": "Барои ворид шудан маълумоти худро ворид кунед.",
        "email": "Почтаи электронӣ",
        "password": "Рамз",
        "forgot": "Рамзро фаромӯш кардед?",
        "remember": "Дар ин дастгоҳ дар хотир нигоҳ дор",
        "connecting": "Пайвастшавӣ...",
        "login": "Ворид шудан",
        "continueWith": "Ё идома диҳед бо",
        "noAccount": "Ҳисоб надоред?",
        "signUp": "Бақайдгирӣ",
        "createAccount": "Эҷоди ҳисоб",
        "enterDetails": "Барои сохтани ҳисоби нав маълумоти худро ворид кунед.",
        "name": "Ному Насаб",
        "creating": "Сохта истодааст...",
        "already": "Аллакай ҳисоб доред?"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'TJK',
    debug: false,
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;
