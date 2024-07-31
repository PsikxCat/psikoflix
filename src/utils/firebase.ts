import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

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
      const newUser = await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        email: user.email,
        createdAt: new Date(),
        authProvider: 'email',
      })

      if (!newUser) {
        return {
          success: false,
          message: 'Error al guardar el usuario',
        }
      }
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
    console.log('User logged out successfully')
  } catch (error) {
    console.error('Error logging out user', error)
    return error
  }
}
