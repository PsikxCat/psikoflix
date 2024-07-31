import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import GlobalProvider from '@/context/GlobalProvider'

import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />

      <ToastContainer
        position="top-center"
        autoClose={3300}
        hideProgressBar
        newestOnTop={false}
        stacked
        closeOnClick
        theme="dark"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </GlobalProvider>
  </React.StrictMode>,
)
