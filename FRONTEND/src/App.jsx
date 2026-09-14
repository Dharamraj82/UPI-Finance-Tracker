import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Platforms from './pages/platforms/Platforms';
import AnalysisReport from './pages/platforms/AnalysisReport';
import NotFound from './pages/NotFound';
import Docs from './pages/Docs';
import UserPage from './pages/u/UserPage';
import AuthModal from './components/AuthModal';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/u/');

  return (
    <div className="min-h-screen relative font-sans selection:bg-indigo-500/30 flex flex-col">
      {!isDashboard && <Navbar />}
      
      {/* Main Route Content */}
      <div className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platforms />} />
          <Route path="/platform/report/:sessionId" element={<AnalysisReport />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/u/:username" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isDashboard && <Footer />}
      <AuthModal />
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '100px',
            fontSize: '14px',
            fontWeight: '500'
          }
        }} 
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;