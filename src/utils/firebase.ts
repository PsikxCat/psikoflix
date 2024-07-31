import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDSttGclRmp8fDfIn2JaEy8Qujhz5c0Z6o',
  authDomain: 'psikoflix.firebaseapp.com',
  projectId: 'psikoflix',
  storageBucket: 'psikoflix.appspot.com',
  messagingSenderId: '192178715107',
  appId: '1:192178715107:web:6e274988c32dad4e5148d6',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const db = getFirestore(app)

// | Funciones de autenticación
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log('User registered successfully', userCredential)
    const user = userCredential?.user

    if (user) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        email: user.email,
        createdAt: new Date(),
        authProvider: 'email',
      })
    }
  } catch (error) {
    console.error('Error registering user', error)
    return error
  }
}

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('User logged in successfully', userCredential)
  } catch (error) {
    console.error('Error logging in user', error)
    return error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
    console.log('User logged out successfully')
  } catch (error) {
    console.error('Error logging out user', error)
    return error
  }
}
