import { createContext, useState, ReactNode, FC, useContext } from "react";

// Define our types
export interface ServiceTab {
  title: string;
  slug: string;
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
  activeTab: { title: "Web Development", slug: "web-dev" },
  setActiveTab: () => {},
});

const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>({
    title: "Web Development",
    slug: "web-dev"
  });

  return (
    <ServiceContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceProvider;

export const  useServiceContext= ()=>useContext(ServiceContext)