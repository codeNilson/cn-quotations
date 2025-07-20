import { doc, getDoc } from "firebase/firestore";
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