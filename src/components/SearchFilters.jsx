// src/components/SearchFilters.jsx
import React from 'react';
import { Filter } from 'lucide-react';
import { categories } from '../data/mockData';

const SearchFilters = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">Filtros</h3>
      </div>

      <div className="space-y-4">
        {/* Categorías */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación
          </label>
          <input
            type="text"
            placeholder="Ciudad o provincia..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Botones */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
            Aplicar filtros
          </button>
          <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;