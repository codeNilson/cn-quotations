import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import DetailSidebarContext from "../context/DetailSidebarContext";
import type { QuotationFormData } from "../models/Quotation";

export default function EditButton({data}: {data:QuotationFormData}) {

    const detailSidebarContext = useContext(DetailSidebarContext)
    if (!detailSidebarContext) {
        throw new Error("Sidebar must be used within DetailSidebarProvider")
    }

    const { open } = detailSidebarContext

    return (
        <>
            <button className="btn btn-icon" onClick={() => open('quotation-edit', data)}>
                <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" />
            </button>
        </>
    )
}