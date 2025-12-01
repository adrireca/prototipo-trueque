import axios from './axios';

// Obtener todas las categorías
export const getCategoriesRequest = () => axios.get('/categories');

// Obtener categoría por ID
export const getCategoryByIdRequest = (id) => axios.get(`/categories/${id}`);

// Obtener subcategorías por categoría
export const getSubcategoriesByCategoryRequest = (categoryId) => 
  axios.get(`/categories/${categoryId}/subcategories`);

// Obtener todas las subcategorías
export const getSubcategoriesRequest = () => axios.get('/subcategories');

// Obtener subcategoría por ID
export const getSubcategoryByIdRequest = (id) => axios.get(`/subcategories/${id}`);