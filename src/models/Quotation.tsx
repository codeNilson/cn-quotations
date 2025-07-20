import type { DocumentReference, Timestamp } from "firebase/firestore"
import type { PartResolved } from "./Part"
import type { UserResolved } from "./User"

export type Quotation = {
    id: string,
    part?: DocumentReference
    supplier?: string
    createdBy?: DocumentReference
    createdAt?: Timestamp
    updatedAt?: Timestamp
    price?: string
}

export type QuotationResolved = {
    id: string
    part?: PartResolved | null
    supplier?: string
    createdBy?: UserResolved | null
    createdAt?: string
    price?: string
}