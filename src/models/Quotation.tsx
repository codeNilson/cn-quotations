import type { DocumentReference, Timestamp } from "firebase/firestore"
import type { PartResolved } from "./Part"
import type { UserResolved } from "./User"
import type { ID, BaseFormProps } from "../types/common"

// Raw data from Firestore
export type Quotation = {
    id: ID
    part?: DocumentReference
    supplier?: string
    createdBy?: DocumentReference
    createdAt?: Timestamp
    updatedAt?: Timestamp
    price?: string
    status?: string
}

// Resolved data with all references loaded
export type QuotationResolved = {
    id: ID
    part: PartResolved
    supplier: string
    createdBy?: UserResolved  // Remove | null, use only optional
    createdAt: string
    updatedAt?: string  // Optional because old records might not have it
    price: string
    status: string
}

// Data for creating new quotations
export type QuotationCreateDTO = {
    status: string
    price: number
    supplier: string
    reference: ID  // Part ID reference
}

// Data for updating quotations
export type QuotationUpdateDTO = Partial<Omit<QuotationCreateDTO, 'reference'>> & {
    updatedAt: Date  // Always set when updating
}

// Data for deleting quotations
export type QuotationDeleteDTO = {
    id: ID
    reason?: string  // Optional reason for deletion
}

// Form data structure
export type QuotationFormData = {
    id: ID
    reference: ID  // Part ID
    status: string
    supplier: string
    price: string
}

// Form props with proper typing
export type QuotationFormProps = BaseFormProps<QuotationFormData>

// Filter options for quotations
export type QuotationFilter = {
    status?: string
    supplier?: string
    dateFrom?: Date
    dateTo?: Date
}

// Quotation status enum
export const QUOTATION_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired'
} as const

export type QuotationStatus = typeof QUOTATION_STATUS[keyof typeof QUOTATION_STATUS]