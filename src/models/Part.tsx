import type { BaseFormProps } from "../types/common"
import type { Timestamp } from 'firebase/firestore';

// Raw data from Firestore
export type Part = {
    id: string; // Reference number
    name: string;
    machine_name: string;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}

// Resolved data for display
export type PartResolved = {
    id: string; // Reference number
    name: string;
    machine_name: string;
    createdAt: string;
    updatedAt?: string;
}

// Data for creating new parts
export type PartCreateDTO = {
    id: string; // Reference number
    name: string;
    machine_name: string;
}

// Data for updating parts
export type PartUpdateDTO = {
    name: string;
    machine_name: string;
    updatedAt: Date;
}

// Data for deleting parts
export type PartDeleteDTO = {
    id: string;
}

// Form data structure
export type PartFormData = {
    id: string;
    name: string;
    machine_name: string;
}

// Form props with proper typing
export type PartFormProps = BaseFormProps<PartFormData>