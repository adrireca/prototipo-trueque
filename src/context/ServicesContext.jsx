import { createContext, useContext, useState, useEffect } from 'react';

const ServiceContext = createContext();

export const useServices = () => {
    const context = useContext(ServiceContext);

    if (!context) {
        throw new Error("useServices must be used within a ServiceProvider");
    }

    return context;
}

export function ServiceProvider({ children }) {
    const [services, setServices] = useState([]);

    return (
        <ServiceContext.Provider value={{
            services,
        }}>
            {children}
        </ServiceContext.Provider>
    );
}