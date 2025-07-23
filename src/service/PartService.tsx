import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import type { Part, PartResolved, PartCreateDTO, PartUpdateDTO } from "../models/Part";
import { db } from "../../firebase";

// Helper function to create update data with timestamp
function createUpdateData(partData: PartCreateDTO): PartUpdateDTO {
    return {
        name: partData.name,
        machine_name: partData.machine_name,
        updatedAt: new Date()
    };
}

export async function fetchPart(partId: string): Promise<PartResolved | null> {
    const partDoc = doc(db, 'parts', partId);
    const partSnap = await getDoc(partDoc);

    if (partSnap.exists()) {
        const partData = partSnap.data() as Part;
        return {
            id: partSnap.id,
            name: partData.name || '[sem nome]',
            machine_name: partData.machine_name || '[sem nome]',
            createdAt: partData.createdAt 
                ? partData.createdAt.toDate().toLocaleDateString()
                : '',
            updatedAt: partData.updatedAt 
                ? partData.updatedAt.toDate().toLocaleDateString()
                : undefined,
        };
    } else {
        return null;
    }
}

export async function fetchParts(): Promise<PartResolved[]> {
    const partsCollection = collection(db, 'parts');
    const partsQuery = query(partsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(partsQuery);

    return querySnapshot.docs.map(doc => {
        const partData = doc.data() as Part;
        return {
            id: doc.id,
            name: partData.name || '[Sem nome]',
            machine_name: partData.machine_name || '[Sem nome]',
            createdAt: partData.createdAt 
                ? partData.createdAt.toDate().toLocaleDateString()
                : '',
            updatedAt: partData.updatedAt 
                ? partData.updatedAt.toDate().toLocaleDateString()
                : undefined,
        };
    });
}

export async function createPart(part: PartCreateDTO): Promise<void> {
    const newPart = {
        name: part.name,
        machine_name: part.machine_name,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Use the reference number as document ID
    await setDoc(doc(db, 'parts', part.id), newPart);
}

export async function updatePart(id: string, partData: PartCreateDTO): Promise<void> {
    const partRef = doc(db, 'parts', id);
    const updateData = createUpdateData(partData);
    
    await updateDoc(partRef, updateData);
}

export async function deletePart(id: string): Promise<void> {
    const partRef = doc(db, 'parts', id);
    await deleteDoc(partRef);
}