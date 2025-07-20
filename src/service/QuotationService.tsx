import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import type { Quotation, QuotationResolved } from "../models/Quotation";
import { fetchPart } from "./PartService";
import { fetchUser } from "./UserService";

export async function fetchQuotations(): Promise<QuotationResolved[]> {
    const quotationCollection = collection(db, 'quotations');
    const querySnapshot = await getDocs(quotationCollection);

    const rawQuotations: Quotation[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    return await Promise.all(rawQuotations.map(async (quotation) => {
        let part = null
        let createdBy = null

        if (quotation.part) {
            const partData = await fetchPart(quotation.part.id)
            if (partData) {
                part = {
                    id: partData.id,
                    name: partData.name || '[sem nome]',
                    machine_name: partData.machine_name || '[sem nome]'
                }
            }
        }

        if (quotation.createdBy) {
            const user = await fetchUser(quotation.createdBy.id)
            if (user) {
                createdBy = {
                    id: user.id,
                    username: user.username || '[sem nome]'
                }
            }
        }

        return {
            id: quotation.id,
            part: part,
            supplier: quotation.supplier || '',
            createdBy: createdBy,
            createdAt: quotation.createdAt
                ? quotation.createdAt.toDate().toLocaleDateString()
                : '',
            price: quotation.price || ''
        }
    }))
}