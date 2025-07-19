import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewQuotationButton() {
    return (
        <>
            <button className="btn btn-primary text-white flex items-center gap-3">
                <FontAwesomeIcon icon={faCirclePlus} className="text-lg md:text-md" />
                <p className="hidden md:block whitespace-nowrap">Nova Cotação</p>
            </button>
        </>
    )
}