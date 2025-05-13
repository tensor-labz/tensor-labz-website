import React,  { createContext, useContext } from "react";
import AppContextProvider from "./Api/AppContext";
import DevicesContextProvider from "./DeviceContext";


type RootContextType = {
    children: React.ReactNode;
}
const RootContext = createContext<RootContextType|null>(null);


export const RootContextProvider: React.FC<RootContextType> = ({ children }) => {
    return (
        <RootContext.Provider value={{ children }}>
            <DevicesContextProvider>
        <AppContextProvider>
                {children}
                </AppContextProvider>
                </DevicesContextProvider>
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);