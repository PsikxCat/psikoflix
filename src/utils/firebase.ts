import { TFavoriteMedia, TPopulatedMediaItem } from '@/types'
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getFirestore(app)

export const usersCollectionRef = collection(db, 'users')
const userFavoritesRef = (userId: string) => collection(db, 'users', userId, 'favorites')
const favoriteDocRef = (userId: string, mediaItemId: string | number) =>
  doc(userFavoritesRef(userId), mediaItemId.toString())

// | Funcion de registro de usuario
export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<{
  success: boolean
  message: string
}> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^[a-zA-Z0-9\s\-_.@]+$/

  if (!name || !email || !password) {
    return {
      success: false,
      message: 'Completa los campos',
    }
  }
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Ingresa un correo electrónico válido',
    }
  }
  if (!passwordRegex.test(password)) {
    return {
      success: false,
      message: 'La contraseña solo puede contener letras, números y los siguientes caracteres: - _ . @',
    }
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential?.user

    if (user) {
      setDoc(doc(usersCollectionRef, user.uid), {
        uid: user.uid,
        name,
        email: user.email,
        createdAt: new Date(),
        authProvider: 'email',
      })
        .then(() => ({
          success: true,
          message: 'Usuario registrado correctamente',
        }))
        .catch(() => ({
          success: false,
          message: 'Error al guardar el usuario',
        }))
    }

    return {
      success: true,
      message: 'Usuario registrado correctamente',
    }
  } catch (error: unknown) {
    console.error('Error registering user', error)

    if (typeof error === 'object' && error !== null && 'code' in error) {
      const errorWithCode = error as { code: string }
      if (errorWithCode.code === 'auth/email-already-in-use') {
        return {
          success: false,
          message: 'Este correo ya está registrado',
        }
      }
    }

    return {
      success: false,
      message: 'Error al registrar el usuario',
    }
  }
}

// | Funcion de inicio de sesión de usuario
export const loginUser = async (
  email: string,
  password: string,
): Promise<{
  success: boolean
  message: string
}> => {
  if (!email || !password) {
    return {
      success: false,
      message: 'Completa los campos',
    }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('User logged in', userCredential)

    return {
      success: true,
      message: 'Usuario logueado correctamente',
    }
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const errorWithCode = error as { code: string }
      if (errorWithCode.code === 'auth/invalid-credential') {
        return {
          success: false,
          message: 'Credenciales inválidas',
        }
      }
    }

    return {
      success: false,
      message: 'Error al loguear el usuario',
    }
  }
}

// | Funcion de cierre de sesión de usuario
export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error logging out user', error)
    return error
  }
}

// | Funcion agregar favorito a usuario
export const addFavorite = async (
  userId: string,
  mediaItem: TPopulatedMediaItem | TFavoriteMedia,
): Promise<boolean> => {
  try {
    await setDoc(favoriteDocRef(userId, mediaItem.id), {
      id: mediaItem.id,
      media_type: mediaItem.media_type,
      title: mediaItem.title,
      backdrop_path: mediaItem.backdrop_path,
      poster_path: mediaItem.poster_path,
    })

    return true
  } catch (error) {
    console.error('Error agregando favorito', error)
    return false
  }
}

// | Funcion eliminar favorito de usuario
export const removeFavorite = async (userId: string, mediaItemId: string | number): Promise<boolean> => {
  try {
    await deleteDoc(favoriteDocRef(userId, mediaItemId))
    return true
  } catch (error) {
    console.error('Error eliminando favorito', error)
    return false
  }
}

// | Funcion para obtener los favoritos de un usuario
export const getFavorites = async (userId: string): Promise<TPopulatedMediaItem[]> => {
  try {
    const favoritesRef = collection(db, 'users', userId, 'favorites')
    const querySnapshot = await getDocs(favoritesRef)

    const favorites: TPopulatedMediaItem[] = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: data.id,
        media_type: data.media_type,
        title: data.title,
        backdrop_path: data.backdrop_path,
        poster_path: data.poster_path,
        isFavorite: true,
      } as TPopulatedMediaItem
    })

    return favorites
  } catch (error) {
    console.error('Error obteniendo favoritos:', error)
    return []
  }
}
