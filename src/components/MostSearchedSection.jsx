// src/components/MostSearchedSection.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockServices, categories, provinces, subcategories } from '../data/mockData';

const MostSearchedSection = () => {
  const [activeTab, setActiveTab] = useState('provincias');
  const navigate = useNavigate();

  // Calcular las provincias más populares basadas en los servicios mock
  const topSearchedByProvince = useMemo(() => {
    const provinceCounts = mockServices.reduce((acc, service) => {
      acc[service.location] = (acc[service.location] || 0) + 1;
      return acc;
    }, {});

    return provinces
      .map(province => ({
        name: province,
        count: provinceCounts[province] || 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, []);

  // Calcular las categorías con sus subcategorías
  const categoriesWithSubcategories = useMemo(() => {
    return categories.map(category => ({
      name: category,
      subcategories: subcategories[category] || []
    })).filter(item => item.subcategories.length > 0)
      .slice(0, 8); // Mostrar máximo 8 categorías
  }, []);

  // Función para manejar el clic en una provincia
  const handleProvinceClick = (provinceName) => {
    navigate('/servicios', {
      state: {
        selectedLocation: provinceName
      }
    });
  };

  // Función para manejar el clic en una categoría
  const handleCategoryClick = (categoryName) => {
    navigate('/servicios', {
      state: {
        selectedCategory: categoryName
      }
    });
  };

  // Función para manejar el clic en una subcategoría
  const handleSubcategoryClick = (subcategoryName, categoryName) => {
    navigate('/servicios', {
      state: {
        selectedCategory: categoryName,
        searchTerm: subcategoryName
      }
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título alineado a la izquierda */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-2xl font-bold text-gray-800 mb-3">
            Lo más buscado en Trueque
          </h2>
        </div>

        {/* Tabs alineadas a la izquierda */}
        <div className="max-w-6xl">
          {/* Navegación de Tabs - alineada a la izquierda */}
          <div className="mb-10">
            <div className="">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('provincias')}
                  className={`pb-3 font-normal text-sm transition-all duration-300 border-b-2 ${
                    activeTab === 'provincias'
                      ? 'text-purple-600 border-purple-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  Por provincias
                </button>
                <button
                  onClick={() => setActiveTab('categorias')}
                  className={`pb-3 font-normal text-sm transition-all duration-300 border-b-2 ${
                    activeTab === 'categorias'
                      ? 'text-purple-600 border-purple-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  Por categorías
                </button>
              </div>
            </div>
          </div>

          {/* Contenido de las Tabs */}
          <div>
            {activeTab === 'provincias' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                {topSearchedByProvince.map((province) => (
                  <button
                    key={province.name}
                    onClick={() => handleProvinceClick(province.name)}
                    className="flex items-center py-2 px-1 rounded transition-colors text-left w-full group"
                  >
                    <span className="font-light text-gray-700 text-sm group-hover:text-purple-600 transition-colors">
                      {province.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'categorias' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {categoriesWithSubcategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    {/* Categoría en negrita como título - clickeable */}
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className="font-semibold text-gray-800 text-sm hover:text-purple-600 text-left w-full transition-colors"
                    >
                      {category.name}
                    </button>
                    {/* Subcategorías con la misma letra - clickeables */}
                    <div className="space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory}
                          onClick={() => handleSubcategoryClick(subcategory, category.name)}
                          className="flex items-center py-1 rounded transition-colors text-left w-full group"
                        >
                          <span className="font-light text-gray-700 text-sm group-hover:text-purple-600 transition-colors">
                            {subcategory}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostSearchedSection;