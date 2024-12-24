import { useNavigate } from "react-router-dom";
import { useTabContext } from "../components/context/TabContext";

export const useTabs = (tabs) => {
    const { activeTab} = useTabContext();
    const navigate = useNavigate();

    
  
    const handleTabClick = (slug) => {
        slug===null?navigate("/services"):navigate(`/services/${slug}`)
    };
  
    return { activeTab, handleTabClick, tabs };
  };
  