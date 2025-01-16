
import AppRoutes from './routes/Approutes'
import HeaderHelment from './base/Head'
import { BrowserRouter } from "react-router-dom";
import DeviceContextProvider from './contexts/DeviceContext';
import Footer from './components/layout/Footer';
function App() {

  return (
    <>
    <DeviceContextProvider>
 <HeaderHelment title='Home' />
 <BrowserRouter>
     <AppRoutes />
     </BrowserRouter>
     <Footer/>
     </DeviceContextProvider>
    </>
  )
}

export default App
