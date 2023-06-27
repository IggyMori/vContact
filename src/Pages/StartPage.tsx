import {Button} from "react-bootstrap";
import '../Styles/Components/Buttons.scss'
import '../Styles/Pages/StartPage.scss'
import {Link, Navigate} from 'react-router-dom'

export const StartPage: React.FC = () => {
    return (
        <div className='startPage'>
            <div className='container'>
                <div className='content'>
                    <h1>vContact</h1>
                    <div className="card">
                        <h4>Простое и удобное приложение для менеджмента ваших контактов</h4>
                        <Button className='mt-4 startButton'><Link to='/login'>Начать</Link> </Button>
                    </div>

                </div>

            </div>
        </div>

    )
}