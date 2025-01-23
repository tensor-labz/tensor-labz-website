
import AppRoutes from './routes/Approutes'
import { BrowserRouter } from "react-router-dom";
import DeviceContextProvider from './contexts/DeviceContext';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import { memo } from 'react';
function App() {

  return (
    <>
    <DeviceContextProvider>
      
 <BrowserRouter>
 <Header/>
     <AppRoutes />
     </BrowserRouter>
     <Footer/>
     </DeviceContextProvider>
    </>
  )
}

export default memo(App)
