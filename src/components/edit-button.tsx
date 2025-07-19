import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import DetailSidebarContext from "../context/DetailSidebarContext";

export default function EditButton() {

    const context = useContext(DetailSidebarContext)

    if (!context) {
        throw new Error("SidebarContext is not provided.")
    }

    const { toggleDetailSidebar } = context

    return (
        <>
            <button className="btn btn-icon" onClick={toggleDetailSidebar}>
                <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" />
            </button>
        </>
    )
}