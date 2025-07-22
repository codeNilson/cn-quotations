import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { SidebarContextProvider } from './context/SidebarContext.js'
import { ThemeContextProvider } from './context/ThemeContext.js'
import { DetailSidebarContextProvider } from './context/DetailSidebarContext.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <SidebarContextProvider>
          <DetailSidebarContextProvider>
            <App />
          </DetailSidebarContextProvider>
        </SidebarContextProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
