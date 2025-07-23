import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import type { Quotation, QuotationCreateDTO, QuotationResolved, QuotationUpdateDTO } from "../models/Quotation";
import { fetchPart } from "./PartService";
import { fetchUser } from "./UserService";

// Helper function to create update data with timestamp
function createUpdateData(quotationData: QuotationCreateDTO): QuotationUpdateDTO {
    return {
        supplier: quotationData.supplier,
        status: quotationData.status,
        price: quotationData.price,
        updatedAt: new Date()
    };
}

export async function fetchQuotations(): Promise<QuotationResolved[]> {
    const quotationCollection = collection(db, 'quotations');
    const quotationQuery = query(quotationCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(quotationQuery);

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
            updatedAt: quotation.updatedAt
                ? quotation.updatedAt.toDate().toLocaleDateString()
                : undefined,
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

export async function updateQuotation(id: string, quotationData: QuotationCreateDTO): Promise<void> {
    const quotationRef = doc(db, 'quotations', id);
    const updateData = createUpdateData(quotationData);
    
    await updateDoc(quotationRef, updateData);
}

export async function deleteQuotation(id: string): Promise<void> {
    const quotationRef = doc(db, 'quotations', id);
    await deleteDoc(quotationRef);
}