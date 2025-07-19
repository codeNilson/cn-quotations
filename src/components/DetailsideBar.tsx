import { useContext } from "react"
import DetailSidebarContext from "../context/DetailSidebarContext"

export default function Detailsidebar({ children }: { children?: React.ReactNode }) {

    const context = useContext(DetailSidebarContext)

    if (!context) {
        throw new Error("SidebarContext is not provided.")
    }

    const { detailSidebarIsOpen, toggleDetailSidebar } = context

    return (
        <>
        {detailSidebarIsOpen && <div className="bg-black/65 fixed inset-0 z-60" onClick={toggleDetailSidebar} />}
            <aside
                className={`fixed right-0 bg-white text-black w-auto h-screen z-70 ${detailSidebarIsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div>
                    <h1>Hello world!</h1>
                </div>
                {children}
            </aside>
        </>
    )
}