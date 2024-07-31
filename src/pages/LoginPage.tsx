import { useState } from 'react'

import { registerUser, loginUser } from '@/utils/firebase'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [loginState, setLoginState] = useState<'signIn' | 'register'>('signIn')

  const handleAuthentication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (loginState === 'signIn') {
      const sigIn = await loginUser(email.trim(), password.trim())
      if (!sigIn.success) toast.error(sigIn.message)
    } else {
      const name = formData.get('name') as string
      const register = await registerUser(name.trim(), email.trim(), password.trim())
      if (!register.success) toast.error(register.message)
    }
  }

  return (
    <section className='flex_center h-[100vh] bg-[url("./assets/bg.webp")] bg-cover'>
      <main className="flex h-full w-full flex-col bg-black/50 p-6">
        <img src="/psikoflix-logo.svg" alt="logo" width={240} className="svg_shadow" />

        {/* Registro/Acceso */}
        <section className="flex_center flex-1">
          <div className="mb-24 flex min-w-[350px] flex-col gap-4 rounded-lg bg-black/80 px-6 py-10">
            <h1 className="mb-4 text-2xl font-semibold">
              {loginState === 'signIn' ? 'Iniciar sesión' : 'Crear una cuenta'}
            </h1>

            {/* Formulario */}
            <form action="" className="flex_center_col gap-2 px-2" onSubmit={handleAuthentication}>
              {loginState === 'register' && (
                <input type="text" name="name" placeholder="Nombre" className="input_text" />
              )}
              <input type="email" name="email" placeholder="Correo" className="input_text" />
              <input type="password" name="password" placeholder="Contraseña" className="input_text" />

              <button className="mt-4 block w-1/2 bg-accent font-bold">
                {loginState === 'signIn' ? 'Ingresar' : 'Crear'}
              </button>

              {/* // > Funcionalidad pendiente
              <div className="flex gap-1 text-sm">
                <input type="checkbox" className="accent-rose-600" />
                <label htmlFor="">Recuerdame</label>
              </div> */}
            </form>

            {loginState === 'signIn' ? (
              <p className="mx-auto mt-4 text-sm">
                ¿No tienes cuenta?{' '}
                <span className="cursor-pointer underline hover:text-accent" onClick={() => setLoginState('register')}>
                  Registrate
                </span>
              </p>
            ) : (
              <p className="mx-auto mt-4 text-sm">
                ¿Ya tienes cuenta?{' '}
                <span className="cursor-pointer underline hover:text-accent" onClick={() => setLoginState('signIn')}>
                  Inicia sesión
                </span>
              </p>
            )}
          </div>
        </section>
      </main>
    </section>
  )
}
