import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { DomainProvider } from './context/DomainContext.tsx'


const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Não refaz requisições ao ganhar foco na janela
      // Não refaz requisições ao remontar o componente se os dados estiverem em cache // Define 5 minutos para dados ficarem "frescos"
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <DomainProvider>
        <AuthProvider>

          <App />

          <Toaster />
        </AuthProvider>
      </DomainProvider>
    </QueryClientProvider>
  </StrictMode>,
)
