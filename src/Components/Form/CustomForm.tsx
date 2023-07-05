import {useState} from "react";
import {CustomInput} from "../CustomInput/CustomInput";
import {Button, Form} from "react-bootstrap";


interface CustomFormProps {
    title: string;
    handleClick: (email: string, pass: string) => void;
}

export const CustomForm: React.FC<CustomFormProps> = ({title, handleClick}) => {
    const [email,setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
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
                    name='Email'

                    value={
                        email
                    }
                    error={
                        false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

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
                    type="password"
                    name='Password'

                    value={
                        pass
                    }
                    error={
                        false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)

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