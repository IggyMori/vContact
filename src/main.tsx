import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from './Store'
import App from './App.tsx'
import './index.css'
import '../firebase'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store} >
              <App />
          </Provider>

      </BrowserRouter>

  </React.StrictMode>,
)
