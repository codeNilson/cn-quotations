import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { SidebarContextProvider } from './context/SidebarContext.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarContextProvider>
      <App />
    </SidebarContextProvider>
  </StrictMode>,
)
