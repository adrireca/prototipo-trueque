// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Componente InputField actualizado para ser consistente con RegisterPage
const InputField = ({
  label,
  type,
  name,
  register,
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
        type={type}
        placeholder={placeholder}
        className={`
          block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors
          ${error
            ? 'border-red-300 bg-red-50 focus:ring-red-500'
            : 'border-gray-300 focus:border-transparent'
          }
        `}
        {...register(name)}
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
      <p className="mt-1 text-sm text-red-600">{error.message}</p>
    )}
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin, isAuthenticated, errors: authErrors, clearErrors } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Obtener mensaje de éxito del registro si existe
  const successMessage = location.state?.message;
  const registeredEmail = location.state?.email;

  // console.log(authErrors.field);

  // Limpiar errores al montar el componente
  useEffect(() => {
    clearErrors();
  }, []);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: registeredEmail || '',
      password: ''
    },
    mode: 'onChange'
  });

  // Si hay un email del registro, prellenar el campo email
  useEffect(() => {
    if (registeredEmail) {
      setValue('email', registeredEmail);
    }
  }, [registeredEmail, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');
    clearErrors();

    try {
      const success = await signin(data);

      if (success && authErrors.length === 0) {
        navigate('/', { 
          replace: true,
          state: { 
            message: '¡Bienvenido de nuevo!'
          }
        });
      }
      // Si hay errores de autenticación, se mostrarán automáticamente
      
    } catch (error) {
      setSubmitError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
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

          <form className="space-y-6 text-gray-600" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <InputField
              label="Email"
              type="email"
              name="email"
              register={register}
              error={errors.email || (authErrors.field === 'email' ? { message: authErrors.message } : null)}
              // placeholder="tu@email.com"
              icon={Mail}
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'El formato del email no es válido'
                }
              })}
            />

            {/* Contraseña */}
            <InputField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              register={register}
              error={errors.password || (authErrors.field === 'password' ? { message: authErrors.message } : null)}
              // placeholder="Tu contraseña"
              icon={Lock}
              showToggle={true}
              onToggleVisibility={() => setShowPassword(!showPassword)}
              isVisible={showPassword}
              {...register('password', {
                required: 'La contraseña es obligatoria'
              })}
            />

            {/* Recordar contraseña y olvidé contraseña */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  to="/recuperar-contraseña" 
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            {/* Errores de autenticación del contexto */}
            {authErrors.length > 0 && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  {authErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Error de submit */}
            {submitError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{submitError}</div>
              </div>
            )}

            {/* Botón de login */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
                  bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
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
                  className="font-medium text-purple-600 hover:text-purple-500"
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