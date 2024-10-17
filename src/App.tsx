import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./pages/appPages";
import { AuthRoutes } from "./pages/authPages";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
export default function App() {

  const { signed } = useContext(AuthContext);

  return (
    <>
      <RouterProvider router={signed ? AppRoutes : AuthRoutes} />
    </>
  )
}

