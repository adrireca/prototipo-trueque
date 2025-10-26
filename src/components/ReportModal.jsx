// src/components/ReportModal.jsx
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const ReportModal = ({ 
  isOpen, 
  onClose, 
  reportReason, 
  setReportReason, 
  selectedReason, 
  setSelectedReason,
  service 
}) => {
  const modalRef = useRef(null);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset'; // Restaurar scroll
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedReason || (selectedReason === 'other' && !reportReason.trim())) {
      alert('Por favor, selecciona un motivo para denunciar el anuncio');
      return;
    }

    // Aquí iría la lógica para enviar el reporte
    console.log('Denuncia enviada:', {
      serviceId: service.id,
      reason: selectedReason,
      description: reportReason
    });

    alert('Gracias por tu denuncia. Revisaremos este anuncio pronto.');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">¿Cuál es el motivo de tu denuncia?</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="spam"
                checked={selectedReason === 'spam'}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setReportReason('Está repetido');
                }}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="text-gray-700">Está repetido</span>
            </label>

            <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="inappropriate"
                checked={selectedReason === 'inappropriate'}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setReportReason('Contenido inapropiado o ofensivo');
                }}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="text-gray-700">Contenido inapropiado</span>
            </label>

            <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="fake"
                checked={selectedReason === 'fake'}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setReportReason('Es una estafa');
                }}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="text-gray-700">Es una estafa</span>
            </label>

            <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="category"
                checked={selectedReason === 'category'}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setReportReason('La categoría es incorrecta');
                }}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="text-gray-700">La categoría es incorrecta</span>
            </label>

            <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="discriminatory"
                checked={selectedReason === 'discriminatory'}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setReportReason('Comentarios ofensivos o discriminatorios');
                }}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="text-gray-700">Comentarios ofensivos o discriminatorios</span>
            </label>

            <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="illegal"
                checked={selectedReason === 'illegal'}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setReportReason('Contenido ilegal');
                }}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="text-gray-700">Contenido ilegal</span>
            </label>

            <label className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="reportReason"
                value="other"
                checked={selectedReason === 'other'}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setReportReason('');
                }}
                className="text-red-500 focus:ring-red-500"
              />
              <span className="text-gray-700">Otro motivo</span>
            </label>
          </div>

          {selectedReason === 'other' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe el motivo de la denuncia
              </label>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Mensaje..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none text-gray-500"
              />
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-md"
            >
              Enviar denuncia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;