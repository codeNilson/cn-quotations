import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import type { Part, PartResolved } from "../models/Part";
import { db } from "../../firebase";

export async function fetchPart(partId: string): Promise<PartResolved | null> {
    const partDoc = doc(db, 'parts', partId);
    const partSnap = await getDoc(partDoc);

    if (partSnap.exists()) {
        const partData = partSnap.data() as Part;
        return {
            id: partSnap.id,
            machine_name: partData.machine_name || '[sem nome]',
            name: partData.name || '[sem nome]'
        };
    } else {
        return null;
    }
}

export async function fetchParts(): Promise<PartResolved[]> {
    const partsCollection = collection(db, 'parts');
    const querySnapshot = await getDocs(partsCollection);

    return querySnapshot.docs.map(doc => {
        const partData = doc.data() as Part;
        return {
            id: doc.id,
            machine_name: partData.machine_name || '[Sem nome]',
            name: partData.name || '[Sem nome]'
        };
    });
}