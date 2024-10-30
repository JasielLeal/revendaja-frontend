import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./pages/appPages";
import { AuthRoutes } from "./pages/authPages";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import { useDomain } from "./context/DomainContext";
import { StorePages } from "./pages/storePages";
import axios from "axios";

export default function App() {
  const { signed } = useContext(AuthContext);
  const { isMainDomain, subdomain } = useDomain();
  const [loading, setLoading] = useState(true);
  const [subdomainExists, setSubdomainExists] = useState(false);

  useEffect(() => {
    const checkSubdomain = async () => {
      if (subdomain) {
        try {
          const response = await axios.get(`http://localhost:9999/store/verifysubdomain/${subdomain}`);
          setSubdomainExists(response.data.exists);
        } catch (error) {
          console.error("Erro ao verificar subdomínio:", error);
          setSubdomainExists(false);
        }
      }
      setLoading(false);
    };

    checkSubdomain();
  }, [subdomain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Lógica de roteamento baseada no domínio e estado de autenticação
  if (isMainDomain) {
    return <RouterProvider router={signed ? AppRoutes : AuthRoutes} />;
  } else {
    if (!subdomainExists) {
      // Redireciona para uma URL que não existe
      window.location.href = `http://localhost:5173`;
    }
    return <RouterProvider router={StorePages} />;
  }
}
