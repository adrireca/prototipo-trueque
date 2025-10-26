// src/components/ServiceCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Clock } from 'lucide-react';
import { getTimeAgo } from '../utils/timeUtils';

const ServiceCard = ({ service, showLikeButton = true }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Prevenir la propagación del evento para el botón de like
  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link 
      to={`/servicio/${service.id}`}
      className="block bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden hover:transform hover:-translate-y-1"
    >
      {/* Imagen del servicio */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Botón de like sobre la imagen - Solo si showLikeButton es true */}
        {showLikeButton && (
          <button
            onClick={handleLikeClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isLiked ? 'text-red-500 bg-white' : 'text-gray-400 bg-white hover:text-red-500'
            }`}
          >
            <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span>{service.user.rating}</span>
              <span>({service.user.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{service.location}</span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">{service.description}</p>
        
        {/* Footer con tiempo */}
        <div className="flex items-center justify-end pt-3 border-t border-gray-100">
          {/* Tiempo transcurrido */}
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{getTimeAgo(service.timestamp)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;