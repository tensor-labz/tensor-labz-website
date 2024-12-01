import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ServicePage from "../pages/ServicePage";
import services from "../data/Data_Services";



const router=createBrowserRouter([
{
    path:"/",
    element:<MainLayout/>,
    children:[
{
    path:"/",
    element:<Home/>
},
{
    path:"/service/:slug",
    element:<ServicePage/>,
    loader:({params})=>services.find(service=>service.slug===params.slug)
}
    ]
}
])

export default router