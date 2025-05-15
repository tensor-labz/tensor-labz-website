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
const sheetUrl="https://script.google.com/macros/s/AKfycbwdBVXLOhb25deUgMuURv4Y7OE11x6OMgsHHWVlj21sz7BHrltuOzjpcl_db2kN9pGgYg/exec?sheetName="

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