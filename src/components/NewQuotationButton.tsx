import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import DetailSidebarContext from "../context/DetailSidebarContext";

export default function NewQuotationButton() {

    const detailSidebarContext = useContext(DetailSidebarContext)
    if (!detailSidebarContext) {
        throw new Error("Sidebar must be used within DetailSidebarProvider")
    }

    const { open } = detailSidebarContext

    return (
        <>
            <button className="btn btn-primary text-white flex items-center gap-3" onClick={() => open('quotation-create')}>
                <FontAwesomeIcon icon={faCirclePlus} className="text-lg md:text-md" />
                <p className="hidden md:block whitespace-nowrap">Nova Cotação</p>
            </button>
        </>
    )
}