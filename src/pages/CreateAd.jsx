// src/pages/CreateAd.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, AlertCircle, Save } from 'lucide-react';
import { categories, subcategories, mockServices } from '../data/mockData';
import { useNavigate, useParams } from 'react-router-dom';

// Datos mock del usuario (deberías obtenerlos de tu contexto de autenticación)
const mockUserData = {
  id: 1,
  name: "Ana López",
  email: "ana.lopez@email.com",
  phone: "+34 612 345 678",
  location: "Barcelona, España"
};

const CreateAd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    location: mockUserData.location, // Precargar ubicación del usuario
    contactPhone: mockUserData.phone, // Precargar teléfono del usuario
    images: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos del servicio si está en modo edición
  useEffect(() => {
    if (isEditing && id) {
      loadServiceData();
    }
  }, [isEditing, id]);

  const loadServiceData = () => {
    // Buscar el servicio en los mock data
    const serviceToEdit = mockServices.find(service => service.id === parseInt(id));
    
    if (serviceToEdit) {
      setFormData({
        title: serviceToEdit.title,
        description: serviceToEdit.description,
        category: serviceToEdit.category,
        subcategory: serviceToEdit.subcategory || '',
        location: serviceToEdit.location || mockUserData.location,
        contactPhone: serviceToEdit.contactPhone || mockUserData.phone,
        images: serviceToEdit.images ? serviceToEdit.images.map(img => ({
          id: Math.random().toString(36).substr(2, 9),
          preview: img
        })) : []
      });
    } else {
      // Si no encuentra el servicio, redirigir al perfil
      alert('Servicio no encontrado');
      navigate('/perfil');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Reset subcategoría cuando cambia la categoría
    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        subcategory: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      setErrors(prev => ({
        ...prev,
        images: 'Máximo 5 imágenes permitidas'
      }));
      return;
    }
    
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (formData.title.length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length < 50) {
      newErrors.description = 'La descripción debe tener al menos 50 caracteres';
    }

    if (!formData.category) {
      newErrors.category = 'Selecciona una categoría';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La ubicación es obligatoria';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'El teléfono es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío a la API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (isEditing) {
        // Lógica para actualizar servicio existente
        console.log('Actualizando servicio:', id, formData);
        // Aquí iría la llamada real a la API para actualizar
        alert('Servicio actualizado correctamente');
      } else {
        // Lógica para crear nuevo servicio
        console.log('Creando nuevo servicio:', formData);
        // Aquí iría la llamada real a la API para crear
        alert('Servicio publicado correctamente');
      }
      
      // Redirigir al perfil después de guardar
      navigate('/perfil');
    } catch (error) {
      console.error('Error guardando servicio:', error);
      alert('Error al guardar el servicio. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPageTitle = () => {
    return isEditing ? 'Editar Servicio' : 'Publicar Nuevo Servicio';
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) {
      return isEditing ? 'Guardando...' : 'Publicando...';
    }
    return isEditing ? 'Guardar Cambios' : 'Publicar Servicio';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título del Servicio */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Información del Servicio</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título del servicio *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      // placeholder="Ej: Abogado laboralista - Busco servicios de fontanería"
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.title}</span>
                      </p>
                    )}
                  </div>

                  {/* Categoría y Subcategoría */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.category}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcategoría
                      </label>
                      <select
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        disabled={!formData.category}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-600"
                      >
                        <option value="">Selecciona subcategoría</option>
                        {formData.category && subcategories[formData.category]?.map(subcat => (
                          <option key={subcat} value={subcat}>{subcat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción detallada *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      // placeholder="Describe tu servicio, lo que ofreces y lo que buscas a cambio. Sé lo más específico posible..."
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.description}</span>
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.description.length}/500 caracteres
                    </p>
                  </div>
                </div>
              </div>

              {/* Imágenes */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Imágenes</h2>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Arrastra imágenes o haz clic para subir</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {isEditing ? 'Puedes agregar nuevas imágenes' : 'Máximo 5 imágenes. Formatos: JPG, PNG'}
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
                    >
                      {isEditing ? 'Agregar Imágenes' : 'Seleccionar Imágenes'}
                    </label>
                  </div>

                  {/* Preview de imágenes */}
                  {formData.images.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">
                        {formData.images.length} {formData.images.length === 1 ? 'imagen' : 'imágenes'} {isEditing ? 'actual' : 'seleccionada'}{formData.images.length === 1 ? '' : 's'}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map(image => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.preview}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <AlertCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-700">
                      <strong>Email de contacto:</strong> {mockUserData.email}
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Los interesados se pondrán en contacto contigo a través de este email
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+34 612 345 678"
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                          errors.contactPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.contactPhone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.contactPhone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ubicación *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Ciudad, provincia..."
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/perfil')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                  <span>{getSubmitButtonText()}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar de Ayuda */}
          <div className="lg:col-span-1">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">
                {isEditing ? 'Consejos para editar' : 'Consejos para publicar'}
              </h3>
              <ul className="space-y-3 text-sm text-purple-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                  <span>Sé específico en lo que ofreces y lo que necesitas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                  <span>Incluye imágenes de calidad de tu trabajo</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                  <span>Responde rápidamente a los interesados</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                  <span>Verifica que la información de contacto sea correcta</span>
                </li>
                {isEditing && (
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                    <span>Actualiza regularmente tu servicio para mantenerlo relevante</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAd;