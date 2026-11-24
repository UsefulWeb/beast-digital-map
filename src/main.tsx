import { registerPwa, syncAppHeight } from '@shared/lib'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css/normalize.css'

import './index.css'
import { App } from './app'

syncAppHeight()
registerPwa()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
