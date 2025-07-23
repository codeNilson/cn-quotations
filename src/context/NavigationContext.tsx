import { createContext } from 'react';

export type Page = 'dashboard' | 'parts' | 'machines';

export interface NavigationContextType {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
