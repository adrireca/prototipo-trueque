// src/pages/LoginPage.jsx
import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';

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
  showToggle = false,
  onToggleVisibility,
  isVisible
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
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

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Obtener mensaje de éxito del registro si existe
  const successMessage = location.state?.message;
  const registeredEmail = location.state?.email;

  // Si hay un email del registro, prellenar el campo email
  React.useEffect(() => {
    if (registeredEmail) {
      setFormData(prev => ({
        ...prev,
        email: registeredEmail
      }));
    }
  }, [registeredEmail]);

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

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
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
      // Simular inicio de sesión (aquí iría la llamada a tu API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Datos de login:', {
        email: formData.email,
        password: '***' // No mostrar la contraseña real en logs
      });

      // Simular token de autenticación
      localStorage.setItem('authToken', 'simulated-token-' + Date.now());
      localStorage.setItem('userEmail', formData.email);

      // Redirigir al dashboard o página principal después del login exitoso
      navigate('/', { 
        replace: true,
        state: { 
          message: '¡Bienvenido de nuevo!'
        }
      });
      
    } catch (error) {
      setErrors({ submit: 'Credenciales incorrectas. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoType) => {
    const demoAccounts = {
      user: { email: 'usuario@demo.com', password: 'demouser123' },
      professional: { email: 'profesional@demo.com', password: 'demopro123' }
    };

    const demoAccount = demoAccounts[demoType];
    setFormData(demoAccount);
    
    // Auto-login después de un breve delay para que el usuario vea los datos
    setTimeout(() => {
      handleSubmit(new Event('submit'));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Accede a tu cuenta de trueques
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Mensaje de éxito del registro */}
          {successMessage && (
            <div className="mb-6 rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">{successMessage}</div>
            </div>
          )}

          <form className="space-y-6 text-gray-600" onSubmit={handleSubmit}>
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

            {/* Contraseña */}
            <InputField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            //   placeholder="Tu contraseña"
              icon={Lock}
              showToggle={true}
              onToggleVisibility={() => setShowPassword(!showPassword)}
              isVisible={showPassword}
            />

            {/* Recordar contraseña y olvidé contraseña */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  to="/recuperar-contraseña" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Error de submit */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{errors.submit}</div>
              </div>
            )}

            {/* Botón de login */}
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
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>

            {/* Enlace a registro */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link 
                  to="/registro" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Regístrate aquí
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;