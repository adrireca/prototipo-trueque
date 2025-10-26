// src/pages/Profile.jsx
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Edit, Save, X, Star, MapPin, Calendar, Mail, Phone, Plus, Trash2, Eye, Heart, Camera, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { mockServices } from '../data/mockData';
import { getTimeAgo } from '../utils/timeUtils';

// Datos mock del usuario
const mockUserData = {
  id: 1,
  name: "Ana López",
  email: "ana.lopez@email.com",
  phone: "+34 612 345 678",
  location: "Barcelona, España",
  joinDate: "2024-01-15",
  rating: 4.8,
  totalReviews: 24,
  bio: "Profesional del marketing digital con 5 años de experiencia. Me encanta colaborar y ayudar a otros emprendedores a crecer sus negocios.",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
};

// Filtrar servicios del usuario actual desde mockData
const getUserServices = () => {
  return mockServices.filter(service => 
    service.user.name === "Ana López" || 
    service.user.name === "Carlos Martínez" // Para tener más datos de ejemplo
  ).map(service => ({
    ...service,
    status: Math.random() > 0.3 ? 'active' : 'inactive', // Aleatorio para demo
    likes: Math.floor(Math.random() * 20) + 5, // Likes aleatorios
    views: Math.floor(Math.random() * 150) + 50, // Views aleatorios
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString() // Timestamps aleatorios de los últimos 30 días
  }));
};

// Reseñas recibidas (basadas en los servicios del usuario)
const getUserReviews = (userServices) => {
  const reviews = [
    {
      id: 1,
      user: {
        name: "Carlos Martínez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5,
      comment: "Excelente profesional! Las clases de inglés fueron muy productivas y a cambio pude reformar mi baño. 100% recomendable.",
      timestamp: "2024-09-10",
      service: "Clases de inglés avanzado"
    },
    {
      id: 2,
      user: {
        name: "María García",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
      },
      rating: 4,
      comment: "Muy buena experiencia de trueque. Ana es muy organizada y profesional en su trabajo.",
      timestamp: "2024-09-05",
      service: "Community Manager"
    },
    {
      id: 3,
      user: {
        name: "David García",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      },
      rating: 5,
      comment: "Increíble servicio de asesoría legal. Muy profesional y detallado en las explicaciones.",
      timestamp: "2024-08-28",
      service: "Abogado laboralista"
    }
  ];

  return reviews.filter(review => 
    userServices.some(service => service.title.includes(review.service.split(' ')[0]))
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [editedData, setEditedData] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState('services');
  const [userServices, setUserServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [email, setEmail] = useState(mockUserData.email);
  const [isLoading, setIsLoading] = useState(false);

  const securityModal = useRef(null);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const services = getUserServices();
    setUserServices(services);
    setReviews(getUserReviews(services));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (securityModal.current && !securityModal.current.contains(event.target)) {
        setShowSecurityModal(false);
      }
    };
    if (showSecurityModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  }, [showSecurityModal]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Guardar cambios
      setUserData(editedData);
    } else {
      // Entrar en modo edición
      setEditedData(userData);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendRecoveryEmail = async () => {
    setIsLoading(true);
    // Simular envío de email
    setTimeout(() => {
      setIsLoading(false);
      setShowSecurityModal(false);
      alert('¡Enlace de recuperación enviado! Revisa tu bandeja de entrada.');
    }, 2000);
  };

  const deleteService = (serviceId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      setUserServices(prev => prev.filter(service => service.id !== serviceId));
    }
  };

  const toggleServiceStatus = (serviceId) => {
    setUserServices(prev => prev.map(service =>
      service.id === serviceId
        ? { ...service, status: service.status === 'active' ? 'inactive' : 'active' }
        : service
    ));
  };

  const StatsCard = ({ icon: Icon, label, value, color = 'blue' }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );

  const ServiceCard = ({ service }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
    {/* Enlace en la imagen y título */}
    <Link to={`/servicio/${service.id}`} className="block">
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
          }}
        />
      </div>
    </Link>

    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          {/* Enlace en el título */}
          <Link to={`/servicio/${service.id}`}>
            <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
              {service.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`px-2 py-1 text-xs rounded-full ${service.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
              }`}>
              {service.status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
        <div className="flex space-x-2 ml-2">
          {/* Botón de Editar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editar-servicio/${service.id}`);
            }}
            className="p-1 text-blue-500 hover:bg-blue-50 rounded"
            title="Editar servicio"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          {/* Botón de Pausar/Activar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleServiceStatus(service.id);
            }}
            className={`p-1 rounded ${service.status === 'active'
              ? 'text-orange-500 hover:bg-orange-50'
              : 'text-green-500 hover:bg-green-50'
              }`}
            title={service.status === 'active' ? 'Pausar servicio' : 'Activar servicio'}
          >
            <Eye className="w-4 h-4" />
          </button>
          
          {/* Botón de Eliminar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteService(service.id);
            }}
            className="p-1 text-red-500 hover:bg-red-50 rounded"
            title="Eliminar servicio"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Enlace en la descripción */}
      <Link to={`/servicio/${service.id}`}>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 hover:text-gray-800 transition-colors">
          {service.description}
        </p>
      </Link>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{service.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{service.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{service.location}</span>
          </div>
        </div>
        <span>{getTimeAgo(service.timestamp)}</span>
      </div>
    </div>
  </div>
);

  const ReviewCard = ({ review }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start space-x-3 mb-3">
        <img
          src={review.user.avatar}
          alt={review.user.name}
          className="w-10 h-10 rounded-full"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
          }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-800">{review.user.name}</h4>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(review.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-2">{review.comment}</p>
      <p className="text-sm text-blue-600">Servicio: {review.service}</p>
    </div>
  );

  // Modal para recuperación por email
  const SecurityModal = () => (
    <div className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div
        ref={securityModal}
        className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Recuperar Contraseña</span>
            </h3>
            <button
              onClick={() => setShowSecurityModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700 mt-1">
                Te enviaremos un enlace seguro a tu email para restablecer la contraseña.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de recuperación
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                El enlace expirará en 1 hora por seguridad.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowSecurityModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendRecoveryEmail}
                disabled={isLoading || !email}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  'Enviar Enlace'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="container mx-auto px-4 max-w-6xl">
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
            <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
          </div>

          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={handleEditToggle}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Editar Perfil</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Información del usuario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              {/* Avatar y nombre */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={isEditing ? editedData.avatar : userData.avatar}
                    alt={isEditing ? editedData.name : userData.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                  />
                  {isEditing && (
                    <div className="absolute bottom-2 right-2">
                      <label htmlFor="avatar-upload" className="cursor-pointer">
                        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                          <Camera className="w-4 h-4" />
                        </div>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full text-xl font-bold text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 mb-2"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                )}

                <div className="flex items-center justify-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-500">{userData.rating}</span>
                  <span className="text-sm text-gray-500">({userData.totalReviews})</span>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{userData.email}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm"
                    />
                  ) : (
                    <span className="text-sm">{userData.phone}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none text-sm"
                    />
                  ) : (
                    <span className="text-sm">{userData.location}</span>
                  )}
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Miembro desde {new Date(userData.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Botón de Seguridad en el lateral */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSecurityModal(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  <span className="font-medium text-sm">Restablecer contraseña</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatsCard
                icon={Plus}
                label="Servicios Publicados"
                value={userServices.length}
                color="blue"
              />
              <StatsCard
                icon={Heart}
                label="Total Guardados"
                value={userServices.reduce((sum, service) => sum + service.likes, 0)}
                color="blue"
              />
              <StatsCard
                icon={Star}
                label="Valoraciones Recibidas"
                value={reviews.length}
                color="blue"
              />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Navegación de tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    { id: 'services', label: 'Mis Servicios', count: userServices.length },
                    { id: 'reviews', label: 'Valoraciones', count: reviews.length },
                    { id: 'favorites', label: 'Guardados', count: 0 }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      <span>{tab.label}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Contenido de los tabs */}
              <div className="p-6">
                {/* Tab: Mis Servicios */}
                {activeTab === 'services' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">Mis Servicios</h3>
                      <button
                        onClick={() => navigate('/publicar')}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Nuevo Servicio</span>
                      </button>
                    </div>

                    {userServices.length > 0 ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                          {userServices.map(service => (
                            <ServiceCard key={service.id} service={service} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-600 mb-2">
                          Aún no tienes servicios publicados
                        </h4>
                        <p className="text-gray-500 mb-4">
                          Publica tu primer servicio y comienza a hacer trueques
                        </p>
                        <button
                          onClick={() => navigate('/publicar')}
                          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Publicar Primer Servicio
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Valoraciones */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Valoraciones Recibidas</h3>
                    {reviews.length > 0 ? (
                      <div className="space-y-4">
                        {reviews.map(review => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-600 mb-2">
                          Aún no tienes valoraciones
                        </h4>
                        <p className="text-gray-500">
                          Las valoraciones aparecerán aquí cuando otros usuarios te evalúen
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Favoritos */}
                {activeTab === 'favorites' && (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">
                      Tus guardados
                    </h4>
                    <p className="text-gray-500 mb-4">
                      Los servicios que marques como guardados aparecerán aquí
                    </p>
                    <button
                      onClick={() => navigate('/servicios')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Explorar Servicios
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para recuperación por email */}
      {showSecurityModal && <SecurityModal />}
    </div>
  );
};

export default Profile;