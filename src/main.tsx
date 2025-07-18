import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import { SidebarContextProvider } from './context/SidebarContext.js'
import { ThemeContextProvider } from './context/ThemeContext.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <SidebarContextProvider>
        <App />
      </SidebarContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
