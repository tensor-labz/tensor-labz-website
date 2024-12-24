import React, { createContext, useState, useContext, useEffect } from 'react';
import services from '../../data/Data_Services';
import { useParams } from 'react-router-dom';
import projects from '../../data/Data_Projects';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState(services.find((service)=>service.slug===slug)||null);
  const [selectedProjects,setSelectedProjects]=useState(slug?projects.filter(({service})=>service===slug)??[]:projects)

useEffect(()=>{
  
  setActiveTab(services.find((service)=>service.slug===slug))
setSelectedProjects(slug?projects.filter(({service})=>service===slug)??[]:projects)
return ()=>{
  setActiveTab(null)
  setSelectedProjects([])
}

},[slug])
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab,selectedProjects,setSelectedProjects }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => useContext(TabContext);
