
import AppRoutes from './routes/Approutes'
import HeaderHelment from './base/Head'
import { BrowserRouter } from "react-router-dom";
import DeviceContextProvider from './contexts/DeviceContext';
function App() {

  return (
    <>
    <DeviceContextProvider>
 <HeaderHelment title='Home' />
 <BrowserRouter>
     <AppRoutes />
     </BrowserRouter>
     </DeviceContextProvider>
    </>
  )
}

export default App
