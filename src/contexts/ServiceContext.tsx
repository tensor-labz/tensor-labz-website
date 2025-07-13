import {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

// Define the types
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

// Create the context with a fallback default
const ServiceContext = createContext<ServiceContextType | undefined>(undefined); // safer than non-null default

const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ServiceTab>({ title: "All",slug:"all" });
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab.slug) {
      navigate(`/services/${activeTab.slug}`);
    }
  }, [activeTab.slug, navigate]); // cleaner dependency

  return (
    <ServiceContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ServiceContext.Provider>
  );
};

// Custom hook to access context
export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};

export default ServiceProvider;
