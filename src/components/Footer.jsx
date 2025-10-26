// src/components/Footer.jsx
import React from 'react';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Shield,
  Users,
  Star
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <span className="text-xl font-bold">Trueque</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Conectamos profesionales para intercambiar servicios sin intermediarios. 
              Únete a nuestra comunidad de trueque y descubre una nueva forma de colaborar.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              {/* <Users className="w-5 h-5 mr-2 text-blue-400" /> */}
              Descubrir
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Explorar Servicios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Categorías Populares
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Profesionales Destacados
                </a>
              </li> */}
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Cómo Funciona
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              {/* <Shield className="w-5 h-5 mr-2 text-green-400" /> */}
              Empresa
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Prensa
                </a>
              </li> */}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              {/* <Star className="w-5 h-5 mr-2 text-yellow-400" /> */}
              ¿Necesitas ayuda?
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@truequeservicios.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Valencia, España</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="space-y-2">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors block">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors block">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors block">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>&copy; 2025 Trueque. Todos los derechos reservados.</p>
            </div>

            {/* Made with love */}
            {/* <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>para la comunidad</span>
            </div> */}

            {/* Trust badges */}
            {/* <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>🔒 Sitio seguro</span>
              <span>⭐ 4.8/5</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      {/* <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-white text-center md:text-left">
              <strong>¿Listo para empezar?</strong> Únete a miles de profesionales que ya hacen trueque.
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Crear Cuenta Gratis
            </button>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;