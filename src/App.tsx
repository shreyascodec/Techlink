import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Industries from './pages/Industries';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import CaseStudies from './pages/CaseStudies';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/services/:slug"
              element={
                <PageTransition>
                  <ServiceDetail />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/industries"
              element={
                <PageTransition>
                  <Industries />
                </PageTransition>
              }
            />
            <Route
              path="/resources"
              element={
                <PageTransition>
                  <Resources />
                </PageTransition>
              }
            />
            <Route
              path="/case-studies"
              element={
                <PageTransition>
                  <CaseStudies />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PageTransition>
                  <PrivacyPolicy />
                </PageTransition>
              }
            />
            <Route
              path="/terms-of-service"
              element={
                <PageTransition>
                  <TermsOfService />
                </PageTransition>
              }
            />
            <Route
              path="/cookie-policy"
              element={
                <PageTransition>
                  <CookiePolicy />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;

