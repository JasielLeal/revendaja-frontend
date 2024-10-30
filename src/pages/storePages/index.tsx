import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home/Home";

export const StorePages = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
])