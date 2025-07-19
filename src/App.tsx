import { faCircleCheck, faCircleXmark, faClock, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Card from "./components/Card.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Table from "./components/Table.tsx";
import SidebarContext from "./context/SidebarContext.tsx";
import SidebarButton from "./components/sidebar-button.tsx"
import ThemeButton from "./components/toggle-theme-button.tsx";
import NewQuotationButton from "./components/NewQuotationButton.tsx";
import DetailsideBar from "./components/DetailsideBar.tsx";

function App() {

  const sidebarContext = useContext(SidebarContext)

  if (!sidebarContext) {
    throw new Error("Context is not provided");
  }

  const { isOpen, toggleSidebar } = sidebarContext;

  return (
    <>
      <DetailsideBar />
      <div className="bg-gray-100 dark:bg-neutral-900 min-h-screen gap-3 flex">
        <Sidebar />
        <main className={`w-full transition duration-300`} onClick={isOpen ? toggleSidebar : undefined}>
          <div className="cards-container flex flex-wrap items-center px-5 py-2">
            <SidebarButton onToggleSidebar={toggleSidebar} />
            <h2 className="text-2xl font-bold tracking-tight flex-1">Dashboard</h2>
            <ThemeButton />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
              <Card>
                <div className="flex justify-between items-center">
                  <span>Concluídas</span>
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold">64</p>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-center">
                  <span>Aguardando Resposta</span>
                  <FontAwesomeIcon icon={faClock} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-center">
                  <span>Sem Retorno</span>
                  <FontAwesomeIcon icon={faCircleXmark} className="text-red-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between items-center">
                  <span>Total de cotações (Mês)</span>
                  <FontAwesomeIcon icon={faScrewdriverWrench} className="text-red-800" />
                </div>
                <div>
                  <p className="text-3xl font-bold">12</p>
                </div>
              </Card>
            </div>
          </div>
          <div className="px-5 py-2">
            <div className="flex justify-between items-center py-4">
              <h4 className="font-bold text-2xl tracking-tight">Cotações recentes</h4>
              <NewQuotationButton />
            </div>
            <div className="overflow-x-auto shadow-md">
              <Table />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default App