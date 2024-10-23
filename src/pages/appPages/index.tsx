import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./home/Home";
import { Relatorio } from "./relatorio/Relatorio";
import { Stock } from "./stock/Stock";

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/relatorio', element: <Relatorio />, },
            { path: '/estoque', element: <Stock /> }
        ]
    }
])