// src/pages/ServicesLanding.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mockServices } from '../data/mockData';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';

const ServicesLanding = () => {
  const [services, setServices] = useState(mockServices);
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const location = useLocation();

  // Efecto para detectar todos los filtros desde el estado de navegación
  useEffect(() => {
    if (location.state) {
      const { searchTerm, selectedCategory, selectedLocation } = location.state;
      
      let hasFilters = false;

      if (searchTerm) {
        setSearchTerm(searchTerm);
        hasFilters = true;
      }
      if (selectedCategory) {
        setSelectedCategory(selectedCategory);
        hasFilters = true;
      }
      if (selectedLocation) {
        setSelectedLocation(selectedLocation);
        hasFilters = true;
      }

      if (hasFilters) {
        setIsSearchApplied(true);
      }

      // Limpiar el estado de navegación para evitar que se aplique múltiples veces
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Filtrar servicios cuando cambien los filtros aplicados
  useEffect(() => {
    let filtered = services;

    // Solo aplicar filtros si se ha hecho una búsqueda
    if (isSearchApplied) {
      // Filtrar por término de búsqueda
      if (searchTerm) {
        filtered = filtered.filter(service =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filtrar por categoría
      if (selectedCategory) {
        filtered = filtered.filter(service => service.category === selectedCategory);
      }

      // Filtrar por ubicación
      if (selectedLocation) {
        filtered = filtered.filter(service => service.location === selectedLocation);
      }
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, selectedLocation, services, isSearchApplied]);

  // Función para manejar la búsqueda desde el SearchBar
  const handleSearchFromBar = (searchData) => {
    setSearchTerm(searchData.search || '');
    setSelectedCategory(searchData.category || '');
    setSelectedLocation(searchData.province || '');
    setIsSearchApplied(true); // Marcar que se aplicó la búsqueda
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setIsSearchApplied(false); // Resetear el estado de búsqueda aplicada
  };

  // Función para quitar un filtro individual
  const removeFilter = (filterType) => {
    let newSearchTerm = searchTerm;
    let newCategory = selectedCategory;
    let newLocation = selectedLocation;

    switch (filterType) {
      case 'search':
        newSearchTerm = '';
        break;
      case 'category':
        newCategory = '';
        break;
      case 'location':
        newLocation = '';
        break;
      default:
        break;
    }

    setSearchTerm(newSearchTerm);
    setSelectedCategory(newCategory);
    setSelectedLocation(newLocation);
    
    // Si después de quitar el filtro no hay ningún filtro activo, mostrar todos los servicios
    if (!newSearchTerm && !newCategory && !newLocation) {
      setIsSearchApplied(false);
    } else {
      // Si todavía hay algún filtro activo, mantener la búsqueda aplicada
      setIsSearchApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Descubre Servicios para Intercambiar
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Encuentra profesionales y servicios en tu zona. Intercambia habilidades sin coste económico.
            </p>
          </div>

          {/* Usar el SearchBar component */}
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearchFromBar} />
          </div>
        </div>
      </section>

      {/* Resultados de búsqueda */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header de resultados */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {isSearchApplied ? 'Resultados de Búsqueda' : 'Trueque Servicios'}
              </h2>
            </div>

            {/* Filtros activos - Solo mostrar cuando hay búsqueda aplicada */}
            {isSearchApplied && (
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Búsqueda: "{searchTerm}"
                    <button
                      onClick={() => removeFilter('search')}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {selectedCategory}
                    <button
                      onClick={() => removeFilter('category')}
                      className="ml-1 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedLocation && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {selectedLocation}
                    <button
                      onClick={() => removeFilter('location')}
                      className="ml-1 hover:text-purple-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(searchTerm || selectedCategory || selectedLocation) && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Limpiar todos
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Grid de servicios */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  showLikeButton={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {isSearchApplied ? 'No se encontraron servicios' : 'No hay servicios disponibles'}
              </h3>
              <p className="text-gray-500 mb-4">
                {isSearchApplied 
                  ? 'Prueba a ajustar tus filtros de búsqueda' 
                  : 'Vuelve pronto para descubrir nuevos servicios'
                }
              </p>
              {isSearchApplied && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Mostrar todos los servicios
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicesLanding;