import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home/Home";
import { Layout } from "./layout/Layout";
import { Products } from "./Products/Products";

export const StorePages = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/produtos', element: <Products /> }
        ]
    },
])