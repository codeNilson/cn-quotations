import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import DetailSidebarContext from "../context/DetailSidebarContext";

export default function EditButton() {

    const context = useContext(DetailSidebarContext)
    if (!context) {
        throw new Error("Sidebar must be used within DetailSidebarProvider")
    }

    const { open } = context

    const data = {
        "referencia": "XD987",
        "status": "Pendente",
        "fornecedor": "Fornecedor XYZ",
        "valor": "1500.00",
    }

    return (
        <>
            <button className="btn btn-icon" onClick={() => open('quotation-edit', data)}>
                <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" />
            </button>
        </>
    )
}