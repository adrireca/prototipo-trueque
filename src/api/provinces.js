import axios from './axios';

// Obtener todas las provincias
export const getProvincesRequest = () => axios.get('/provinces');

// Obtener provincia por ID
export const getProvinceByIdRequest = (id) => axios.get(`/provinces/${id}`);

// Obtener municipios por provincia
export const getMunicipalitiesByProvinceRequest = (provinceId) => 
  axios.get(`/provinces/${provinceId}/municipalities`);

// Obtener todos los municipios
export const getMunicipalitiesRequest = () => axios.get('/municipalities');

// Obtener municipio por ID
export const getMunicipalityByIdRequest = (id) => axios.get(`/municipalities/${id}`);

// Crear provincia (requiere autenticación)
export const createProvinceRequest = (provinceData) => 
  axios.post('/provinces', provinceData);

// Actualizar provincia (requiere autenticación)
export const updateProvinceRequest = (id, provinceData) => 
  axios.put(`/provinces/${id}`, provinceData);

// Eliminar provincia (requiere autenticación)
export const deleteProvinceRequest = (id) => 
  axios.delete(`/provinces/${id}`);

// Crear municipio (requiere autenticación)
export const createMunicipalityRequest = (municipalityData) => 
  axios.post('/municipalities', municipalityData);

// Actualizar municipio (requiere autenticación)
export const updateMunicipalityRequest = (id, municipalityData) => 
  axios.put(`/municipalities/${id}`, municipalityData);

// Eliminar municipio (requiere autenticación)
export const deleteMunicipalityRequest = (id) => 
  axios.delete(`/municipalities/${id}`);