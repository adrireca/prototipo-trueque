import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from 'js-cookie';
import { set } from "mongoose";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Usar useCallback para memoizar la función
    const clearErrors = useCallback(() => {
        setErrors([]);
    }, []);

    // Función de registro
    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
            return true;
        } catch (error) {
            setErrors(error.response.data);
            return false;
        }
    };

    // Función de inicio de sesión
    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
            return true;
        } catch (error) {
            setErrors(error.response.data);
            return false;
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
            
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Efecto para verificar la cookie al montar el componente
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                logout,
                loading,
                isAuthenticated,
                errors,
                clearErrors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};