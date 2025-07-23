import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";
import SidebarContext from "../context/SidebarContext.tsx";
import DetailSideBar from "./DetailSideBar.tsx";

function Layout() {
  const sidebarContext = useContext(SidebarContext)

  if (!sidebarContext) {
    throw new Error("Context is not provided");
  }

  const { isOpen, toggleSidebar } = sidebarContext;

  return (
    <>
      <DetailSideBar />
      <div className="bg-gray-100 dark:bg-neutral-900 min-h-screen gap-3 flex">
        <Sidebar />
        <main className={`w-full transition duration-300`} onClick={isOpen ? toggleSidebar : undefined}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout;
