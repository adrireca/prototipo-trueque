// src/components/ServicesSlider.jsx
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ServiceCard from './ServiceCard';

const ServicesSlider = ({ services }) => {
  const sliderRef = useRef(null);

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

  return (
    <div className="relative">
      {/* Botón flecha izquierda */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-1 
                       bg-blue-600 border border-blue-600 rounded-full p-2 
                       shadow-md hover:shadow-lg transition-all duration-200
                       hover:bg-blue-500 -ml-4"
        aria-label="Desplazar hacia la izquierda"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Botón flecha derecha */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-1 
                       bg-blue-600 border border-blue-600 rounded-full p-2 
                       shadow-md hover:shadow-lg transition-all duration-200
                       hover:bg-blue-500 -mr-4"
        aria-label="Desplazar hacia la derecha"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slider de servicios */}
      <div 
        ref={sliderRef}
        className="flex space-x-6 overflow-x-hidden py-4 px-2 scrollbar-hide"
      >
        {services.map(service => (
          <div 
            key={service.id} 
            className="flex-shrink-0 w-80" // Ancho fijo para cada card en el slider
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlider;