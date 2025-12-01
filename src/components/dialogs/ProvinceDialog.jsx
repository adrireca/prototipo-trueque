// src/components/dialogs/ProvinceDialog.jsx
import React, { useState, forwardRef } from 'react';
import { X, Check, Search } from 'lucide-react';

const ProvinceDialog = forwardRef(({ 
  isOpen, 
  onClose, 
  provinces = [], 
  loading = false, 
  errors = [], 
  selectedProvince, 
  onProvinceSelect 
}, ref) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleProvinceSelect = (provinceId) => {
    // console.log('Provincia seleccionada:', provinceId);
    onProvinceSelect(provinceId);
    onClose();
  };

  // Filtrar provincias basado en el término de búsqueda
  const filteredProvinces = provinces.filter(province =>
    province.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log('Provincias disponibles:', provinces.length);
  // console.log('Provincias filtradas:', filteredProvinces.length);

  return (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center p-4 z-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div 
        ref={ref}
        className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden"
      >
        {/* Header del Dialog */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Provincia</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Buscador de provincias */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar provincia..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-500"
            />
          </div>
        </div>

        {/* Lista de provincias */}
        <div className="overflow-y-auto max-h-64">
          <div className="p-2">
            <button
              onClick={() => handleProvinceSelect('')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                selectedProvince === ''
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Toda España</span>
                {selectedProvince === '' && <Check className="w-5 h-5 text-purple-600" />}
              </div>
            </button>

            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              </div>
            ) : errors.length > 0 ? (
              <div className="text-center py-4 text-red-600">
                Error al cargar provincias
              </div>
            ) : filteredProvinces.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                {searchTerm ? 'No se encontraron provincias' : 'No hay provincias disponibles'}
              </div>
            ) : (
              filteredProvinces.map(province => (
                <button
                  key={province._id}
                  onClick={() => handleProvinceSelect(province._id)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                    selectedProvince === province._id
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{province.name}</span>
                    {selectedProvince === province._id && <Check className="w-5 h-5 text-purple-600" />}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProvinceDialog.displayName = 'ProvinceDialog';

export default ProvinceDialog;