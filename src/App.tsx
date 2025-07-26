
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { StickyFomoBanner } from './components/ui/StickyFomoBanner';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import { Blog } from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <StickyFomoBanner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-center" />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
