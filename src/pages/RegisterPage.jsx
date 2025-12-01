// src/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Componente InputField (se mantiene igual)
const InputField = ({
  label,
  type,
  name,
  register,
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

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { signup, isAuthenticated, errors: registerError, clearErrors } = useAuth();

  useEffect(() => {
    clearErrors();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/perfil');
    }
    // return clearErrors();
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false
    }
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      // Llamar a signup y esperar la respuesta
      const success = await signup(data);

      // Solo redirigir si el registro fue exitoso (sin errores de email duplicado)
      if (success && registerError.length === 0) {
        navigate('/perfil', {
          state: {
            message: '¡Registro exitoso! Por favor inicia sesión.',
            email: data.email
          }
        });
      }
      // Si hay errores (como email duplicado), no redirigir y mostrar los errores

    } catch (error) {
      setSubmitError('Error al registrar usuario. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Crear Cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Únete a nuestra comunidad de trueques
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6 text-gray-600" onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre */}
            <InputField
              label="Nombre completo"
              type="text"
              name="name"
              register={register}
              error={errors.name}
              // placeholder="Tu nombre completo"
              icon={User}
              {...register('name', {
                required: 'El nombre es obligatorio',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres'
                },
                pattern: {
                  value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                  message: 'El nombre solo puede contener letras y espacios'
                }
              })}
            />

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              name="email"
              register={register}
              error={errors.email || (registerError.length > 0 ? { message: registerError[0] } : null)}
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

            {/* Teléfono (opcional) */}
            <InputField
              label="Teléfono"
              type="tel"
              name="phone"
              register={register}
              error={errors.phone}
              // placeholder="612 345 678"
              icon={Phone}
              optional={true}
              prefix="+34"
              {...register('phone', {
                pattern: {
                  value: /^(\+34)?[\d\s\-()]{9,}$/,
                  message: 'El formato del teléfono no es válido'
                },
                setValueAs: (value) => {
                  // Si el usuario no ingresa el +34, lo agregamos automáticamente
                  if (value && !value.startsWith('+34')) {
                    return `+34${value.replace(/\s/g, '')}`;
                  }
                  return value;
                }
              })}
            />

            {/* Contraseña */}
            <InputField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              name="password"
              register={register}
              error={errors.password}
              // placeholder="Mínimo 6 caracteres"
              icon={Lock}
              showToggle={true}
              onToggleVisibility={() => setShowPassword(!showPassword)}
              isVisible={showPassword}
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />

            {/* Confirmar Contraseña */}
            <InputField
              label="Confirmar contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              // placeholder="Repite tu contraseña"
              icon={Lock}
              showToggle={true}
              onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              isVisible={showConfirmPassword}
              {...register('confirmPassword', {
                required: 'Confirma tu contraseña',
                validate: value =>
                  value === password || 'Las contraseñas no coinciden'
              })}
            />

            {/* Términos y condiciones */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                {...register('terms', {
                  required: 'Debes aceptar los términos y condiciones'
                })}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Acepto los{' '}
                <Link to="/terminos" className="text-purple-600 hover:text-purple-500">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link to="/privacidad" className="text-purple-600 hover:text-purple-500">
                  política de privacidad
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
            )}

            {/* Error de submit */}
            {submitError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{submitError}</div>
              </div>
            )}

            {/* Botón de registro */}
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
                  className="font-medium text-purple-600 hover:text-purple-500"
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