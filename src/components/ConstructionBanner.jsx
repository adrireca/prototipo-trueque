// src/components/ConstructionBanner.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConstructionBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white-900 py-2 px-4 z-[60] shadow-md">
      <div className="container mx-auto flex items-center justify-center space-x-2">
        <AlertTriangle className="w-4 h-4" />
        <span className="text-sm font-medium">
          🚧 Sitio en construcción - Esta es una versión de prueba 🚧
        </span>
      </div>
    </div>
  );
};

export default ConstructionBanner;