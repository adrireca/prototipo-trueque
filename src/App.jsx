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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="registro" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<ServicesLanding />} />
            <Route path="/servicio/:id" element={<ServiceDetail />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/guardados" element={<Favorites />} />
            <Route path="/publicar" element={<CreateAd />} />
            <Route path="/editar-servicio/:id" element={<CreateAd />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;