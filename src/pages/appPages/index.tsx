import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./home/Home";
import { Relatorio } from "./relatorio/Relatorio";

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/relatorio', element: <Relatorio /> }
        ]
    }
])