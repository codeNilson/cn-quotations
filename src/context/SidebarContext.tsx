import { createContext } from "react";
import { useState } from "react";

const SidebarContext = createContext<{
    isOpen: boolean;
    toggle: () => void;
} | null>(null);

export const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    return (
        <SidebarContext.Provider value={{ isOpen, toggle: toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarContext;