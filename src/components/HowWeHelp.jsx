// src/components/HowWeHelp.jsx
import React from 'react';
import { Search, Users, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowWeHelp = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Search,
      title: "Encuentra lo que Necesitas",
      description: "Busca entre miles de profesionales dispuestos a hacer trueque por tus servicios."
    },
    {
      icon: Users,
      title: "Conecta Directamente",
      description: "Contacta sin intermediarios con profesionales verificados en tu zona."
    },
    {
      icon: Shield,
      title: "Intercambia con Confianza",
      description: "Sistema de valoraciones y reseñas para garantizar transacciones seguras."
    },
    {
      icon: TrendingUp,
      title: "Maximiza tus Habilidades",
      description: "Aprovecha tus talentos para obtener servicios que necesitas sin gastar dinero."
    }
  ];

  // Verificar autenticación de la misma manera que en el Header
  const isAuthenticated = localStorage.getItem('authToken');

  const handleCTAClick = () => {
    if (isAuthenticated) {
      navigate('/perfil'); // Redirigir al perfil si está autenticado
    } else {
      navigate('/registro'); // Redirigir al registro si no está autenticado
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¿Cómo podemos ayudarte?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo nuestra plataforma facilita el intercambio de servicios 
            entre profesionales como tú
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                {/* Icon Circle */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                +1,000
              </div>
              <div className="text-gray-600 font-medium">
                Profesionales Activos
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                95%
              </div>
              <div className="text-gray-600 font-medium">
                Trueques Exitosos
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">
                Categorías de Servicios
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            {isAuthenticated 
              ? '¡Gestiona tu perfil y encuentra más trueques!' 
              : '¿Listo para empezar a intercambiar servicios?'
            }
          </p>
          <button 
            onClick={handleCTAClick}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {isAuthenticated ? 'Ver Mi Perfil' : 'Únete a la Comunidad'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;