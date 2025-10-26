// src/pages/Home.jsx
import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { mockServices } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import CategoriesSlider from '../components/CategoriesSlider';
import ServicesSlider from '../components/ServicesSlider';
import CTABanner from '../components/CTABanner';
import HowWeHelp from '../components/HowWeHelp';
import MostSearchedSection from '../components/MostSearchedSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Función para manejar la búsqueda desde el SearchBar
  const handleSearch = (searchData) => {
    // Navegar a la landing de servicios con el estado de búsqueda
    navigate('/servicios', {
      state: {
        searchTerm: searchData.search || '',
        selectedCategory: searchData.category || '',
        selectedLocation: searchData.province || ''
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section con imagen de fondo */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-40"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') `
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Intercambia Servicios Sin Dinero
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white opacity-90 max-w-2xl mx-auto">
            Conecta con profesionales y ofrece tus servicios a cambio de lo que necesitas
          </p>
          <div className="max-w-3xl mx-auto mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        
        {/* Overlay para mejor contraste */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </section>

      {/* Slider de Categorías */}
      <CategoriesSlider />

      {/* Banner CTA - Componente separado */}
      <CTABanner />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Sección Últimos Servicios con Slider */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                Últimos Servicios
              </h2>
            </div>

            {/* Slider de servicios en lugar del grid */}
            <ServicesSlider services={mockServices} />
          </div>
        </div>
      </div>

      {/* Sección Cómo podemos ayudarte */}
      <HowWeHelp />

      {/* Nueva Sección: Lo más buscado de Trueque */}
      <MostSearchedSection />
    </div>
  );
};

export default Home;