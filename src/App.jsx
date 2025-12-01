// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import CreateAd from './pages/CreateAd';
import ServicesLanding from './pages/ServicesLanding';
import ScrollToTop from './components/ScrollToTop';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import ContructionBanner from './components/ConstructionBanner';
import { CategoriesProvider } from './context/CategoriesContext';
import { ProvincesProvider } from './context/ProvincesContext';
import { ServiceProvider } from './context/ServicesContext';

function App() {
  return (
    <HashRouter>
    <AuthProvider>
      <ServiceProvider>
        <CategoriesProvider>
          <ProvincesProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col">
                <Header />
                <ContructionBanner />
                <main className="flex-grow">
                  <Routes>
                    <Route path="registro" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/servicios" element={<ServicesLanding />} />

                    <Route element={<ProtectedRoute />}>
                      <Route path="/servicio/:id" element={<ServiceDetail />} />
                      <Route path="/perfil" element={<Profile />} />
                      <Route path="/guardados" element={<Favorites />} />
                      <Route path="/publicar" element={<CreateAd />} />
                      <Route path="/editar-servicio/:id" element={<CreateAd />} />
                    </Route>
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </ProvincesProvider>
        </CategoriesProvider>
      </ServiceProvider>
    </AuthProvider>
    </HashRouter>
  );
}

export default App;