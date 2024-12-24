import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './functions/router';

function App() {
  // useEffect(() => {
  //   // Disable right-click
  //   const handleContextMenu = (e) => e.preventDefault();

  //   // Disable copy
  //   const handleCopy = (e) => e.preventDefault();
    

  //   // Add listeners
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   document.addEventListener('copy', handleCopy);

  //   // Cleanup listeners on unmount
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('copy', handleCopy);
  //   };
  // }, []);
  return (
   <RouterProvider router={router} />
  );
}

export default App;
