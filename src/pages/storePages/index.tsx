import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home/Home";
import { Layout } from "./layout/Layout";
import { Products } from "./Products/Products";
import { DetailsProduct } from "./DetailsProduct/DetailsProduct";

export const StorePages = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/produtos', element: <Products /> },
            { path: '/produtos/:name/:produtoId', element: <DetailsProduct /> }
        ]
    },
])