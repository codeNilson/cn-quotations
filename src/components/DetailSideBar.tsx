import { useContext } from "react"
import QuotationForm from "./forms/QuotationForm"
import DetailSidebarContext from "../context/DetailSidebarContext"
import type { QuotationFormData } from "../types"

export default function DetailSidebar() {

    const detailSidebarContext = useContext(DetailSidebarContext)
    if (!detailSidebarContext) {
        throw new Error("Sidebar must be used within DetailSidebarProvider")
    }

    const { type, data, close, isOpen } = detailSidebarContext

    return (
        <div>
            {isOpen && <div className="fixed inset-0 bg-black/85 z-80" onClick={close} />}
            <aside className={`fixed right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} h-full w-auto md:w-3xl bg-gray-50 dark:bg-neutral-800 p-4 z-90`}>
                {type === "quotation-create" && (
                    <QuotationForm mode="create" onCancel={close} />
                )}
                {type === "quotation-edit" && data && "reference" in data && (
                    <QuotationForm mode="edit" defaultValues={data as QuotationFormData} onCancel={close} />
                )}
            </aside>
        </div>
    )
}
