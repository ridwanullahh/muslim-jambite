
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import { AdminDashboard } from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { SharedLayout } from './components/layout/SharedLayout';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}><Index /></SharedLayout>} />
              <Route path="/about" element={<SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}><About /></SharedLayout>} />
              <Route path="/contact" element={<SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}><Contact /></SharedLayout>} />
              <Route path="/blog" element={<SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}><Blog /></SharedLayout>} />
              <Route path="/blog/:slug" element={<SharedLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode}><BlogPost /></SharedLayout>} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
