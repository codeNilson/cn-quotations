import { createContext, useState } from "react";

type DetailSidebarType =
    | 'quotation-create'
    | 'quotation-edit'
    | 'part-create'
    | 'part-edit'
    | null;

export type QuotationFormData = {
    referencia: string;
    status: string;
    fornecedor: string;
    valor: string;
}

type SidebarContextType = {
    type: DetailSidebarType
    data?: QuotationFormData
    open: (type: DetailSidebarType, data?: QuotationFormData) => void
    close: () => void,
    isOpen: boolean
}

const DetailSidebarContext = createContext<SidebarContextType | null>(null)

export const DetailSidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [type, setType] = useState<DetailSidebarType>(null)
    const [data, setData] = useState<QuotationFormData | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)

    function open(type: DetailSidebarType, data?: QuotationFormData) {
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