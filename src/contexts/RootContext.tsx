import React,  { createContext, useContext } from "react";
import AppContextProvider from "./Api/AppContext";
import DevicesContextProvider from "./DeviceContext";
import data from "../data/data";
import { BrowserRouter } from "react-router-dom";
import ServiceProvider from "./ServiceContext";



type RootContextType = {
    Data?: any,
    googleSheet_URl?: string,

}
type RootContextProviderType = {
    children: React.ReactNode;
}
const RootContext = createContext<RootContextType>(null as any);
const sheetUrl="https://script.google.com/macros/s/AKfycbytPoq9QIY-9e844pm5Li3gZXEkxulVNyFJ_wLTo8yBtXCBYiJ0mCEjnG82AuJxqUwT_w/exec?sheetName="
export const RootContextProvider: React.FC<RootContextProviderType> = ({children}) => {
    return (
        <RootContext.Provider value={{ Data:data,googleSheet_URl:sheetUrl }}>
            <DevicesContextProvider>
                <BrowserRouter>
                <ServiceProvider>
                    <AppContextProvider>
                            {children}
                        </AppContextProvider>
                        </ServiceProvider>
                    </BrowserRouter>
                </DevicesContextProvider>
        </RootContext.Provider>
    );
};

export const useRootContext = () => useContext(RootContext);