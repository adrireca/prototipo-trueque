// src/components/CategoriesSlider.jsx
import React, { useRef } from 'react';
import { 
  Scale, 
  BookOpen, 
  Palette, 
  Wrench, 
  Heart, 
  Car, 
  Sparkles, 
  Utensils, 
  Camera, 
  Dumbbell, 
  Code, 
  Megaphone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';

const CategoriesSlider = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Mapeo de iconos para las categorías del mockData
  const categoryConfig = {
    "Legal": { icon: Scale, color: "purple" },
    "Educación": { icon: BookOpen, color: "purple" },
    "Diseño": { icon: Palette, color: "purple" },
    "Reparaciones": { icon: Wrench, color: "purple" },
    "Salud": { icon: Heart, color: "purple" },
    "Transporte": { icon: Car, color: "purple" },
    "Limpieza": { icon: Sparkles, color: "purple" },
    "Cocina": { icon: Utensils, color: "purple" },
    "Fotografía": { icon: Camera, color: "purple" },
    "Deporte": { icon: Dumbbell, color: "purple" },
    "Tecnología": { icon: Code, color: "purple" },
    "Marketing": { icon: Megaphone, color: "purple" },
    "Otros": { icon: Megaphone, color: "purple" } // Icono por defecto para "Otros"
  };

  // Función para manejar el clic en una categoría
  const handleCategoryClick = (category) => {
    // Navegar a ServicesLanding con el parámetro de categoría
    navigate('/servicios', { 
      state: { 
        selectedCategory: category
      } 
    });
  };

  // Función para desplazar hacia la izquierda
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  // Función para desplazar hacia la derecha
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  // Colores para Tailwind
  const colorClasses = {
    purple: 'text-purple-600',
    // green: 'bg-green-100 text-green-600 hover:bg-green-200',
    // purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    // orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
    // red: 'bg-red-100 text-red-600 hover:bg-red-200',
    // indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
    // teal: 'bg-teal-100 text-teal-600 hover:bg-teal-200',
    // amber: 'bg-amber-100 text-amber-600 hover:bg-amber-200',
    // pink: 'bg-pink-100 text-pink-600 hover:bg-pink-200',
    // lime: 'bg-lime-100 text-lime-600 hover:bg-lime-200',
    // cyan: 'bg-cyan-100 text-cyan-600 hover:bg-cyan-200',
    // violet: 'bg-violet-100 text-violet-600 hover:bg-violet-200'
  };

  return (
    <section className="py-8 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Slider Container */}
        <div className="relative">
          {/* Botón flecha izquierda - Siempre visible */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-1 
                       bg-purple-600 border border-purple-600 rounded-full p-2 
                       shadow-md hover:shadow-lg transition-all duration-200
                       hover:bg-purple-500 -ml-4"
            aria-label="Desplazar hacia la izquierda"
          >
            <ChevronLeft className="w-5 h-5 text-white-600" />
          </button>

          {/* Botón flecha derecha - Siempre visible */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-1 
                       bg-purple-600 border border-purple-600 rounded-full p-2 
                       shadow-md hover:shadow-lg transition-all duration-200
                       hover:bg-purple-500 -mr-4"
            aria-label="Desplazar hacia la derecha"
          >
            <ChevronRight className="w-5 h-5 text-white-600" />
          </button>

          {/* Slider */}
          <div 
            ref={sliderRef}
            className="flex space-x-4 overflow-x-hidden py-4 px-4 scrollbar-hide"
          >
            {categories.map((category) => {
              const config = categoryConfig[category] || { icon: Megaphone, color: "purple" };
              const IconComponent = config.icon;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`
                    flex flex-col items-center justify-center 
                    p-4 rounded-xl transition-all duration-300 
                    min-w-[100px] flex-shrink-0
                    ${colorClasses[config.color]}
                    hover:scale-105 hover:shadow-md
                    border border-transparent hover:border-purple-300
                    cursor-pointer
                  `}
                >
                  <IconComponent className="w-9 h-9 mb-2" />
                  <span className="text-sx font-semibold text-center leading-tight">
                    {category}
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