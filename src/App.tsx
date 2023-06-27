import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./Components/Header/Header";
import {StartPage} from "./Pages/StartPage";
import {Footer} from "./Components/Footer/Footer";
import {Routes, Route} from 'react-router-dom'
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <Header />
        <Routes>
            <Route path= '/' element={<StartPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path = '/registration' element={<RegisterPage />} />
        </Routes>

        <Footer/>
    </div>
  )
}

export default App
