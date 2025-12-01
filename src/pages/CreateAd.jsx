// src/pages/CreateAd.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, AlertCircle, Save, X, MapPin } from 'lucide-react';
import { mockServices } from '../data/mockData';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoriesContext } from '../context/CategoriesContext';
import { AuthContext } from '../context/AuthContext';
import SidebarHelp from '../components/SidebarHelp';
import LocationMapModal from '../components/dialogs/LocationMapModal';

const CreateAd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const { categories, subcategories, loading } = useContext(CategoriesContext);
  const { user, isAuthenticated } = useContext(AuthContext);

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      category: '',
      subcategory: '',
      location: ''
    }
  });

  const selectedCategory = watch('category');
  const locationValue = watch('location');

  // Cargar datos del servicio si está en modo edición
  useEffect(() => {
    if (isEditing && id) {
      loadServiceData();
    }
  }, [isEditing, id]);

  const loadServiceData = () => {
    const serviceToEdit = mockServices.find(service => service.id === parseInt(id));

    if (serviceToEdit) {
      // Buscar la categoría por nombre para obtener el ID
      const categoryObj = categories.find(cat => cat.name === serviceToEdit.category);
      const categoryId = categoryObj ? categoryObj._id : '';

      // Resetear el formulario con los datos del servicio
      reset({
        title: serviceToEdit.title,
        description: serviceToEdit.description,
        category: categoryId,
        subcategory: serviceToEdit.subcategory || '',
        location: serviceToEdit.location || ''
      });

      // Cargar imágenes
      if (serviceToEdit.images) {
        setImages(serviceToEdit.images.map(img => ({
          id: Math.random().toString(36).substr(2, 9),
          preview: img
        })));
      }
    } else {
      alert('Servicio no encontrado');
      navigate('/perfil');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('Máximo 5 imágenes permitidas');
      return;
    }

    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleLocationSelect = (location) => {
    setValue('location', location, { shouldValidate: true });
  };

  // Obtener nombre de la categoría seleccionada
  const getSelectedCategoryName = () => {
    if (!selectedCategory) return '';
    const category = categories.find(cat => cat._id === selectedCategory);
    return category ? category.name : '';
  };

  // Obtener subcategorías para la categoría seleccionada
  const getSubcategoriesForCategory = () => {
    if (!selectedCategory) return [];

    const filteredSubcategories = subcategories.filter(sub => {
      let subCategoryId;

      if (sub.category && typeof sub.category === 'object' && sub.category.$oid) {
        subCategoryId = sub.category.$oid;
      } else if (typeof sub.category === 'string') {
        subCategoryId = sub.category;
      } else {
        return false;
      }

      return subCategoryId === selectedCategory;
    });

    return filteredSubcategories;
  };

  // Función alternativa: obtener subcategorías desde el array de la categoría
  const getSubcategoriesFromCategory = () => {
    if (!selectedCategory) return [];

    const category = categories.find(cat => cat._id === selectedCategory);
    if (!category || !category.subcategories) return [];

    const categorySubcategories = category.subcategories
      .map(subcatRef => {
        if (subcatRef.name) {
          return {
            _id: subcatRef._id || Math.random().toString(),
            name: subcatRef.name
          };
        }

        if (subcatRef.$oid) {
          const fullSubcategory = subcategories.find(sub => {
            let subId;
            if (sub._id && typeof sub._id === 'object' && sub._id.$oid) {
              subId = sub._id.$oid;
            } else {
              subId = sub._id;
            }
            return subId === subcatRef.$oid;
          });

          if (fullSubcategory) {
            return fullSubcategory;
          }
        }

        return null;
      })
      .filter(sub => sub !== null);

    return categorySubcategories;
  };

  // Función final para obtener subcategorías (usa ambos métodos)
  const getAvailableSubcategories = () => {
    if (!selectedCategory) return [];

    const fromCategory = getSubcategoriesFromCategory();
    if (fromCategory.length > 0) {
      return fromCategory;
    }

    const fromFilter = getSubcategoriesForCategory();
    return fromFilter;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const submitData = {
        ...data,
        category: getSelectedCategoryName(),
        images: images.map(img => img.preview),
        userId: user?._id || user?.id,
        userEmail: user?.email,
        contactPhone: user?.phone
      };

      if (isEditing) {
        console.log('Actualizando servicio:', id, submitData);
        alert('Servicio actualizado correctamente');
      } else {
        console.log('Creando nuevo servicio:', submitData);
        alert('Servicio publicado correctamente');
      }

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

  // Obtener subcategorías para la categoría seleccionada
  const availableSubcategories = getAvailableSubcategories();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 pt-40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando categorías...</p>
        </div>
      </div>
    );
  }

  // Verificar si el usuario está autenticado
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 pt-40 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Acceso requerido</h2>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para publicar un servicio</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-40">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Título del Servicio */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-black">Información del Servicio</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título del servicio *
                    </label>
                    <input
                      type="text"
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('title', {
                        required: 'El título es obligatorio',
                        minLength: {
                          value: 10,
                          message: 'El título debe tener al menos 10 caracteres'
                        }
                      })}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.title.message}</span>
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
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                          errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('category', {
                          required: 'Selecciona una categoría'
                        })}
                      >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.category.message}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subcategoría
                      </label>
                      <select
                        disabled={!selectedCategory || availableSubcategories.length === 0}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-600"
                        {...register('subcategory')}
                      >
                        <option value="">
                          {!selectedCategory
                            ? 'Selecciona una categoría primero'
                            : availableSubcategories.length === 0
                              ? `No hay subcategorías para ${getSelectedCategoryName()}`
                              : 'Selecciona subcategoría'
                          }
                        </option>
                        {availableSubcategories.map(subcat => (
                          <option key={subcat._id} value={subcat.name}>{subcat.name}</option>
                        ))}
                      </select>
                      {availableSubcategories.length === 0 && selectedCategory && (
                        <p className="mt-1 text-sm text-gray-500">
                          No hay subcategorías disponibles para {getSelectedCategoryName()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción detallada *
                    </label>
                    <textarea
                      rows={6}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      {...register('description', {
                        required: 'La descripción es obligatoria',
                        minLength: {
                          value: 50,
                          message: 'La descripción debe tener al menos 50 caracteres'
                        },
                        maxLength: {
                          value: 500,
                          message: 'La descripción no puede tener más de 500 caracteres'
                        }
                      })}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.description.message}</span>
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {watch('description')?.length || 0}/500 caracteres
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
                  {images.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">
                        {images.length} {images.length === 1 ? 'imagen' : 'imágenes'} {isEditing ? 'actual' : 'seleccionada'}{images.length === 1 ? '' : 's'}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map(image => (
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
                              <X className="w-4 h-4" />
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
                      <strong>Email de contacto:</strong> {user?.email || 'No disponible'}
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Los interesados se pondrán en contacto contigo a través de este email
                    </p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-700">
                      <strong>Teléfono de contacto:</strong> {user?.phone || 'No disponible'}
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Los interesados también podrán contactarte por teléfono
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación del servicio *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Haz clic para seleccionar la ubicación en el mapa..."
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 pr-10 cursor-pointer ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('location', {
                          required: 'La ubicación es obligatoria'
                        })}
                        onClick={() => setIsLocationModalOpen(true)}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => setIsLocationModalOpen(true)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <MapPin className="w-5 h-5" />
                      </button>
                    </div>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.location.message}</span>
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      Haz clic en el campo para abrir el mapa interactivo y seleccionar tu provincia
                    </p>
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
            <SidebarHelp isEditing={isEditing} />
          </div>
        </div>

        {/* Modal de selección de ubicación */}
        <LocationMapModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          onLocationSelect={handleLocationSelect}
        />
      </div>
    </div>
  );
};

export default CreateAd;