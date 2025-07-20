import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import {
    collection,
    getDocs,
    getDoc,
    DocumentReference,
    Timestamp
} from 'firebase/firestore'
import DeleteButton from './delete-button'
import EditButton from './edit-button'

type Quotation = {
    id: string
    peça_id?: DocumentReference
    supplier?: string
    createdBy?: DocumentReference
    createdAt?: Timestamp
    price?: string
}

type QuotationResolved = {
    id: string
    peça?: {"id": string, "name": string} | null
    supplier?: string
    createdBy?: string
    createdAt?: string
    price?: string
}

export default function Table() {
    const [data, setData] = useState<QuotationResolved[]>([])

    useEffect(() => {
        async function fetchData() {
            const querySnapshot = await getDocs(collection(db, 'quotations'))

            const rawQuotations: Quotation[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            const resolvedQuotations = await Promise.all(
                rawQuotations.map(async (q) => {
                    let peçaNome = null
                    let createdByNome = ''

                    if (q.peça_id) {
                        const peçaSnap = await getDoc(q.peça_id)
                        if (peçaSnap.exists()) {
                            peçaNome = {
                            id: peçaSnap.id,
                            name: peçaSnap.data().name || '[sem nome]'
                            }
                        }
                    }

                    if (q.createdBy) {
                        const userSnap = await getDoc(q.createdBy)
                        if (userSnap.exists()) {
                            createdByNome = userSnap.data().username || '[sem nome]'
                        }
                    }

                    return {
                        id: q.id,
                        peça: peçaNome,
                        supplier: q.supplier || '',
                        createdBy: createdByNome,
                        createdAt: q.createdAt
                            ? q.createdAt.toDate().toLocaleDateString()
                            : '',
                        price: q.price || ''
                    }
                })
            )

            setData(resolvedQuotations)
        }

        fetchData()
    }, [])

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
                    <th className="p-3">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map((quotation) => (
                    <tr
                        key={quotation.id}
                        className="odd:bg-gray-50 dark:odd:bg-neutral-700 even:bg-white dark:even:bg-neutral-800 hover:bg-orange-100 text-center"
                    >
                        <td className="p-3">{quotation.peça?.name}</td>
                        <td className="p-3">{quotation.peça?.id}</td>
                        <td className="p-3">{quotation.supplier}</td>
                        <td className="p-3">{quotation.createdBy}</td>
                        <td className="p-3">{quotation.createdAt}</td>
                        <td className="p-3">{quotation.price}</td>
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
