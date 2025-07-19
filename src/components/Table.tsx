import DeleteButton from './delete-button.tsx';
import EditButton from "./edit-button.tsx";

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
        peca: "Compressor",
        referencia: "D0075",
        fornecedor: "Troller",
        data: "25/08/2024",
        colaborador: "Robson",
        preco: "R$ 899,00",
    },
    {
        peca: "Poca",
        referencia: "XX5-7",
        fornecedor: "Boch",
        data: "31/12/2025",
        colaborador: "Natan",
        preco: "R$ 5,00",
    },
];

export default function Table() {
    return (
        <table className="table-auto border border-gray-200 w-full bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
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
                    <tr key={idx} className="odd:bg-gray-50 dark:odd:bg-neutral-700 even:bg-white dark:even:bg-neutral-800 hover:bg-orange-100 text-center">
                        <td className="p-3">{item.peca}</td>
                        <td className="p-3">{item.referencia}</td>
                        <td className="p-3">{item.fornecedor}</td>
                        <td className="p-3">{item.data}</td>
                        <td className="p-3">{item.colaborador}</td>
                        <td className="p-3">{item.preco}</td>
                        <td className="p-3">
                            <div className="flex flex-col">
                                <div>
                                    <EditButton />
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
