import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./home/Home";

export const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
        ]
    }
])