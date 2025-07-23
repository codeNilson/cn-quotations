import { useState } from 'react';
import type { ReactNode } from 'react';
import { NavigationContext, type Page } from '../context/NavigationContext';

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');

    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    );
};
