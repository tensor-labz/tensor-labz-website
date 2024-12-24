import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ServicePage from "../pages/ServicePage";
import services from "../data/Data_Services";
import Image from "../asserts/images/page/hero.webp"
import Error from "../pages/Error";


const router=createBrowserRouter([
{
    path:"/",
    element:<MainLayout/>,
    errorElement:<Error/>,
    children:[
{
    path:"/",
    element:<Home/>
},
{
    path:"/services/:slug",
    element:<ServicePage/>,
    loader:({params})=>services.find(service=>service.slug===params.slug)
},
{
    path:"/services",
    element:<ServicePage/>,
    loader:({params})=>({})
}
    ]
}
])

export default router