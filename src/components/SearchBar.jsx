// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { provinces, categories } from '../data/mockData';

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showProvinceDialog, setShowProvinceDialog] = useState(false);

  // Refs para los dialogs
  const categoryDialogRef = useRef(null);
  const provinceDialogRef = useRef(null);

  // Effect para cerrar category dialog al hacer click fuera
  useEffect(() => {
    const handleClickOutsideCategory = (event) => {
      if (categoryDialogRef.current && !categoryDialogRef.current.contains(event.target)) {
        setShowCategoryDialog(false);
      }
    };

    if (showCategoryDialog) {
      document.addEventListener('mousedown', handleClickOutsideCategory);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCategory);
    };
  }, [showCategoryDialog]);

  // Effect para cerrar province dialog al hacer click fuera
  useEffect(() => {
    const handleClickOutsideProvince = (event) => {
      if (provinceDialogRef.current && !provinceDialogRef.current.contains(event.target)) {
        setShowProvinceDialog(false);
      }
    };

    if (showProvinceDialog) {
      document.addEventListener('mousedown', handleClickOutsideProvince);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideProvince);
    };
  }, [showProvinceDialog]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const filters = {
        search: searchTerm.trim(),
        category: selectedCategory,
        province: selectedProvince
      };

      // Si todos los filtros están vacíos, redirigir a /servicios
      if (!filters.search && !filters.category && !filters.province) {
        navigate('/servicios');
        return;
      }

      // Si se proporciona onSearch, llamarlo con los filtros
      if (onSearch) {
        onSearch(filters);
      } else {
        // Comportamiento original: navegar a home con query params
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.province) queryParams.append('province', filters.province);

        const queryString = queryParams.toString();
        navigate(`/${queryString ? `?${queryString}` : ''}`);
      }
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDialog(false);
    // Si hay onSearch, actualizar la búsqueda inmediatamente
    // if (onSearch) {
    //   onSearch({
    //     search: searchTerm.trim(),
    //     category: category,
    //     province: selectedProvince
    //   });
    // }
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setShowProvinceDialog(false);
    // Si hay onSearch, actualizar la búsqueda inmediatamente
    // if (onSearch) {
    //   onSearch({
    //     search: searchTerm.trim(),
    //     category: selectedCategory,
    //     province: province
    //   });
    // }
  };

  // Resto del código del SearchBar se mantiene igual...
  const CategoryDialog = () => (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center p-4 z-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div
        ref={categoryDialogRef}
        className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden"
      >
        {/* Header del Dialog */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Categoría</h3>
          <button
            onClick={() => setShowCategoryDialog(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de categorías */}
        <div className="overflow-y-auto max-h-64">
          <div className="p-2">
            <button
              onClick={() => handleCategorySelect('')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${selectedCategory === ''
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              <div className="flex items-center justify-between">
                <span>Todas las categorías</span>
                {selectedCategory === '' && <Check className="w-5 h-5 text-blue-600" />}
              </div>
            </button>

            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${selectedCategory === category
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category}</span>
                  {selectedCategory === category && <Check className="w-5 h-5 text-blue-600" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ProvinceDialog = () => (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center p-4 z-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div
        ref={provinceDialogRef}
        className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden"
      >
        {/* Header del Dialog */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Provincia</h3>
          <button
            onClick={() => setShowProvinceDialog(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Buscador de provincias */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar provincia..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Lista de provincias */}
        <div className="overflow-y-auto max-h-64">
          <div className="p-2">
            <button
              onClick={() => handleProvinceSelect('')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${selectedProvince === ''
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'hover:bg-gray-100 text-gray-700'
                }`}
            >
              <div className="flex items-center justify-between">
                <span>Toda España</span>
                {selectedProvince === '' && <Check className="w-5 h-5 text-blue-600" />}
              </div>
            </button>

            {provinces.map(province => (
              <button
                key={province}
                onClick={() => handleProvinceSelect(province)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${selectedProvince === province
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span>{province}</span>
                  {selectedProvince === province && <Check className="w-5 h-5 text-blue-600" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 max-w-4xl mx-4">
      <div className="flex flex-col space-y-2">
        {/* Fila de inputs */}
        <div className="flex rounded-lg overflow-hidden">
          {/* Buscador - Estoy buscando... */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
              placeholder="Estoy buscando..."
              className="w-full pl-10 pr-4 py-4 border-r border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-800 bg-white hover:bg-gray-50 transition-colors"
            />
          </div>

          {/* Botón de Categorías */}
          <button
            onClick={() => setShowCategoryDialog(true)}
            className="flex items-center justify-between w-48 pl-3 pr-2 py-4 border-r border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <span className={selectedCategory ? "text-gray-800" : "text-gray-500"}>
              {selectedCategory || "Todas las categorías"}
            </span>
            <ChevronDown className="text-gray-400 w-4 h-4" />
          </button>

          {/* Botón de Provincias */}
          <button
            onClick={() => setShowProvinceDialog(true)}
            className="flex items-center justify-between w-48 pl-3 pr-2 py-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <span className={selectedProvince ? "text-gray-800" : "text-gray-500"}>
              {selectedProvince || "Toda España"}
            </span>
            <ChevronDown className="text-gray-400 w-4 h-4" />
          </button>

          {/* Botón de búsqueda */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors font-medium text-sm border-none flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Buscar</span>
          </button>
        </div>
      </div>

      {/* Dialogs Modales */}
      {showCategoryDialog && <CategoryDialog />}
      {showProvinceDialog && <ProvinceDialog />}
    </div>
  );
};

export default SearchBar;