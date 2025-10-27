// src/pages/ServiceDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Star,
  Calendar,
  Phone,
  Mail,
  User,
  CheckCircle,
  Eye,
  Clock,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Link,
  Flag
} from 'lucide-react';
import { getTimeAgo } from '../utils/timeUtils';
import ReportModal from '../components/ReportModal';
import ServiceCard from '../components/ServiceCard';

// Datos mock del servicio
const mockService = {
  id: 1,
  title: "Abogado laboralista especializado",
  description: `Soy abogado especializado en derecho laboral con más de 8 años de experiencia. Ofrezco servicios completos de asesoría legal incluyendo:

• Asesoramiento en contratos laborales
• Despidos y finiquitos
• Negociaciones colectivas
• Reclamaciones de horas extras
• Defensa en procedimientos sancionadores

Estoy buscando servicios de fontanería para reformar completamente el baño de mi casa. Necesito:
- Instalación de nuevo sanitario
- Cambio de tuberías
- Colocación de plato de ducha
- Instalación de mampara

Soy flexible en los horarios y puedo adaptarme a tu disponibilidad. Preferiblemente en fines de semana.`,
  category: "Legal",
  subcategory: "Asesoría Legal",
  user: {
    id: 1,
    name: "Carlos Martínez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 4.8,
    reviews: 24,
    verified: true,
    memberSince: "2023-05-15",
    responseTime: "1-2 horas",
    lastConnection: "Hace 30 minutos",
    location: "Madrid Centro",
    servicesCount: 3,
    positiveReviews: 95
  },
  images: [
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  ],
  location: "Madrid Centro, Madrid",
  timestamp: "2024-09-15T10:30:00",
  likes: 12,
  views: 156,
  contact: {
    phone: "+34 612 345 678",
    email: "carlos@abogados.com"
  },
  requirements: [
    "Experiencia demostrable en fontanería",
    "Disponibilidad fines de semana",
    "Presupuesto previo sin compromiso"
  ]
};

// Servicios similares - adaptados para el formato de ServiceCard
const mockSimilarServices = [
  {
    id: 2,
    title: "Asesoría fiscal y contable",
    description: "Asesor fiscal ofrece servicios contables a cambio de servicios de electricista.",
    category: "Legal",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    user: {
      name: "Laura Fernández",
      rating: 4.6,
      reviews: 18
    },
    location: "Madrid",
    likes: 8,
    timestamp: "2024-09-14T14:20:00"
  },
  {
    id: 3,
    title: "Abogado de familia",
    description: "Especialista en derecho de familia busca servicios de jardinería.",
    category: "Legal",
    image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    user: {
      name: "Miguel Ángel López",
      rating: 4.9,
      reviews: 32
    },
    location: "Madrid",
    likes: 15,
    timestamp: "2024-09-13T09:15:00"
  }
];

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(mockService.likes);

  const service = mockService;

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setReportReason('');
    setSelectedReason('');
  };

  // Función para guardar en favoritos
  const toggleFavorite = () => {
    if (isFavorite) {
      // Quitar de favoritos
      setIsFavorite(false);
      setCurrentLikes(prev => prev - 1);
      // Aquí iría la lógica para eliminar de favoritos en la base de datos
      console.log('Eliminado de favoritos:', service.id);
    } else {
      // Añadir a favoritos
      setIsFavorite(true);
      setCurrentLikes(prev => prev + 1);
      // Aquí iría la lógica para guardar en favoritos en la base de datos
      console.log('Añadido a favoritos:', service.id);
    }
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver</span>
              </button>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span>Legal</span>
                <span>•</span>
                <span>Asesoría Legal</span>
                <span>•</span>
                <span>Madrid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2">
            {/* Slider de imágenes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="relative">
                {/* Imagen principal */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
                  <img
                    src={service.images[activeImage]}
                    alt={service.title}
                    className="w-full h-80 object-cover"
                  />

                  {/* Contador de imágenes */}
                  {service.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {activeImage + 1} / {service.images.length}
                    </div>
                  )}

                  {/* Botones de navegación */}
                  {service.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>

                {/* Miniaturas */}
                {service.images.length > 1 && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2 overflow-hidden">
                      {service.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImage(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-all ${activeImage === index
                            ? 'border-purple-500 scale-105'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                          <img
                            src={image}
                            alt={`${service.title} ${index + 1}`}
                            className="w-full h-full object-cover rounded-sm"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información del servicio */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{getTimeAgo(service.timestamp)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{service.views} visualizaciones</span>
                    </div>
                  </div>
                </div>

                {/* Botón de favoritos existente - ahora es clickeable */}
                <button 
                  onClick={toggleFavorite}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
                    isFavorite
                      ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                      : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                  }`}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      isFavorite ? 'fill-current text-red-500' : ''
                    }`}
                  />
                  <span className="font-semibold">{currentLikes}</span>
                </button>
              </div>

              {/* Descripción */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Descripción</h2>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {service.description}
                </div>
              </div>

            </div>

            {/* Servicios similares */}
            {mockSimilarServices.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Otros servicios similares</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockSimilarServices.map(similarService => (
                    <ServiceCard 
                      key={similarService.id} 
                      service={similarService}
                      showLikeButton={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar de contacto */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Panel de contacto */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contactar con el anunciante</h3>

                <div className="space-y-3">
                  {/* Botón Mensaje */}
                  <a
                    href={`mailto:${service.contact.email}?subject=Interesado en trueque: ${service.title}&body=Hola ${service.user.name}, estoy interesado en tu servicio de trueque.`}
                    className="w-full flex items-center justify-center space-x-3 bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Mensaje</span>
                  </a>

                  {/* Botón Llamar */}
                  <a
                    href={`tel:${service.contact.phone}`}
                    className="w-full flex items-center justify-center space-x-3 bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Llamar</span>
                  </a>
                </div>
                
              </div>

              {/* Compartir anuncio */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Comparte este anuncio</h3>

                <div className="flex justify-center space-x-4">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=Mira este servicio de trueque: ${encodeURIComponent(service.title)} - ${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    title="Compartir por WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.176-1.24-6.165-3.495-8.411" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    title="Compartir en Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>

                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(service.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    title="Compartir en Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>

                  {/* Copiar enlace */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Enlace copiado al portapapeles');
                    }}
                    className="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                    title="Copiar enlace"
                  >
                    <Link className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sección "Sobre el anunciante" en el lateral */}
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/perfil')}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sobre el anunciante</h3>

                <div className="flex items-start space-x-3 mb-4">
                  <img
                    src={service.user.avatar}
                    alt={service.user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{service.user.name}</h4>
                      {service.user.verified && (
                        <ChevronRight className="w-6 h-6 text-purple-500" fill="currentColor" />
                      )}
                    </div>

                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="font-semibold text-gray-700">{service.user.rating}</span>
                      <span className="text-sm text-gray-500">({service.user.reviews})</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Botón Reportar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">¿Hay algo que debemos revisar?</h3>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 py-2 px-4 rounded-lg transition-colors font-large text-sx border border-red-200"
                >
                  <Flag className="w-4 h-4" />
                  <span>Informar sobre el anuncio</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal de Reportar como componente separado */}
      <ReportModal
        isOpen={showReportModal}
        onClose={handleCloseReportModal}
        reportReason={reportReason}
        setReportReason={setReportReason}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
        service={service}
      />
    </div>
  );
};

export default ServiceDetail;