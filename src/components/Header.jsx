// src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { User, Heart, Plus, ChevronDown, LogOut, Settings, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado (simulado)
  const isAuthenticated = localStorage.getItem('authToken');

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

  const handleLogout = () => {
    // Limpiar datos de autenticación
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsDropdownOpen(false);
    
    // Redirigir al home
    navigate('/');
    
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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
            <span className="text-xl font-bold text-gray-800">Trueque</span>
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
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                title="Mi cuenta"
              >
                <User className="w-5 h-5" />
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Menú desplegable */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {isAuthenticated ? (
                    // Usuario autenticado
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">
                          {localStorage.getItem('userEmail') || 'Usuario'}
                        </p>
                        <p className="text-xs text-gray-500">Bienvenido</p>
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

                      {/* <Link
                        to="/"
                        onClick={closeDropdown}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span>Ayuda</span>
                      </Link> */}
                      
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