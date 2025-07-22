import type { ReactNode } from 'react'
import type { QuotationFormData } from "../models/Quotation"

// Base component props
export type ComponentProps = {
    className?: string
    children?: ReactNode
}

// Button component props
export type ButtonProps = ComponentProps & {
    onClick?: () => void
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger' | 'icon'
}

// Card component props
export type CardProps = ComponentProps

// Table component props
export type TableProps = ComponentProps & {
    data?: unknown[]
    isLoading?: boolean
}

// Edit button props
export type EditButtonProps = {
    data: QuotationFormData
}

// Delete button props
export type DeleteButtonProps = {
    onDelete?: () => void
    itemId?: string
}

// Sidebar button props
export type SidebarButtonProps = {
    onToggleSidebar: () => void
}

// Theme button props
export type ThemeButtonProps = ComponentProps

// Form input props
export type InputProps = ComponentProps & {
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    disabled?: boolean
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    name?: string
    id?: string
}

// Select props
export type SelectProps = ComponentProps & {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    required?: boolean
    disabled?: boolean
    name?: string
    id?: string
    options?: Array<{
        value: string
        label: string
    }>
}
