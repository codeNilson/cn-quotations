import { useQuotations } from '../hooks/useQuotation';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import TableSkeleton from './TableSkeleton';


export default function Table() {

    const { data, isLoading } = useQuotations();

    if (isLoading) return <TableSkeleton />
    if (!data) return null;

    return (
        <table className="table-auto border border-gray-200 w-full bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th className="p-3">Peça</th>
                    <th className="p-3">Referência</th>
                    <th className="p-3">Fornecedor</th>
                    <th className="p-3">Colaborador</th>
                    <th className="p-3">Criado em</th>
                    <th className="p-3">Preço</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map((quotation) => (
                    <tr
                        key={quotation.id}
                        className="odd:bg-gray-50 dark:odd:bg-neutral-700 even:bg-white dark:even:bg-neutral-800 hover:bg-orange-100 text-center"
                    >
                        <td className="p-3">{quotation.part?.name}</td>
                        <td className="p-3">{quotation.part?.id}</td>
                        <td className="p-3">{quotation.supplier}</td>
                        <td className="p-3">{quotation.createdBy?.username}</td>
                        <td className="p-3">{quotation.createdAt}</td>
                        <td className="p-3">{quotation.price}</td>
                        <td className="p-3">{quotation.status}</td>
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
    )
}
