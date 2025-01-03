
import AppRoutes from './routes/Approutes'
import HeaderHelment from './base/Head'
import { BrowserRouter } from "react-router-dom";
function App() {

  return (
    <>
 <HeaderHelment title='Home' />
 <BrowserRouter>
     <AppRoutes />
     </BrowserRouter>
    </>
  )
}

export default App
