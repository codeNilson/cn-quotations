import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
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
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--toast-bg)',
                    color: 'var(--toast-color)',
                    border: '1px solid var(--toast-border)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
            </DetailSidebarContextProvider>
          </SidebarContextProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
