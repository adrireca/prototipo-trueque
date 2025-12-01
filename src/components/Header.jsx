// src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { User, Heart, Plus, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado (simulado)
  const { isAuthenticated, user, logout } = useAuth();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Llamar a la función de logout
      await logout();
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    // Recargar la página para actualizar el estado de autenticación
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-9 left-0 right-0 bg-white shadow-sm border-b z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo con imagen */}
          <Link to="/" className="flex items-center space-x-2">
            {/* Reemplaza la URL por la ruta de tu imagen */}
            <img 
              src="/logo-trueque-white.png"
              alt="Trueque Logo" 
              className="h-20 object-contain"
              onError={(e) => {
                // Fallback en caso de que la imagen no cargue
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback visual - se mostrará solo si la imagen no carga */}
            {/* <div 
              className="w-8 h-8 bg-purple-600 rounded-full hidden"
              style={{display: 'none'}}
            ></div>
            <span className="text-xl font-bold text-gray-800">Trueque</span> */}
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/publicar"
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Publicar</span>
            </Link>
            <Link
              to="/guardados"
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              title="Mis guardados"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Dropdown de usuario */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 p-2 rounded-lg hover:bg-gray-50 transition-colors relative"
                title="Mi cuenta"
              >
                <div className="relative">
                  <User className="w-5 h-5" />
                  {/* Puntito verde de conectado */}
                  {isAuthenticated && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Menú desplegable */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {isAuthenticated ? (
                    // Usuario autenticado
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-800">
                            {user.email || 'Usuario'}
                          </p>
                          {/* Indicador de estado conectado en el dropdown */}
                          <div className="flex items-center space-x-1">
                            {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
                            {/* <span className="text-xs text-green-600 font-medium">Conectado</span> */}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Bienvenido</p>
                      </div>

                      <Link
                        to="/perfil"
                        onClick={closeDropdown}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Mi Perfil</span>
                      </Link>

                      <Link
                        to="/guardados"
                        onClick={closeDropdown}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>Mis guardados</span>
                      </Link>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </>
                  ) : (
                    // Usuario no autenticado
                    <>
                      <Link
                        to="/login"
                        onClick={closeDropdown}
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Iniciar Sesión</span>
                      </Link>

                      <Link
                        to="/registro"
                        onClick={closeDropdown}
                        className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Crear Cuenta</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;