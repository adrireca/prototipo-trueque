// src/components/LocationMapModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Navigation, Compass, Search } from 'lucide-react';

const LocationMapModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);
  const L = window.L;

  // Provincias de España con coordenadas precisas (capitales de provincia)
  const spanishProvinces = [
    { name: 'Álava', lat: 42.8500, lon: -2.6723, capital: 'Vitoria-Gasteiz' },
    { name: 'Albacete', lat: 38.9953, lon: -1.8551, capital: 'Albacete' },
    { name: 'Alicante', lat: 38.3453, lon: -0.4831, capital: 'Alicante' },
    { name: 'Almería', lat: 36.8402, lon: -2.4679, capital: 'Almería' },
    { name: 'Asturias', lat: 43.3614, lon: -5.8593, capital: 'Oviedo' },
    { name: 'Ávila', lat: 40.6564, lon: -4.7003, capital: 'Ávila' },
    { name: 'Badajoz', lat: 38.8794, lon: -6.9707, capital: 'Badajoz' },
    { name: 'Baleares', lat: 39.5696, lon: 2.6502, capital: 'Palma de Mallorca' },
    { name: 'Barcelona', lat: 41.3851, lon: 2.1734, capital: 'Barcelona' },
    { name: 'Burgos', lat: 42.3431, lon: -3.6965, capital: 'Burgos' },
    { name: 'Cáceres', lat: 39.4753, lon: -6.3724, capital: 'Cáceres' },
    { name: 'Cádiz', lat: 36.5298, lon: -6.2927, capital: 'Cádiz' },
    { name: 'Cantabria', lat: 43.4623, lon: -3.8099, capital: 'Santander' },
    { name: 'Castellón', lat: 39.9864, lon: -0.0513, capital: 'Castellón de la Plana' },
    { name: 'Ciudad Real', lat: 38.9861, lon: -3.9293, capital: 'Ciudad Real' },
    { name: 'Córdoba', lat: 37.8845, lon: -4.7796, capital: 'Córdoba' },
    { name: 'A Coruña', lat: 43.3623, lon: -8.4115, capital: 'A Coruña' },
    { name: 'Cuenca', lat: 40.0720, lon: -2.1340, capital: 'Cuenca' },
    { name: 'Girona', lat: 41.9818, lon: 2.8237, capital: 'Girona' },
    { name: 'Granada', lat: 37.1781, lon: -3.6008, capital: 'Granada' },
    { name: 'Guadalajara', lat: 40.6286, lon: -3.1618, capital: 'Guadalajara' },
    { name: 'Guipúzcoa', lat: 43.3223, lon: -1.9845, capital: 'San Sebastián' },
    { name: 'Huelva', lat: 37.2614, lon: -6.9447, capital: 'Huelva' },
    { name: 'Huesca', lat: 42.1401, lon: -0.4089, capital: 'Huesca' },
    { name: 'Jaén', lat: 37.7692, lon: -3.7903, capital: 'Jaén' },
    { name: 'León', lat: 42.5987, lon: -5.5671, capital: 'León' },
    { name: 'Lleida', lat: 41.6142, lon: 0.6258, capital: 'Lleida' },
    { name: 'Lugo', lat: 43.0097, lon: -7.5568, capital: 'Lugo' },
    { name: 'Madrid', lat: 40.4168, lon: -3.7038, capital: 'Madrid' },
    { name: 'Málaga', lat: 36.7194, lon: -4.4200, capital: 'Málaga' },
    { name: 'Murcia', lat: 37.9922, lon: -1.1307, capital: 'Murcia' },
    { name: 'Navarra', lat: 42.8125, lon: -1.6458, capital: 'Pamplona' },
    { name: 'Ourense', lat: 42.3358, lon: -7.8639, capital: 'Ourense' },
    { name: 'Palencia', lat: 42.0096, lon: -4.5290, capital: 'Palencia' },
    { name: 'Las Palmas', lat: 28.1235, lon: -15.4363, capital: 'Las Palmas de Gran Canaria' },
    { name: 'Pontevedra', lat: 42.4333, lon: -8.6500, capital: 'Pontevedra' },
    { name: 'La Rioja', lat: 42.4650, lon: -2.4456, capital: 'Logroño' },
    { name: 'Salamanca', lat: 40.9640, lon: -5.6630, capital: 'Salamanca' },
    { name: 'Segovia', lat: 40.9429, lon: -4.1088, capital: 'Segovia' },
    { name: 'Sevilla', lat: 37.3891, lon: -5.9845, capital: 'Sevilla' },
    { name: 'Soria', lat: 41.7640, lon: -2.4688, capital: 'Soria' },
    { name: 'Tarragona', lat: 41.1189, lon: 1.2445, capital: 'Tarragona' },
    { name: 'Santa Cruz de Tenerife', lat: 28.4682, lon: -16.2546, capital: 'Santa Cruz de Tenerife' },
    { name: 'Teruel', lat: 40.3457, lon: -1.1065, capital: 'Teruel' },
    { name: 'Toledo', lat: 39.8568, lon: -4.0245, capital: 'Toledo' },
    { name: 'Valencia', lat: 39.4699, lon: -0.3763, capital: 'Valencia' },
    { name: 'Valladolid', lat: 41.6523, lon: -4.7245, capital: 'Valladolid' },
    { name: 'Vizcaya', lat: 43.2630, lon: -2.9350, capital: 'Bilbao' },
    { name: 'Zamora', lat: 41.5035, lon: -5.7458, capital: 'Zamora' },
    { name: 'Zaragoza', lat: 41.6488, lon: -0.8891, capital: 'Zaragoza' }
  ];

  // Cargar Leaflet CSS y JS
  useEffect(() => {
    if (!isOpen) return;

    const loadLeaflet = () => {
      if (window.L) {
        initializeMap();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        setTimeout(initializeMap, 100);
      };
      document.head.appendChild(script);
    };

    loadLeaflet();

    return () => {
      if (map) {
        map.remove();
      }
      // Limpiar marcadores
      markers.forEach(marker => {
        if (marker && marker.remove) {
          marker.remove();
        }
      });
    };
  }, [isOpen]);

  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;

    const initialLocation = [40.4168, -3.7038]; // Madrid
    
    const newMap = window.L.map(mapRef.current).setView(initialLocation, 6);

    // Capa de OpenStreetMap con estilo más claro
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(newMap);

    // Crear marcadores para cada provincia
    const newMarkers = [];
    spanishProvinces.forEach(province => {
      // Icono personalizado para marcadores de provincia
      const provinceIcon = window.L.divIcon({
        className: 'province-marker',
        html: `
          <div style="
            background: ${selectedProvince === province.name ? '#DC2626' : '#3B82F6'};
            width: ${selectedProvince === province.name ? '20px' : '16px'};
            height: ${selectedProvince === province.name ? '20px' : '16px'};
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.2s ease;
          " title="${province.name}">
          </div>
        `,
        iconSize: selectedProvince === province.name ? [26, 26] : [22, 22],
        iconAnchor: selectedProvince === province.name ? [13, 13] : [11, 11],
      });

      const marker = window.L.marker([province.lat, province.lon], { 
        icon: provinceIcon
      }).addTo(newMap);

      // Tooltip con el nombre de la provincia
      marker.bindTooltip(province.name, {
        permanent: false,
        direction: 'top',
        offset: [0, -10],
        className: 'province-tooltip'
      });

      // Evento al hacer clic en el marcador
      marker.on('click', () => {
        handleProvinceSelect(province.name);
        
        // Animación: mover el mapa suavemente a la provincia seleccionada
        newMap.setView([province.lat, province.lon], 8, {
          animate: true,
          duration: 0.5
        });
      });

      newMarkers.push(marker);
    });

    // Evento al hacer clic en el mapa (para deseleccionar)
    newMap.on('click', (e) => {
      // Solo deseleccionar si no se hizo clic en un marcador
      if (!e.originalEvent.target.closest('.province-marker')) {
        setSelectedProvince('');
        
        // Restaurar vista general
        newMap.setView(initialLocation, 6, {
          animate: true,
          duration: 0.5
        });
      }
    });

    setMap(newMap);
    setMarkers(newMarkers);
  };

  // Actualizar marcadores cuando cambia la provincia seleccionada
  useEffect(() => {
    if (!map || markers.length === 0) return;

    markers.forEach((marker, index) => {
      const province = spanishProvinces[index];
      if (marker && province) {
        // Actualizar icono basado en selección
        const provinceIcon = window.L.divIcon({
          className: 'province-marker',
          html: `
            <div style="
              background: ${selectedProvince === province.name ? '#DC2626' : '#3B82F6'};
              width: ${selectedProvince === province.name ? '20px' : '16px'};
              height: ${selectedProvince === province.name ? '20px' : '16px'};
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              cursor: pointer;
              transition: all 0.2s ease;
            " title="${province.name}">
            </div>
          `,
          iconSize: selectedProvince === province.name ? [26, 26] : [22, 22],
          iconAnchor: selectedProvince === province.name ? [13, 13] : [11, 11],
        });

        marker.setIcon(provinceIcon);
      }
    });
  }, [selectedProvince, map, markers]);

  const handleProvinceSelect = (provinceName) => {
    setSelectedProvince(provinceName);
  };

  const searchLocation = (query) => {
    if (!query.trim() || !map) return;

    const foundProvince = spanishProvinces.find(province => 
      province.name.toLowerCase().includes(query.toLowerCase()) ||
      province.capital.toLowerCase().includes(query.toLowerCase())
    );

    if (foundProvince) {
      setSelectedProvince(foundProvince.name);
      map.setView([foundProvince.lat, foundProvince.lon], 8, {
        animate: true,
        duration: 0.5
      });
      setSearchQuery(foundProvince.name);
    }
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('La geolocalización no es soportada por este navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = [position.coords.latitude, position.coords.longitude];
        setUserLocation(userLoc);
        
        // Encontrar la provincia más cercana a la ubicación del usuario
        const closestProvince = findClosestProvince(userLoc[0], userLoc[1]);
        if (closestProvince) {
          setSelectedProvince(closestProvince.name);
          map.setView([closestProvince.lat, closestProvince.lon], 8, {
            animate: true,
            duration: 0.5
          });
        }
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert('No se pudo obtener tu ubicación. Asegúrate de haber permitido el acceso a la ubicación.');
      }
    );
  };

  const findClosestProvince = (lat, lng) => {
    let closestProvince = null;
    let minDistance = Infinity;

    spanishProvinces.forEach(province => {
      const distance = calculateDistance(lat, lng, province.lat, province.lon);
      if (distance < minDistance) {
        minDistance = distance;
        closestProvince = province;
      }
    });

    return closestProvince;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleConfirm = () => {
    if (selectedProvince) {
      onLocationSelect(selectedProvince);
      onClose();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Selecciona tu provincia</h2>
              <p className="text-sm text-gray-600 mt-1">
                Haz clic en cualquier punto azul del mapa para seleccionar la provincia
                {selectedProvince && ` - Provincia seleccionada: ${selectedProvince}`}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col h-[calc(90vh-140px)]">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar provincia por nombre o capital..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Buscar
                </button>
              </form>
              
              <button
                onClick={getUserLocation}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Mi Provincia</span>
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div ref={mapRef} className="w-full h-full" />
            
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 text-sm max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <Compass className="w-4 h-4 text-purple-600" />
                <span className="font-semibold">Instrucciones:</span>
              </div>
              <ul className="text-gray-700 space-y-1">
                <li>• <strong>Haz clic en los puntos azules</strong> para seleccionar provincia</li>
                <li>• Los puntos se vuelven <strong>rojos</strong> cuando están seleccionados</li>
                <li>• Usa la búsqueda para encontrar una provincia específica</li>
                <li>• Haz clic en el mapa para deseleccionar</li>
              </ul>
            </div>

            {selectedProvince && (
              <div className="absolute top-4 left-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold text-sm">Provincia seleccionada:</p>
                <p className="text-green-700 text-lg font-bold mt-1">{selectedProvince}</p>
                <p className="text-green-600 text-sm mt-1">
                  Capital: {spanishProvinces.find(p => p.name === selectedProvince)?.capital}
                </p>
              </div>
            )}

            {/* Leyenda de colores */}
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg p-3 text-sm">
              <div className="font-semibold mb-2">Leyenda:</div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                <span>Provincia disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-600 rounded-full border border-white"></div>
                <span>Provincia seleccionada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedProvince ? (
              <span>
                Provincia seleccionada: <strong className="text-green-700">{selectedProvince}</strong>
                {spanishProvinces.find(p => p.name === selectedProvince)?.capital && 
                  ` (Capital: ${spanishProvinces.find(p => p.name === selectedProvince)?.capital})`
                }
              </span>
            ) : (
              <span>Haz clic en un punto azul del mapa para seleccionar una provincia</span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedProvince}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Confirmar Provincia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMapModal;