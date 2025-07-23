import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.js'
import DashboardPage from './pages/DashboardPage.js'
import PartsPage from './pages/PartsPage.js'
import MachinesPage from './pages/MachinesPage.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import { AuthProvider } from './context/AuthContext.js'
import { SidebarContextProvider } from './context/SidebarContext.js'
import { ThemeContextProvider } from './context/ThemeContext.js'
import { DetailSidebarContextProvider } from './context/DetailSidebarContext.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "parts",
        element: <PartsPage />
      },
      {
        path: "machines",
        element: <MachinesPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthProvider>
          <SidebarContextProvider>
            <DetailSidebarContextProvider>
              <RouterProvider router={router} />
            </DetailSidebarContextProvider>
          </SidebarContextProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
