// src/components/WhyUs.jsx
import React from 'react';
import { 
  Shield, 
  Users, 
  Lightbulb, 
  HeartHandshake 
} from 'lucide-react';

const WhyUs = () => {
  const reasons = [
    {
      number: 1,
      icon: Lightbulb,
      text: "Somos la primera web con un servicio innovador y nuevo donde no existe el dinero y solo se intercambian servicios."
    },
    {
      number: 2,
      icon: Shield,
      text: "No existe una venta de servicios si no un intercambio de los mismo así que estamos exentos de facturas e IVA."
    },
    {
      number: 3,
      icon: HeartHandshake,
      text: "Total transparencia y soluciones rápidas a necesidades propias del dia a dia."
    },
    {
      number: 4,
      icon: Users,
      text: "Encuentra la persona adecuada que pueda intercambiar sus servicios por los tuyos y soluciona tus problemas a la vez que ayudas a solucionar problemas de otros usuarios."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Por qué nosotros...
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre qué hace única nuestra plataforma de intercambio de servicios
          </p>
        </div>

        {/* Reasons list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.number}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 group"
              >
                <div className="flex items-start gap-4">
                  {/* Number and icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {/* <span className="absolute -top-2 -right-2 w-6 h-6 bg-purple-700 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {reason.number}
                      </span> */}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {reason.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section footer */}
        {/* <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <HeartHandshake className="w-5 h-5 text-purple-500" />
            <span className="text-gray-700 font-medium">
              Join our exchange community
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WhyUs;