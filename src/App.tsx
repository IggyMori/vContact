import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header} from "./Components/Header/Header";
import {StartPage} from "./Pages/StartPage";
import {Footer} from "./Components/Footer/Footer";
import {Routes, Route} from 'react-router-dom'
import {LoginPage} from "./Pages/LoginPage";
import {RegisterPage} from "./Pages/RegisterPage";
import {MainPage} from "./Pages/MainPage";
import {PrivateRouter} from "./utils/PrivateRouter";


function App() {


  return (
    <div className='App'>
        <Header />
        <Routes>
            <Route path= '/' element={<StartPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path = '/registration' element={<RegisterPage />} />
            <Route element={<PrivateRouter />} >
                <Route path = '/mainPage' element={<MainPage />} />
            </Route>

        </Routes>

        <Footer/>
    </div>
  )
}

export default App
