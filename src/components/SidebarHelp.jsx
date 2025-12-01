// src/components/SidebarHelp.jsx
import React from 'react';

const SidebarHelp = ({ isEditing = false }) => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        {isEditing ? 'Consejos para editar' : 'Consejos para publicar'}
      </h3>
      <ul className="space-y-3 text-sm text-purple-700">
        <li className="flex items-start space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
          <span>Sé específico en lo que ofreces y lo que necesitas</span>
        </li>
        <li className="flex items-start space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
          <span>Incluye imágenes de calidad de tu trabajo</span>
        </li>
        <li className="flex items-start space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
          <span>Responde rápidamente a los interesados</span>
        </li>
        <li className="flex items-start space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
          <span>Verifica que la información de contacto sea correcta</span>
        </li>
        {isEditing && (
          <li className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
            <span>Actualiza regularmente tu servicio para mantenerlo relevante</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SidebarHelp;