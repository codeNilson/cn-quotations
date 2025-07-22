import { createContext, useState } from "react";
import type { SidebarContextType, SidebarContextProps } from "../types/context";

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarContextProvider = ({ children }: SidebarContextProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleSidebar() {
        setIsOpen(!isOpen);
    }

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarContext;