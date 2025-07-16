import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteButton from '../components/delete-button'

export default function Table() {
    return (
        <table className="table-auto border border-gray-200 w-full bg-white rounded-lg overflow-hidden">
            <thead className="">
                <tr>
                    <th className="p-3">Peça</th>
                    <th className="p-3">Referência</th>
                    <th className="p-3">Fornecedor</th>
                    <th className="p-3">Data</th>
                    <th className="p-3">Colaborador</th>
                    <th className="p-3">Preço</th>
                    <th className="p-3">Ações</th>
                </tr>
            </thead>
            <tbody className="">
                <tr className="odd:bg-gray-50 even:bg-white hover:bg-orange-100 text-center">
                    <td className="p-3">Válvula</td>
                    <td className="p-3">075CD5</td>
                    <td className="p-3">Boch</td>
                    <td className="p-3">07/05/2025</td>
                    <td className="p-3">Natan</td>
                    <td className="p-3">R$ 75,00</td>
                    <td className="p-3">
                        <div className="flex flex-col">
                            <div>
                                <button className="btn btn-icon">
                                    <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" />
                                </button>
                            </div>
                            <div>
                                <DeleteButton />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white hover:bg-orange-100 text-center">
                    <td className="p-3">Válvula</td>
                    <td className="p-3">075CD5</td>
                    <td className="p-3">Boch</td>
                    <td className="p-3">07/05/2025</td>
                    <td className="p-3">Natan</td>
                    <td className="p-3">R$ 75,00</td>
                    <td className="p-3">
                        <div className="flex flex-col">
                            <div>
                                <button className="btn btn-icon">
                                    <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" />
                                </button>
                            </div>
                            <div>
                                <DeleteButton />
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-white hover:bg-orange-100 text-center">
                    <td className="p-3">Válvula</td>
                    <td className="p-3">075CD5</td>
                    <td className="p-3">Boch</td>
                    <td className="p-3">07/05/2025</td>
                    <td className="p-3">Natan</td>
                    <td className="p-3">R$ 75,00</td>
                    <td className="p-3">
                        <div className="flex flex-col">
                            <div>
                                <button className="btn btn-icon">
                                    <FontAwesomeIcon icon={faPenToSquare} className="icon-edit" />
                                </button>
                            </div>
                            <div>
                                <DeleteButton />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}