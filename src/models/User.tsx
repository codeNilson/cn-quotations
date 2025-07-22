import type { ID, BaseFormProps } from "../types/common"

// Raw data from Firestore
export type User = {
    username: string
    password: string
}

// Resolved data with ID (without sensitive info)
export type UserResolved = {
    id: ID
    username: string
}

// Data for creating new users
export type UserCreateDTO = {
    username: string
    password: string
}

// Data for updating users
export type UserUpdateDTO = Partial<Omit<UserCreateDTO, 'password'>> & {
    password?: string
    updatedAt?: Date
}

// Form data structure
export type UserFormData = {
    id: ID
    username: string
    password?: string  // Optional for edit mode
}

// Form props with proper typing
export type UserFormProps = BaseFormProps<UserFormData>

// Authentication types
export type LoginCredentials = {
    username: string
    password: string
}

export type AuthUser = UserResolved & {
    token?: string
    role?: string
}