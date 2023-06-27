import {useState} from "react";
import {CustomInput} from "../CustomInput/CustomInput";
import {Button, Form, Row} from "react-bootstrap";

export const CustomForm = ({title, handleClick}) => {
    const [email,setEmail] = useState('')
    const [pass, setPass] = useState('')
    return(<div className='container p-4 my-5 d-flex flex-column w-50 '>
        <h1>{title}</h1>
        <Form>
            <Form.Group>
                <CustomInput

                    disabled={
                        false
                    }
                    required={true}
                    label="Email"
                    type="text"
                    name='Email'

                    value={
                        email
                    }
                    error={
                        false}
                    onChange={(e) => setEmail(e.target.value)

                    }
                    maxLength={40} />
            </Form.Group>
            <Form.Group className='mt-4'
            >
                <CustomInput
                    disabled={
                        false
                    }
                    required={true}
                    label="Пароль"
                    type="text"
                    name='Password'

                    value={
                        pass
                    }
                    error={
                        false}
                    onChange={(e) => setPass(e.target.value)

                    }
                    maxLength={40} />
            </Form.Group>

                <Button
                    className='LoginSingUpButton mt-3'
                    onClick = {() => handleClick(email, pass)}
                >
                    {title}
                </Button>


        </Form>
    </div>)
}