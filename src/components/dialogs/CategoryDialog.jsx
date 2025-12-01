// src/components/dialogs/CategoryDialog.jsx
import React, { forwardRef } from 'react';
import { X, Check } from 'lucide-react';

const CategoryDialog = forwardRef(({ 
  isOpen, 
  onClose, 
  categories, 
  loading, 
  errors, 
  selectedCategory, 
  onCategorySelect 
}, ref) => {
  if (!isOpen) return null;

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center p-4 z-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div 
        ref={ref}
        className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden"
      >
        {/* Header del Dialog */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Seleccionar Categoría</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Lista de categorías */}
        <div className="overflow-y-auto max-h-64">
          <div className="p-2">
            <button
              onClick={() => handleCategorySelect('')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                selectedCategory === ''
                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Todas las categorías</span>
                {selectedCategory === '' && <Check className="w-5 h-5 text-purple-600" />}
              </div>
            </button>

            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              </div>
            ) : errors.length > 0 ? (
              <div className="text-center py-4 text-red-600">
                Error al cargar categorías
              </div>
            ) : (
              categories.map(category => (
                <button
                  key={category._id}
                  onClick={() => handleCategorySelect(category._id)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors ${
                    selectedCategory === category._id
                      ? 'bg-purple-100 text-purple-800 border border-purple-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    {selectedCategory === category._id && <Check className="w-5 h-5 text-purple-600" />}
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

CategoryDialog.displayName = 'CategoryDialog';

export default CategoryDialog;