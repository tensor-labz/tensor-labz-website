import { createContext, useState, ReactNode, FC, useContext } from "react";

// Define our types
export interface ServiceTab {
  title: string;
  slug?: string;
}

interface ServiceContextType {
  activeTab: ServiceTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ServiceTab>>;
}

interface ServiceProviderProps {
  children: ReactNode;
}

// Create context with default values
export const ServiceContext = createContext<ServiceContextType>({
  activeTab: { title: "All" },
  setActiveTab: () => {},
});

const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>({ title: "All" });

  return (
    <ServiceContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Custom hook to use the service context
export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};

export default ServiceProvider;