import { createContext, useState } from "react";

const DetailSidebarContext = createContext<
    {
        detailSidebarIsOpen: boolean,
        toggleDetailSidebar: () => void
    } | null>(null)

export const DetailSidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [detailSidebarIsOpen, setDetailSidebarIsOpen] = useState(false)

    function toggleDetailSidebar() {
        setDetailSidebarIsOpen(!detailSidebarIsOpen)
    }

    return (
        <DetailSidebarContext.Provider value={{ detailSidebarIsOpen, toggleDetailSidebar }}>
            {children}
        </DetailSidebarContext.Provider>
    )
}

export default DetailSidebarContext;