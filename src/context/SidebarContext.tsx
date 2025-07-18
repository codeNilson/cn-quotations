import { createContext, useState } from "react";

const SidebarContext = createContext<{
    isOpen: boolean;
    toggleSidebar: () => void;
} | null>(null);

export const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar: toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarContext;