import { faCircleCheck, faCircleXmark, faClock, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import Card from "../components/Card.tsx";
import Table from "../components/Table.tsx";
import SidebarContext from "../context/SidebarContext.tsx";
import SidebarButton from "../components/SidebarButton.tsx"
import ToggleThemeButton from "../components/ToggleThemeButton.tsx";
import LogoutButton from "../components/LogoutButton.tsx";
import NewQuotationButton from "../components/NewQuotationButton.tsx";

export default function DashboardPage() {
  const sidebarContext = useContext(SidebarContext)

  if (!sidebarContext) {
    throw new Error("Context is not provided");
  }

  const { toggleSidebar } = sidebarContext;

  return (
    <>
      <div className="cards-container flex flex-wrap items-center px-5 py-2">
        <SidebarButton onToggleSidebar={toggleSidebar} />
        <h2 className="text-2xl font-bold tracking-tight flex-1">Dashboard</h2>
        <div className="flex items-center gap-3">
          <LogoutButton />
          <ToggleThemeButton />
        </div>
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
              <span>Total de Cotações (Mês)</span>
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
          <h4 className="font-bold text-2xl tracking-tight">Cotações</h4>
          <NewQuotationButton />
        </div>
        <div className="overflow-x-auto">
          <Table />
        </div>
      </div>
    </>
  );
}
