import { createBrowserRouter } from "react-router-dom";
import { Login } from "./login/Login";

export const AuthRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
])