import type { ID, BaseFormProps } from "../types/common"

// Raw data from Firestore
export type Part = {
    machine_name: string
    name: string
}

// Resolved data with ID
export type PartResolved = {
    id: ID
    machine_name: string
    name: string
}

// Data for creating new parts
export type PartCreateDTO = {
    machine_name: string
    name: string
}

// Data for updating parts
export type PartUpdateDTO = Partial<PartCreateDTO> & {
    updatedAt?: Date
}

// Form data structure
export type PartFormData = {
    id: ID
    machine_name: string
    name: string
}

// Form props with proper typing
export type PartFormProps = BaseFormProps<PartFormData>