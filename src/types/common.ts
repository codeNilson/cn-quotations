// Common types used across the application

export type ID = string;

// Timestamp types
export type TimestampFields = {
    createdAt?: Date | string;
    updatedAt?: Date | string;
};

// API Response wrapper
export type ApiResponse<T> = {
    data: T;
    message?: string;
    success: boolean;
};

// Form states
export type FormMode = 'create' | 'edit';

// Loading states
export type LoadingState = {
    isLoading: boolean;
    error: Error | null;
};

// Generic form props
export type BaseFormProps<T = Record<string, unknown>> = {
    mode: FormMode;
    onCancel: () => void;
    onSuccess?: () => void;
    defaultValues?: T;
};

// Context types
export type ContextState<T> = T | null;

export type WithChildren = {
    children: React.ReactNode;
};
