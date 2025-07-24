import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User, UserResolved } from "../models/User";
import { db } from "../../firebase";

export async function fetchUser(userId: string): Promise<UserResolved | null> {
    const userReference = doc(db, 'users', userId);
    const userSnap = await getDoc(userReference);

    if (userSnap.exists()) {
        const userData = userSnap.data() as User
        return {
            id: userSnap.id,
            username: userData.username
        }
    }

    return null;
}

// Função para criar/atualizar usuário no Firestore baseado no Firebase Auth
export async function ensureUserExists(authUser: { uid: string; email: string | null; displayName: string | null }): Promise<void> {
    const userRef = doc(db, 'users', authUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // Cria o usuário na coleção users se não existir
        const username = authUser.displayName || authUser.email?.split('@')[0] || 'Usuário';
        await setDoc(userRef, {
            username: username,
            email: authUser.email,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
}