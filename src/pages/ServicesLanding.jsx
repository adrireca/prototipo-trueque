// src/pages/ServicesLanding.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { mockServices } from '../data/mockData';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';
import { CategoriesContext } from '../context/CategoriesContext';
import { ProvincesContext } from '../context/ProvincesContext';

const ServicesLanding = () => {
  const [services, setServices] = useState(mockServices);
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const location = useLocation();
  const { categories } = useContext(CategoriesContext);
  const { provinces } = useContext(ProvincesContext);

  // Efecto para detectar filtros desde el estado de navegación
  useEffect(() => {
    // console.log('Location state:', location.state);
    
    if (location.state) {
      const { 
        searchTerm: stateSearchTerm, 
        selectedCategory: stateCategory, 
        selectedProvince: stateProvince 
      } = location.state;
      
      let hasFilters = false;

      if (stateSearchTerm) {
        setSearchTerm(stateSearchTerm);
        hasFilters = true;
        console.log('Search term from state:', stateSearchTerm);
      }
      if (stateCategory) {
        setSelectedCategory(stateCategory);
        hasFilters = true;
        // console.log('Category from state:', stateCategory);
      }
      if (stateProvince) {
        setSelectedProvince(stateProvince);
        hasFilters = true;
        // console.log('Province from state:', stateProvince);
      }

      if (hasFilters) {
        setIsSearchApplied(true);
        // console.log('Search applied with filters');
      }

      // Limpiar el estado de navegación para evitar que se aplique múltiples veces
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Filtrar servicios cuando cambien los filtros aplicados
  useEffect(() => {
    // console.log('Filtrando servicios...');
    // console.log('SearchTerm:', searchTerm);
    // console.log('SelectedCategory:', selectedCategory);
    // console.log('SelectedProvince:', selectedProvince);
    // console.log('Categories disponibles:', categories.length);
    // console.log('Provinces disponibles:', provinces.length);

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

      // Filtrar por categoría (usando ID de categoría)
      if (selectedCategory) {
        // Buscar el nombre de la categoría para comparar con los servicios mock
        const category = categories.find(cat => cat._id === selectedCategory);
        // console.log('Categoría encontrada:', category);
        if (category) {
          filtered = filtered.filter(service => service.category === category.name);
        }
      }

      // Filtrar por provincia (usando ID de provincia)
      if (selectedProvince) {
        // Buscar el nombre de la provincia para comparar con los servicios mock
        const province = provinces.find(prov => prov._id === selectedProvince);
        // console.log('Provincia encontrada:', province);
        if (province) {
          filtered = filtered.filter(service => service.location === province.name);
        }
      }
    }

    // console.log('Servicios filtrados:', filtered.length);
    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, selectedProvince, services, isSearchApplied, categories, provinces]);

  // Función para manejar la búsqueda desde el SearchBar (cuando se usa dentro de ServicesLanding)
  const handleSearchFromBar = (searchData) => {
    // console.log('Búsqueda desde bar:', searchData);
    setSearchTerm(searchData.search || '');
    setSelectedCategory(searchData.category || '');
    setSelectedProvince(searchData.province || '');
    setIsSearchApplied(true);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedProvince('');
    setIsSearchApplied(false);
  };

  // Función para quitar un filtro individual
  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search':
        setSearchTerm('');
        break;
      case 'category':
        setSelectedCategory('');
        break;
      case 'province':
        setSelectedProvince('');
        break;
      default:
        break;
    }

    // Si después de quitar el filtro no hay ningún filtro activo, mostrar todos los servicios
    if (!searchTerm && !selectedCategory && !selectedProvince) {
      setIsSearchApplied(false);
    }
  };

  // Función para obtener el nombre de la categoría seleccionada
  const getCategoryName = (categoryId) => {
    if (!categoryId) return '';
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : '';
  };

  // Función para obtener el nombre de la provincia seleccionada
  const getProvinceName = (provinceId) => {
    if (!provinceId) return '';
    const province = provinces.find(prov => prov._id === provinceId);
    return province ? province.name : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-35">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Descubre Servicios para Intercambiar
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Encuentra profesionales y servicios en tu zona. Intercambia habilidades sin coste económico.
            </p>
          </div>

          {/* SearchBar dentro de ServicesLanding */}
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
              {isSearchApplied && (
                <p className="text-gray-600 mt-1">
                  {filteredServices.length} {filteredServices.length === 1 ? 'servicio encontrado' : 'servicios encontrados'}
                </p>
              )}
            </div>

            {/* Filtros activos - Solo mostrar cuando hay búsqueda aplicada */}
            {isSearchApplied && (
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Búsqueda: "{searchTerm}"
                    <button
                      onClick={() => removeFilter('search')}
                      className="ml-1 hover:text-purple-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Categoría: {getCategoryName(selectedCategory)}
                    <button
                      onClick={() => removeFilter('category')}
                      className="ml-1 hover:text-green-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedProvince && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Provincia: {getProvinceName(selectedProvince)}
                    <button
                      onClick={() => removeFilter('province')}
                      className="ml-1 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(searchTerm || selectedCategory || selectedProvince) && (
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
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
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