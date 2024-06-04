import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { AnonymyApp } from './AnonymyApp'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <React.StrictMode>
    <AnonymyApp />
  </React.StrictMode>
</BrowserRouter>
)
serviceWorkerRegistration.register();
