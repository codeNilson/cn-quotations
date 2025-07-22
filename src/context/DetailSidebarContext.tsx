import { createContext, useState } from "react";
import type { 
    DetailSidebarContextType, 
    DetailSidebarType, 
    DetailSidebarData,
    DetailSidebarContextProps 
} from "../types/context";

const DetailSidebarContext = createContext<DetailSidebarContextType | null>(null)

export const DetailSidebarContextProvider = ({ children }: DetailSidebarContextProps) => {
    const [type, setType] = useState<DetailSidebarType>(null)
    const [data, setData] = useState<DetailSidebarData | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)

    function open(type: DetailSidebarType, data?: DetailSidebarData) {
        setIsOpen(true)
        setType(type)
        setData(data)
    }

    function close() {
        setIsOpen(false)
        setType(null)
        setData(undefined)
    }

    return (
        <DetailSidebarContext.Provider value={{ type, data, open, close, isOpen }}>
            {children}
        </DetailSidebarContext.Provider>
    )
}

export default DetailSidebarContext;