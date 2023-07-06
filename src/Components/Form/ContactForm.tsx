import {Button, Col, Form, Row} from "react-bootstrap";
import {CustomInput} from "../CustomInput/CustomInput.js";
import {useState} from "react";
import {Contact} from "../../Pages/MainPage";
import {useAuth} from "../../hooks/useAuth";
import '../../Styles/Components/ContactForm.scss';
import '../../Styles/Components/Validation.css'
import cross from "../../assets/cross.png";
import {collection, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import {db} from "../../../firebase";
import {PulseLoader} from "react-spinners";
import {validationHandler, ValidationType} from "./Validation";
interface ContactFormProps{

    type?: string;

    contact?: Contact;
    getContacts: () => void;
    onClose: () => void;
}

enum InputEnum{
    LastName = 'lastName',
    FirstName = 'firstName',
    MiddleName = 'middleName',
    Email = 'email',
    Phone = 'phone',
    Tags = 'tags'
}

interface ContactFormValidation {
    email: ValidationType,
    phone: ValidationType
}
export const ContactForm: React.FC<ContactFormProps> = ({getContacts,onClose, type, contact}) => {
    const {id, isAuth} = useAuth();
    const [validation, setValidation] = useState<ContactFormValidation>({
        email: {error: false, message: ""},
        phone: {error: false, message: ""}
    })


    const [inputData, setInputData] = useState<Partial<Contact>>(
        {
            accountId: isAuth !== false ? id : '',
            lastName: type === 'edit' ? contact?.lastName  : '',
            firstName: type === 'edit' ? contact?.firstName :  '',
            middleName: type === 'edit' ? contact?.middleName : '',
            email: type === 'edit' ? contact?.email : '',
            phone: type === 'edit' ? contact?.phone : '',
            tags: type === 'edit' ? contact?.tags : [] as string[],
        }
    )
    const [tag,setTag] = useState<string>('');
    const [loading,setLoading] = useState<string>('')
    const contactsCollection = collection(db, 'contacts');
    const handleInputChange = (field: InputEnum, value: string) => {
        setInputData({...inputData, [field]: value});
        validationHandler(field, value, validation, setValidation);
    }

    const setTagHandler  = (value: string) => {
        setTag(value.trim());
    }
    const cancelHandler = () => {
        setInputData(
            {
                accountId: isAuth !== false ? id : '',
                lastName: type === 'edit' ? contact?.lastName  : '',
                firstName: type === 'edit' ? contact?.firstName :  '',
                middleName: type === 'edit' ? contact?.middleName : '',
                email: type === 'edit' ? contact?.email : '',
                phone: type === 'edit' ? contact?.phone : '',
                tags: type === 'edit' ? contact?.tags : [] as string[],
            }
        );
        setValidation(
            {
                email: {error: false, message: ""},
                phone: {error: false, message: ""}
            }
        )
        onClose();
    }

    const setTagToInputData = () => {
        const newTags = [...(inputData.tags || []), tag];
        if(tag !== ''){
            setInputData({...inputData, tags: newTags});
            setTag('');
        }

    }

    const deleteTagFromInputData = (idx: number) => {
        const updatedTags = inputData.tags?.filter((_, index) => index !== idx);

        setInputData({ ...inputData, tags: updatedTags });

    }

    const createContact = async () => {
        setLoading('saveLoading');
        const newContact: Partial<Contact> = {
            accountId: inputData.accountId,
            email: inputData.email,
            firstName: inputData.firstName,
            lastName: inputData.lastName,
            middleName: inputData.middleName,
            phone: inputData.phone,
            tags: inputData.tags
        }
        await addDoc(contactsCollection, newContact).then(() => setLoading(''));

        setInputData({
            accountId: '',
            lastName: '',
            firstName: '',
            middleName: '',
            email: '',
            phone:'',
            tags:  [],
        })
        getContacts();
        onClose();
    }

    const updateContact = async () => {
        setLoading('saveLoading');
        const contactDoc = doc(db, "contacts", String(contact?.id));
    const updatedContact: Partial<Contact> = {
        accountId: inputData.accountId,
        email: inputData.email,
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        middleName: inputData.middleName,
        phone: inputData.phone,
        tags: inputData.tags
    }

    await updateDoc(contactDoc,updatedContact).then(() => setLoading(''));

        getContacts();

        onClose();
    }

    const deleteContact = async () => {
        const contactDoc = doc(db, "contacts", String(contact?.id));
        try{
            setLoading('deleteLoading');
            await deleteDoc(contactDoc).then(() => setLoading(''));
            getContacts();
            onClose();
        }catch(error) {
            console.log(error);
        }

    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
        if(type === 'edit'){
            updateContact();
        }else{
            createContact();
        }
        } catch (error){
            console.log(error);
        }
    }
    return(
        <Form onSubmit={handleFormSubmit}>
        <Row>
            <Form.Group as={Col} lg={4} md={12}
                        xs={12} className="mt-2">
                <CustomInput

                    disabled={
                        false
                    }
                    required={true}
                    label="Фамилия"
                    type="text"
                    name='lastName'

                    value = {inputData.lastName}
                    error={
                        false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(InputEnum.LastName, e.target.value)}

                    maxLength={40} />
            </Form.Group>
            <Form.Group as={Col} lg={4} md={12}
                        xs={12} className="mt-2">
                <CustomInput

                    disabled={
                        false
                    }
                    required={true}
                    label="Имя"
                    type="text"
                    name='firstName'

                    error={
                        false}

                    value = {inputData.firstName}

                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleInputChange(InputEnum.FirstName, e.target.value)}
                    maxLength={40} />
            </Form.Group>
            <Form.Group as={Col} lg={4}  md={12}
                        xs={12} className="mt-2">
                <CustomInput

                    disabled={
                        false
                    }
                    required={true}
                    label="Отчетство"
                    type="text"
                    name='middleName'

                    error={
                        false}

                    value = {inputData.middleName}

                    onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleInputChange(InputEnum.MiddleName, e.target.value)}
                    maxLength={40} />
            </Form.Group>
        </Row>
            <Row>
                <Form.Group as={Col} lg={4} md={12}
                            xs={12}  className="mt-2">
                    <CustomInput

                        disabled={
                            false
                        }
                        required={true}
                        label="Email"
                        type="email"
                        name='email'

                        error={validation.email.error}

                        value = {inputData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(InputEnum.Email, e.target.value)}
                        maxLength={40} />
                    <p className="error">
                        {validation.email.message}
                    </p>
                </Form.Group>
                <Form.Group as={Col} lg={4} md={12}
                            xs={12} className="mt-2">
                    <CustomInput

                        disabled={
                            false
                        }
                        required={true}
                        label="Телефон"
                        type="text"
                        name='phone'

                        error={validation.phone.error}
                        placeholder={'Формат:998xxxxxxxxx'}
                        value = {inputData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(InputEnum.Phone, e.target.value)}
                        maxLength={12} />
                    <p className="error">
                        {validation.phone.message}
                    </p>
                </Form.Group>

                <Col>

                </Col>
            </Row>
            <Row>

                <Form.Group  as={Col} lg={4} md={12}
                             xs={12} className="mt-2">
                    <Form.Label>Теги</Form.Label>
                    <div className='d-flex'>
                        <Form.Control
                            name = 'tags'
                            type='text'
                            value={tag}
                            placeholder='Введите тег(например: Семья)'
                            onChange={(e) => setTagHandler(e.target.value)}
                        />
                        <Button onClick={() => setTagToInputData()} variant="outline-success"
                        disabled={inputData.tags && inputData.tags.length >= 3}
                        >
                            +
                        </Button>


                    </div>

                </Form.Group>


            </Row>
            <Row>
                <Col className="mt-2">

                    <div className='formTags'>
                        {
                            inputData.tags?.map((tag, i) =>
                                <div className='formTag'>
                                    <Col lg={10} md={10} sm={10} xs={10}>
                                        {tag}
                                    </Col>

                                    <Col lg={2} md={2} sm={2} xs={2}>
                                        <img src={cross} className='cross' onClick={() => deleteTagFromInputData(i)} />
                                    </Col>
                                </div>
                            )
                        }

                    </div>

                </Col>
            </Row>
            <Row className='mt-4'>
                <Col lg={6} md={4} sm={12} className='mt-2'>
                    <Button disabled={loading !== ''} type='submit' variant="outline-success" >
                        <PulseLoader color={"#70a46e"} loading={loading === 'saveLoading'} size={3} />

                        {type === 'edit' ? 'Сохранить' : 'Добавить'} контакт
                    </Button>
                </Col>
                {
                    type === 'edit' ?
                        <Col lg={6} md={4} sm={12} className='mt-2'>
                            <Button disabled={loading !== ''} onClick={() => deleteContact()} variant="outline-danger">
                                <PulseLoader color={"#7e4848"} loading={loading === 'deleteLoading'} size={3} />
                                Удалить
                            </Button>
                        </Col> : ''
                }
                <Col lg={6} md={4} sm={12} className='mt-2'>
                    <Button disabled={loading !== ''}  onClick={() => cancelHandler()} variant="outline-info">
                       Отмена
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}