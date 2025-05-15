import React,  { createContext, useContext } from "react";
import AppContextProvider from "./Api/AppContext";
import DevicesContextProvider from "./DeviceContext";
import data from "../data/data";



type RootContextType = {
    Data?: any,
    googleSheet_URl?: string,

}
type RootContextProviderType = {
    children: React.ReactNode;
}
const RootContext = createContext<RootContextType>(null as any);
const sheetUrl="https://script.google.com/macros/s/AKfycbzcKz9PWqkgTVHUhY8EM_-W8RI-UCGo1eCd5MxtFgh9U7ZugSTwpTtNUbQjZjuhyR_8vA/exec?sheetName="

export const RootContextProvider: React.FC<RootContextProviderType> = ({children}) => {
    return (
        <RootContext.Provider value={{ Data:data,googleSheet_URl:sheetUrl }}>
            <DevicesContextProvider>
        <AppContextProvider>
                {children}
                </AppContextProvider>
                </DevicesContextProvider>
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);