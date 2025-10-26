// src/pages/RegisterPage.jsx
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';

// Componente InputField movido fuera del componente principal
const InputField = ({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  icon: Icon,
  optional = false,
  showToggle = false,
  onToggleVisibility,
  isVisible
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
      {optional && <span className="text-gray-400 text-xs ml-1">(opcional)</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
          ${error 
            ? 'border-red-300 bg-red-50 focus:ring-red-500' 
            : 'border-gray-300 focus:border-transparent'
          }
        `}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e) => {
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
  }, [errors]);

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    // Validar teléfono (opcional pero si se ingresa debe tener formato válido)
    if (formData.phone && !/^[+]?[\d\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'El formato del teléfono no es válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simular registro (aquí iría la llamada a tu API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Datos de registro:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'No proporcionado',
        password: '***' // No mostrar la contraseña real en logs
      });

      // Redirigir al login después del registro exitoso
      navigate('/perfil', { 
        state: { 
          message: '¡Registro exitoso! Por favor inicia sesión.',
          email: formData.email
        }
      });
      
    } catch (error) {
      setErrors({ submit: 'Error al registrar usuario. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-blue-600 hover:text-blue-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
          </button>
        </div>
        
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Únete a nuestra comunidad de trueques
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6 text-gray-600" onSubmit={handleSubmit}>
            {/* Nombre */}
            <InputField
              label="Nombre completo"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            //   placeholder="Tu nombre completo"
              icon={User}
            />

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            //   placeholder="tu@email.com"
              icon={Mail}
            />

            {/* Teléfono (opcional) */}
            <InputField
              label="Teléfono"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            //   placeholder="+34 612 345 678"
              icon={Phone}
              optional={true}
            />

            {/* Contraseña */}
            <InputField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            //   placeholder="Mínimo 6 caracteres"
              icon={Lock}
              showToggle={true}
              onToggleVisibility={() => setShowPassword(!showPassword)}
              isVisible={showPassword}
            />

            {/* Confirmar Contraseña */}
            <InputField
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            //   placeholder="Repite tu contraseña"
              icon={Lock}
              showToggle={true}
              onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              isVisible={showConfirmPassword}
            />

            {/* Error de submit */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{errors.submit}</div>
              </div>
            )}

            {/* Términos y condiciones */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Acepto los{' '}
                <Link to="/terminos" className="text-blue-600 hover:text-blue-500">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link to="/privacidad" className="text-blue-600 hover:text-blue-500">
                  política de privacidad
                </Link>
              </label>
            </div>

            {/* Botón de registro */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
                  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-colors duration-200
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </div>

            {/* Enlace a login */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Inicia sesión aquí
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;