import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { 
  getCategoriesRequest,
  getCategoryByIdRequest,
  getSubcategoriesRequest,
  getSubcategoriesByCategoryRequest
} from "../api/categories";

export const CategoriesContext = createContext();

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoriesProvider");
    }
    return context;
}

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    // Limpiar errores
    const clearErrors = useCallback(() => {
        setErrors([]);
    }, []);

    // Obtener todas las categorías
    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getCategoriesRequest();
            setCategories(res.data);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar las categorías";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener categoría por ID
    const fetchCategoryById = useCallback(async (id) => {
        try {
            setLoading(true);
            const res = await getCategoryByIdRequest(id);
            setCurrentCategory(res.data);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar la categoría";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener todas las subcategorías
    const fetchSubcategories = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getSubcategoriesRequest();
            setSubcategories(res.data);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar las subcategorías";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener subcategorías por categoría
    const fetchSubcategoriesByCategory = useCallback(async (categoryId) => {
        try {
            setLoading(true);
            const res = await getSubcategoriesByCategoryRequest(categoryId);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar las subcategorías";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener subcategorías de una categoría específica
    const getSubcategoriesByCategoryId = useCallback((categoryId) => {
        return subcategories.filter(sub => sub.category === categoryId);
    }, [subcategories]);

    // Obtener categoría por slug
    const getCategoryBySlug = useCallback((slug) => {
        return categories.find(cat => cat.slug === slug);
    }, [categories]);

    // Cargar datos iniciales
    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
    }, [fetchCategories, fetchSubcategories]);

    return (
        <CategoriesContext.Provider
            value={{
                // Estados
                categories,
                subcategories,
                currentCategory,
                loading,
                errors,

                // Funciones
                fetchCategories,
                fetchCategoryById,
                fetchSubcategories,
                fetchSubcategoriesByCategory,
                getSubcategoriesByCategoryId,
                getCategoryBySlug,
                clearErrors,
                setCurrentCategory
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};