import { faCircleCheck, faCirclePlus, faCircleXmark, faClock, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./components/Card.tsx";
import Table from "./components/Table.tsx";
import Sidebar from "./components/Sidebar.tsx"
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {

  return (
    <div className="bg-gray-100 min-h-screen gap-3 flex">
      <Sidebar />
      <div>
        <button className="btn md:hidden">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <main className="w-full">
          <div className="cards-container">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 mt-5">
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
          <div>
            <div className="flex justify-between items-center p-3 mt-5">
              <h4 className="font-bold text-2xl tracking-tight">Cotações recentes</h4>
              <button className="btn btn-primary text-white flex items-center gap-3">
                <FontAwesomeIcon icon={faCirclePlus} className="text-2xl md:text-md" />
                <p className="hidden md:block whitespace-nowrap">Nova Cotação</p>
              </button>
            </div>
            <div className="overflow-x-auto shadow-md">
              <Table />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
export default App