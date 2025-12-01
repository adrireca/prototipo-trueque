import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { 
  getProvincesRequest,
  getProvinceByIdRequest,
  getMunicipalitiesRequest,
  getMunicipalitiesByProvinceRequest
} from "../api/provinces";

export const ProvincesContext = createContext();

export const useProvinces = () => {
    const context = useContext(ProvincesContext);
    if (!context) {
        throw new Error("useProvinces must be used within a ProvincesProvider");
    }
    return context;
}

export const ProvincesProvider = ({ children }) => {
    const [provinces, setProvinces] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [currentProvince, setCurrentProvince] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    // Limpiar errores
    const clearErrors = useCallback(() => {
        setErrors([]);
    }, []);

    // Obtener todas las provincias
    const fetchProvinces = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getProvincesRequest();
            setProvinces(res.data);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar las provincias";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener provincia por ID
    const fetchProvinceById = useCallback(async (id) => {
        try {
            setLoading(true);
            const res = await getProvinceByIdRequest(id);
            setCurrentProvince(res.data);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar la provincia";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener todos los municipios
    const fetchMunicipalities = useCallback(async () => {
        try {
            setLoading(true);
            const res = await getMunicipalitiesRequest();
            setMunicipalities(res.data);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar los municipios";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener municipios por provincia
    const fetchMunicipalitiesByProvince = useCallback(async (provinceId) => {
        try {
            setLoading(true);
            const res = await getMunicipalitiesByProvinceRequest(provinceId);
            setErrors([]);
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error al cargar los municipios";
            setErrors([errorMessage]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener municipios de una provincia específica
    const getMunicipalitiesByProvinceId = useCallback((provinceId) => {
        return municipalities.filter(municipality => municipality.province === provinceId);
    }, [municipalities]);

    // Obtener provincia por slug
    const getProvinceBySlug = useCallback((slug) => {
        return provinces.find(province => province.slug === slug);
    }, [provinces]);

    // Obtener provincia por código
    const getProvinceByCode = useCallback((code) => {
        return provinces.find(province => province.code === code);
    }, [provinces]);

    // Cargar datos iniciales
    useEffect(() => {
        fetchProvinces();
        fetchMunicipalities();
    }, [fetchProvinces, fetchMunicipalities]);

    return (
        <ProvincesContext.Provider
            value={{
                // Estados
                provinces,
                municipalities,
                currentProvince,
                loading,
                errors,

                // Funciones
                fetchProvinces,
                fetchProvinceById,
                fetchMunicipalities,
                fetchMunicipalitiesByProvince,
                getMunicipalitiesByProvinceId,
                getProvinceBySlug,
                getProvinceByCode,
                clearErrors,
                setCurrentProvince
            }}
        >
            {children}
        </ProvincesContext.Provider>
    );
};