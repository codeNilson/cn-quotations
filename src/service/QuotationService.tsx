import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import type { Quotation, QuotationCreateDTO, QuotationResolved } from "../models/Quotation";
import { fetchPart } from "./PartService";
import { fetchUser } from "./UserService";

export async function fetchQuotations(): Promise<QuotationResolved[]> {
    const quotationCollection = collection(db, 'quotations');
    const querySnapshot = await getDocs(quotationCollection);

    const rawQuotations: Quotation[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    return Promise.all(rawQuotations.map(async (quotation) => {
        let part = {
            id: '',
            name: '[sem nome]',
            machine_name: '[sem nome]'
        };

        let createdBy = {
            id: '',
            username: '[sem nome]'
        };

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
            status: quotation.status || "Pendente",
            createdAt: quotation.createdAt
                ? quotation.createdAt.toDate().toLocaleDateString()
                : '',
            price: quotation.price || ''
        }
    }))
}

export async function createQuotation(quotation: QuotationCreateDTO) {
    const newQuotation = {
        part: doc(db, 'parts', quotation.reference),
        supplier: quotation.supplier,
        status: quotation.status,
        price: quotation.price,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    await addDoc(collection(db, 'quotations'), newQuotation);
}

export async function updateQuotation(id: string, quotation: QuotationCreateDTO) {
    const quotationRef = doc(db, 'quotations', id);
    await updateDoc(quotationRef, {
        supplier: quotation.supplier,
        status: quotation.status,
        price: quotation.price,
        updatedAt: new Date()
    });
}