import { useState } from 'react'

export default function LoginPage() {
  const [loginState, setLoginState] = useState<'signIn' | 'register'>('signIn')

  return (
    <section className='flex_center h-[100vh] bg-[url("./assets/bg.webp")] bg-cover'>
      <main className="flex h-full w-full flex-col bg-black/50 p-6">
        <img src="/psikoflix-logo.svg" alt="logo" width={240} className="svg_shadow" />

        <section className="flex_center flex-1">
          <div className="mb-24 flex min-w-[350px] flex-col gap-4 rounded-lg bg-black/80 px-6 py-10">
            <h1 className="mb-4 text-2xl font-semibold">
              {loginState === 'signIn' ? 'Iniciar sesión' : 'Crear una cuenta'}
            </h1>

            {/* formulario de login */}
            <form action="" className="flex_center_col gap-2 px-2">
              {loginState === 'register' && <input type="text" placeholder="Nombre" className="input_text" />}
              <input type="email" placeholder="Correo" className="input_text" />
              <input type="password" placeholder="Contraseña" className="input_text" />

              <button className="mt-4 block w-1/2 bg-accent font-bold">
                {loginState === 'signIn' ? 'Ingresar' : 'Crear'}
              </button>

              <div className="mb-4 flex gap-1 text-sm">
                <input type="checkbox" className="accent-rose-600" />
                <label htmlFor="">Recuerdame</label>
              </div>

              {loginState === 'signIn' ? (
                <p className="self-start text-sm">
                  ¿No tienes cuenta?{' '}
                  <span
                    className="cursor-pointer underline hover:text-accent"
                    onClick={() => setLoginState('register')}
                  >
                    Registrate
                  </span>
                </p>
              ) : (
                <p className="self-start text-sm">
                  ¿Ya tienes cuenta?{' '}
                  <span className="cursor-pointer underline hover:text-accent" onClick={() => setLoginState('signIn')}>
                    Inicia sesión
                  </span>
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    </section>
  )
}
