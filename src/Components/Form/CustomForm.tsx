import {ChangeEvent, useState} from "react";
import {CustomInput} from "../CustomInput/CustomInput";
import {Button, Form} from "react-bootstrap";
import {validationHandler, ValidationType} from "./Validation";
import '../../Styles/Components/Validation.css'


interface CustomFormProps {
    title: string;
    handleClick: (email: string, pass: string) => void;
}

interface CustomFormValidation {
    email: ValidationType,
    password: ValidationType
}

export const CustomForm: React.FC<CustomFormProps> = ({title, handleClick}) => {
    const [email,setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [validation, setValidation] = useState<CustomFormValidation>({
        email: {error: false, message: ""},
        password: {error: false,  message: ""}
    })


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        if(name === 'email'){
            setEmail(value)
        }else{
            setPassword(value)
        }
        validationHandler(name, value, validation, setValidation);
    }
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
                    type="email"
                    name='email'

                    value={
                        email
                    }
                    error={validation.email.error}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)

                    }
                    maxLength={40} />
                <p className="error">
                    {validation.email.message}
                </p>
            </Form.Group>
            <Form.Group className='mt-4'
            >
                <CustomInput
                    disabled={
                        false
                    }
                    required={true}
                    label="Пароль"
                    type="password"
                    name='password'

                    value={
                        password
                    }
                    error={validation.password.error}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(e)

                    }
                    maxLength={40} />
                <p className="error">
                    {validation.password.message}
                </p>
            </Form.Group>

                <Button
                    className='LoginSingUpButton mt-3'
                    onClick = {() => handleClick(email, password)}
                >
                    {title}
                </Button>


        </Form>
    </div>)
}