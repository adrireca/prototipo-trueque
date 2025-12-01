// src/components/CategoriesSlider.jsx
import React, { useRef, useContext } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Loader2,
  Scale,
  GraduationCap,
  Palette,
  Wrench,
  Heart,
  Truck,
  Sparkles,
  Utensils,
  Camera,
  Dumbbell,
  Cpu,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CategoriesContext } from '../context/CategoriesContext';

const CategoriesSlider = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const { 
    categories, 
    loading, 
    errors 
  } = useContext(CategoriesContext);

  // Mapeo de iconos para las categorías
  const iconComponents = {
    Scale,
    GraduationCap,
    Palette,
    Wrench,
    Heart,
    Truck,
    Sparkles,
    Utensils,
    Camera,
    Dumbbell,
    Cpu,
    TrendingUp,
    MoreHorizontal
  };

  // Mapeo de colores para las categorías
  const colorConfig = {
    "#6366F1": "purple",
    // "#10B981": "green",
    // "#EC4899": "pink",
    // "#F59E0B": "orange",
    // "#EF4444": "red",
    // "#06B6D4": "cyan",
    // "#8B5CF6": "violet",
    // "#3B82F6": "blue",
    // "#6B7280": "gray"
  };

  // Colores para Tailwind
  const colorClasses = {
    purple: 'text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200',
    green: 'text-green-600 bg-green-50 hover:bg-green-100 border-green-200',
    pink: 'text-pink-600 bg-pink-50 hover:bg-pink-100 border-pink-200',
    orange: 'text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-200',
    red: 'text-red-600 bg-red-50 hover:bg-red-100 border-red-200',
    cyan: 'text-cyan-600 bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
    violet: 'text-violet-600 bg-violet-50 hover:bg-violet-100 border-violet-200',
    blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200',
    gray: 'text-gray-600 bg-gray-50 hover:bg-gray-100 border-gray-200'
  };

  // Función para manejar el clic en una categoría
  const handleCategoryClick = (category) => {
    navigate('/servicios', { 
      state: { 
        selectedCategory: category._id
      } 
    });
  };

  // Funciones de scroll
  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  // Obtener componente de icono
  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || MoreHorizontal;
  };

  // Obtener clase de color
  const getColorClass = (colorHex) => {
    const colorName = colorConfig[colorHex] || 'gray';
    return colorClasses[colorName] || colorClasses.gray;
  };

  // Loading state
  if (loading && categories.length === 0) {
    return (
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
            <span className="ml-2 text-gray-600">Cargando categorías...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (errors.length > 0 && categories.length === 0) {
    return (
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <span className="text-red-600">Error al cargar categorías</span>
          </div>
        </div>
      </section>
    );
  }

  // No categories state
  if (!categories || categories.length === 0) {
    return (
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <span className="text-gray-600">No hay categorías disponibles</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Botones de navegación */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-1 
                       bg-purple-600 rounded-full p-2 shadow-md hover:shadow-lg 
                       transition-all duration-200 hover:bg-purple-500 -ml-4"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-1 
                       bg-purple-600 rounded-full p-2 shadow-md hover:shadow-lg 
                       transition-all duration-200 hover:bg-purple-500 -mr-4"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Slider */}
          <div 
            ref={sliderRef}
            className="flex space-x-4 overflow-x-hidden py-4 px-4 scrollbar-hide"
          >
            {categories.map((category) => {
              const IconComponent = getIconComponent(category.icon);
              const colorClass = getColorClass(category.color);
              
              return (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    flex flex-col items-center justify-center 
                    p-4 rounded-xl transition-all duration-300 
                    min-w-[100px] flex-shrink-0 border
                    ${colorClass}
                    hover:scale-105 hover:shadow-md
                    cursor-pointer
                  `}
                >
                  <IconComponent className="w-9 h-9 mb-2" />
                  <span className="text-xs font-semibold text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSlider;