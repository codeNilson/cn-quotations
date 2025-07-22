import type { QuotationFormData } from "../models/Quotation"
import type { PartFormData } from "../models/Part"
import type { ContextState, WithChildren } from "./common"

// Sidebar types
export type SidebarContextType = {
    isOpen: boolean
    toggleSidebar: () => void
}

export type SidebarContextProps = WithChildren

// Theme types
export type Theme = 'light' | 'dark'

export type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}

export type ThemeContextProps = WithChildren

// Detail Sidebar types
export type DetailSidebarType =
    | 'quotation-create'
    | 'quotation-edit'
    | 'part-create'
    | 'part-edit'
    | null

export type DetailSidebarData = QuotationFormData | PartFormData

export type DetailSidebarContextType = {
    type: DetailSidebarType
    data?: DetailSidebarData
    open: (type: DetailSidebarType, data?: DetailSidebarData) => void
    close: () => void
    isOpen: boolean
}

export type DetailSidebarContextProps = WithChildren

// Context wrapper types for safety
export type SafeSidebarContext = ContextState<SidebarContextType>
export type SafeThemeContext = ContextState<ThemeContextType>
export type SafeDetailSidebarContext = ContextState<DetailSidebarContextType>
