import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { ensureUserExists } from './UserService';

export interface CreateUserParams {
  email: string;
  password: string;
  displayName: string;
}

export async function createUserAccount({ email, password, displayName }: CreateUserParams) {
  try {
    // Cria o usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Atualiza o displayName no perfil do usuário
    await updateProfile(userCredential.user, {
      displayName: displayName
    });

    // Sincroniza com a coleção users no Firestore
    await ensureUserExists({
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: displayName
    });

    return userCredential.user;
  } catch (error) {
    console.error('Erro ao criar conta de usuário:', error);
    throw error;
  }
}
