// src/pages/Favorites.jsx
import React, { useState } from 'react';
import { ArrowLeft, Heart, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

// Datos mock de favoritos (actualizados con imágenes)
const mockFavorites = [
  {
    id: 1,
    title: "Abogado laboralista",
    description: "Ofrezco asesoría legal completa y necesito servicios de fontanería para reformar mi baño. Especializado en derecho laboral y contratos.",
    category: "Legal",
    subcategory: "Asesoría Legal",
    user: {
      name: "Carlos Martínez",
      rating: 4.8,
      reviews: 24
    },
    likes: 12,
    location: "Madrid",
    timestamp: "2024-01-15T10:30:00",
    contact: "carlos@abogados.com",
    phone: "+34 612 345 678",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Diseñador gráfico freelance",
    description: "Diseño logos, branding y material digital. Necesito servicios de jardinería para mi terraza.",
    category: "Diseño",
    subcategory: "Gràfico",
    user: {
      name: "David García",
      rating: 4.7,
      reviews: 18
    },
    likes: 15,
    location: "Valencia",
    timestamp: "2024-01-13T09:15:00",
    contact: "david.design@email.com",
    phone: "+34 634 567 890",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Clases de cocina italiana",
    description: "Chef profesional ofrece clases de cocina italiana auténtica. Busco servicios de diseño web o marketing digital.",
    category: "Cocina",
    subcategory: "Clases",
    user: {
      name: "María Rodríguez",
      rating: 4.9,
      reviews: 37
    },
    likes: 23,
    location: "Barcelona",
    timestamp: "2024-01-10T13:30:00",
    contact: "maria.cocina@email.com",
    phone: "+34 645 678 901",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  }
];

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(mockFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filtrar favoritos
  const filteredFavorites = favorites.filter(fav => {
    const matchesSearch = fav.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fav.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || fav.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Obtener categorías únicas
  const categories = [...new Set(favorites.map(fav => fav.category))];

  const removeFromFavorites = (serviceId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => prev.filter(fav => fav.id !== serviceId));
  };

  const clearAllFavorites = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los guardados?')) {
      setFavorites([]);
    }
  };

  // En Favorites.jsx - usa el ServiceCard sin el corazón
  const FavoriteServiceCard = ({ service }) => (
    <div className="relative group">
      {/* Botón de eliminar favorito */}
      <button
        onClick={(e) => removeFromFavorites(service.id, e)}
        className="absolute top-3 right-3 z-20 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-all duration-200 group-hover:opacity-100"
        title="Eliminar de favoritos"
      >
        <Trash2 className="text-red-600 w-4 h-4" />
      </button>

      {/* ServiceCard reutilizado SIN corazón */}
      <ServiceCard service={service} showLikeButton={false} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <div className="flex items-center space-x-3">
              {/* <Heart className="w-8 h-8 text-red-500" fill="currentColor" /> */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Mis Guardados</h1>
                {/* <p className="text-gray-600">
                  {favorites.length} servicio{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}
                </p> */}
              </div>
            </div>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar Todos</span>
            </button>
          )}
        </div>

        {favorites.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar de Filtros */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
                {/* <h3 className="text-lg font-semibold mb-4">Filtrar Guardados</h3> */}

                {/* Barra de búsqueda */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar en guardados
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar servicios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-800 bg-white hover:bg-gray-50 transition-colors rounded-lg"
                    />
                  </div>
                </div>

                {/* Filtro por categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400 text-sm"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Estadísticas */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Tus guardados</h4>
                  <p className="text-sm text-blue-700">
                    {filteredFavorites.length} de {favorites.length} servicios
                  </p>
                  {selectedCategory && (
                    <p className="text-sm text-blue-600 mt-1">
                      Filtrado por: {selectedCategory}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Grid de Favoritos */}
            <div className="lg:w-3/4">
              {filteredFavorites.length > 0 ? (
                <>
                  {/* Resultados */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Servicios Guardados ({filteredFavorites.length})
                    </h2>
                    {searchTerm && (
                      <p className="text-gray-600">
                        Resultados para: "{searchTerm}"
                      </p>
                    )}
                  </div>

                  {/* Grid de servicios usando ServiceCard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {filteredFavorites.map(service => (
                      <FavoriteServiceCard key={service.id} service={service} />
                    ))}
                  </div>
                </>
              ) : (
                /* No hay resultados */
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No se encontraron guardados
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || selectedCategory
                      ? "Prueba a modificar los filtros de búsqueda"
                      : "No tienes servicios que coincidan con los filtros"
                    }
                  </p>
                  {(searchTerm || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Limpiar Filtros
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Aún no tienes guardados
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Guarda servicios que te interesen haciendo clic en el corazón para tenerlos siempre a mano.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explorar Servicios
              </button>
              <button
                onClick={() => navigate('/publicar')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Publicar Servicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;