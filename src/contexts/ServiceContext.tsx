import { createContext, useContext, useState } from "react"

const ServiceContext=createContext({})
type ServiceProps={
    children:React.ReactNode
}
type ServiceState= {
    // Define the state properties here
}

type ServiceAction= {
    type: string;
    // Define other action properties here
}


export default function ServiceProvider({children}:ServiceProps) {
    const [selectedService,setSelectService]=useState<number|null|undefined>(null)
  return (
    <ServiceContext.Provider value={{selectedService:selectedService,onServiceSelect:setSelectService}}>
{children}
    </ServiceContext.Provider>
  )
}

export const useServiceContext=()=>useContext(ServiceContext)