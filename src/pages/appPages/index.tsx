import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./home/Home";
import { Relatorio } from "./relatorio/Relatorio";
import { Stock } from "./stock/Stock";
import { AddProductToStock } from "./addProductToStock/AddProductToStock";

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/relatorio', element: <Relatorio />, },
            { path: '/estoque', element: <Stock /> },
            { path: '/estoque/adicionarproduto', element: <AddProductToStock /> }
        ]
    }
])