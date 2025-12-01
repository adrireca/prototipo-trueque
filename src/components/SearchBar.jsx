// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../context/CategoriesContext';
import { ProvincesContext } from '../context/ProvincesContext';
import CategoryDialog from './dialogs/CategoryDialog';
import ProvinceDialog from './dialogs/ProvinceDialog';

const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading, errors: categoriesErrors } = useContext(CategoriesContext);
  const { provinces, loading: provincesLoading, errors: provincesErrors } = useContext(ProvincesContext);
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

      // console.log('Filtros aplicados:', filters);

      // Si se proporciona onSearch, llamarlo con los filtros (para uso interno en Home)
      if (onSearch) {
        onSearch(filters);
      } else {
        // Navegar a ServicesLanding con los filtros en el estado
        navigate('/servicios', { 
          state: { 
            searchTerm: filters.search,
            selectedCategory: filters.category,
            selectedProvince: filters.province
          } 
        });
      }
    }
  };

  const handleCategorySelect = (categoryId) => {
    // console.log('Categoría seleccionada:', categoryId);
    setSelectedCategory(categoryId);
  };

  const handleProvinceSelect = (provinceId) => {
    // console.log('Provincia seleccionada:', provinceId);
    setSelectedProvince(provinceId);
  };

  // Función para obtener el nombre de la categoría seleccionada
  const getSelectedCategoryName = () => {
    if (!selectedCategory) return "Todas las categorías";
    
    const category = categories.find(cat => cat._id === selectedCategory);
    return category ? category.name : "Todas las categorías";
  };

  // Función para obtener el nombre de la provincia seleccionada
  const getSelectedProvinceName = () => {
    if (!selectedProvince) return "Toda España";
    
    const province = provinces.find(prov => prov._id === selectedProvince);
    return province ? province.name : "Toda España";
  };

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
              className="w-full pl-10 pr-4 py-4 border-r border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-800 bg-white hover:bg-gray-50 transition-colors"
            />
          </div>

          {/* Botón de Categorías */}
          <button
            onClick={() => setShowCategoryDialog(true)}
            className="flex items-center justify-between w-48 pl-3 pr-2 py-4 border-r border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <span className={selectedCategory ? "text-gray-800" : "text-gray-500"}>
              {getSelectedCategoryName()}
            </span>
            <ChevronDown className="text-gray-400 w-4 h-4" />
          </button>

          {/* Botón de Provincias */}
          <button
            onClick={() => setShowProvinceDialog(true)}
            className="flex items-center justify-between w-48 pl-3 pr-2 py-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <span className={selectedProvince ? "text-gray-800" : "text-gray-500"}>
              {getSelectedProvinceName()}
            </span>
            <ChevronDown className="text-gray-400 w-4 h-4" />
          </button>

          {/* Botón de búsqueda */}
          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 transition-colors font-medium text-sm border-none flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Buscar</span>
          </button>
        </div>
      </div>

      {/* Dialogs Modales */}
      <CategoryDialog
        ref={categoryDialogRef}
        isOpen={showCategoryDialog}
        onClose={() => setShowCategoryDialog(false)}
        categories={categories}
        loading={categoriesLoading}
        errors={categoriesErrors}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <ProvinceDialog
        ref={provinceDialogRef}
        isOpen={showProvinceDialog}
        onClose={() => setShowProvinceDialog(false)}
        provinces={provinces}
        loading={provincesLoading}
        errors={provincesErrors}
        selectedProvince={selectedProvince}
        onProvinceSelect={handleProvinceSelect}
      />
    </div>
  );
};

export default SearchBar;