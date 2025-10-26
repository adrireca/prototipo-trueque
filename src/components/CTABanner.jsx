// src/components/CTABanner.jsx
import React from 'react';
import { Plus, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTABanner = () => {
  const navigate = useNavigate();

  const handlePublishClick = () => {
    // Verificar si el usuario está autenticado (usando la misma lógica que el Header)
    const isAuthenticated = localStorage.getItem('authToken');
    
    if (isAuthenticated) {
      // Usuario autenticado: redirigir a publicar
      navigate('/publicar');
    } else {
      // Usuario no autenticado: redirigir a registro
      navigate('/registro');
    }
  };

  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-16"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(59, 130, 246, 0.9)), url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      <div className="max-w-6xl mx-auto px-4 relative z-1">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Contenido principal */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Publica tu Anuncio
              </h3>
            </div>
            
            <p className="text-xl text-white opacity-90 mb-6 max-w-2xl">
              ¿Tienes habilidades para ofrecer? Publica tu servicio y encuentra 
              profesionales dispuestos a hacer trueque. 
              <strong className="block mt-2">¡Es gratis y sin intermediarios!</strong>
            </p>

            {/* Beneficios */}
            {/* <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
              <div className="flex items-center space-x-2 text-white opacity-90">
                <Users className="w-5 h-5" />
                <span className="text-sm md:text-base">+1,000 profesionales activos</span>
              </div>
              <div className="flex items-center space-x-2 text-white opacity-90">
                <span className="text-lg">⚡</span>
                <span className="text-sm md:text-base">Publicación en 2 minutos</span>
              </div>
              <div className="flex items-center space-x-2 text-white opacity-90">
                <span className="text-lg">🔄</span>
                <span className="text-sm md:text-base">Trueque directo</span>
              </div>
            </div> */}
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <button 
              onClick={handlePublishClick}
              className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-2xl hover:scale-105 flex items-center space-x-3"
            >
              <span>Publicar Ahora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
    </section>
  );
};

export default CTABanner;