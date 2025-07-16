import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteButton from './delete-button.tsx';

import React from "react";

const data = [
    {
        peca: "Válvula",
        referencia: "075CD5",
        fornecedor: "Boch",
        data: "07/05/2025",
        colaborador: "Natan",
        preco: "R$ 75,00",
    },
    {
        peca: "Válvula",
        referencia: "075CD5",
        fornecedor: "Boch",
        data: "07/05/2025",
        colaborador: "Natan",
        preco: "R$ 75,00",
    },
    {
        peca: "Válvula",
        referencia: "075CD5",
        fornecedor: "Boch",
        data: "07/05/2025",
        colaborador: "Natan",
        preco: "R$ 75,00",
    },
];

export default function Table(): React.JSX.Element {
    return (
        <table className="table-auto border border-gray-200 w-full bg-white rounded-lg overflow-hidden">
            <thead>
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
            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx} className="odd:bg-gray-50 even:bg-white hover:bg-orange-100 text-center">
                        <td className="p-3">{item.peca}</td>
                        <td className="p-3">{item.referencia}</td>
                        <td className="p-3">{item.fornecedor}</td>
                        <td className="p-3">{item.data}</td>
                        <td className="p-3">{item.colaborador}</td>
                        <td className="p-3">{item.preco}</td>
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
                ))}
            </tbody>
        </table>
    );
}
