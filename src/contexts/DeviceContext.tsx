import React, { createContext, useContext, useState, useLayoutEffect } from "react";

// Define the device type
type DeviceType = "lg" | "md" | "sm" | "xs"| "xl"| "2xl";

// Create the context with a default value ("lg" here)
const DeviceContext = createContext<DeviceType>("lg");

// Custom hook to access the device context
export const useDeviceContext = () => useContext(DeviceContext);

// Function to determine the device type based on the window width
const getDeviceType = (width: number): DeviceType => {
if (width >= 1536) {
    return "2xl";
  } else if (width >= 1280) {
    return "xl";
  }
  else if (width >= 1024) {
    return "lg";
  } else if (width >= 768) {
    return "md";
  } else if (width >= 640) {
    return "sm";
  } else {
    return "xs";
  }
};

type DeviceContextProviderProps = {
  children: React.ReactNode;
};

// Device Context provider that uses useLayoutEffect to track window resize
export default function DeviceContextProvider({ children }: DeviceContextProviderProps) {
  const [deviceType, setDeviceType] = useState<DeviceType>("lg");

  useLayoutEffect(() => {
    // Function to handle window resizing and update device type
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType(getDeviceType(width));
    };

    // Initial device type check
    handleResize();

    // Event listener for window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Only run once on mount and unmount

  return (
    <DeviceContext.Provider value={deviceType}>
      {children}
    </DeviceContext.Provider>
  );
}
