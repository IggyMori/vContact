import {useEffect, useState} from "react";
import {collection, getDocs, query, where, orderBy, limit, startAfter, getCountFromServer, or, and} from 'firebase/firestore'
import '../Styles/Pages/MainPage.scss'
import {Button, Col, Container, Row} from "react-bootstrap";
import {Contact} from "../Components/Contact/Contact";
import {db} from "../../firebase";
import {Modal} from "../Components/Modal/Modal";
import {ContactForm} from "../Components/Form/ContactForm";
import {useAuth} from "../hooks/useAuth";
import {PuffLoader} from "react-spinners";
import {CustomInput} from "../Components/CustomInput/CustomInput";

export type Contact = {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,

    phone: string,
    email: string,

    tags: string[]

    accountId: string | null

}
export const MainPage: React.FC = () => {
    const {id} = useAuth();
    const [contacts,setContacts] = useState<Array<Contact>>([])
    const contactsCollection = collection(db, 'contacts');
    const [modal, setModal] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);
    const [lastDocEl, setLastDoc] = useState<object>({});
    const [totalCountDocs, setTotalDocs] = useState<number>(0);
    const [countContacts, setCountContacts] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>('');

    console.log(lastDocEl)
    //Получить контакты с пагинацией
    const getContacts = async () =>  {
        setLoading(true);
        console.log(searchValue)
        const doc = query(contactsCollection, where('accountId', '==', id), orderBy('lastName'), limit(4))
        const docSearch = query(contactsCollection, and(or(
            where('lastName', '==', searchValue.charAt(0).toUpperCase() + searchValue.slice(1)),
            where('firstName', '==', searchValue.charAt(0).toUpperCase() + searchValue.slice(1)),
            where('middleName', '==', searchValue.charAt(0).toUpperCase() + searchValue.slice(1)),
            where('phone', '==', searchValue),
            where('email', '==', searchValue),
            where('tags', 'array-contains', searchValue.charAt(0).toUpperCase() + searchValue.slice(1))), where('accountId', '==', id)),
            orderBy('lastName', 'asc'),
            limit(4))
        const data = await getDocs(searchValue !== '' ? docSearch : doc);
        const lastDoc = data.docs[data.docs.length - 1];
        const fetchedData: Array<Contact> = []
        data.forEach((doc) => {
            fetchedData.push({id: doc.id, ...doc.data()} as Contact)
        })
        const snapShot = await getCountFromServer(contactsCollection);
        setTotalDocs(snapShot.data().count)

        setLastDoc(lastDoc);

        setContacts(fetchedData);
        setCountContacts(fetchedData.length);

        setLoading(false)

        return data;
    }


    //Функция для пагинации
    const getContactsMore = async () => {

        const doc = query(contactsCollection, where('accountId', '==', id), orderBy('lastName'), limit(4), startAfter(lastDocEl))
        const docSearch = query(contactsCollection, and(or(
                where('lastName', '==', searchValue.charAt(0).toUpperCase() + searchValue.slice(1)),
                where('firstName', '==', searchValue.charAt(0).toUpperCase() + searchValue.slice(1)),
                where('middleName', '==', searchValue.charAt(0).toUpperCase() + searchValue.slice(1)),
                where('phone', '==', searchValue),
                where('email', '==', searchValue),
                where('tags', 'array-contains', searchValue.charAt(0).toUpperCase() + searchValue.slice(1))), where('accountId', '==', id)),
            orderBy('lastName', 'asc'),
            limit(4), startAfter(lastDocEl))
        const data = await getDocs(searchValue !== '' ? docSearch : doc);
        const lastDoc = data.docs[data.docs.length - 1];
        const fetchedData: Array<Contact> = []
        data.forEach((doc) => {
            fetchedData.push({id: doc.id, ...doc.data()} as Contact)
        })
        const snapShot = await getCountFromServer(searchValue !== '' ? docSearch : doc);
        setTotalDocs(snapShot.data().count)
        setLastDoc(lastDoc)
        const updatedData = [...contacts, ...fetchedData];
        setContacts(updatedData);
        setCountContacts(updatedData.length);

    }




    useEffect(() => {

        if(fetching){

        getContactsMore().then(() => setFetching(false));
        }
    }, [fetching])

    useEffect(() => {
        getContacts();
    }, [searchValue])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll',scrollHandler);
        }
    },[contacts])

    const scrollHandler = (e: any) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && countContacts < totalCountDocs
        ){
            setFetching(true)

        }

    }




    return(<>
        <div className='mainPage'>
            <Modal open={modal} onClose={() => setModal(false)}>
            <h2>Заполните форму</h2>
                <ContactForm getContacts={() => getContacts()} onClose={() => setModal(false)} />
        </Modal>
            <div className='container text-center'>
                <h1>Контакты</h1>
                <Row>
                    <Col md={12} lg={12}>
                        <CustomInput
                            label= 'Поиск'
                        placeholder = 'Введите что-нибудь...'
                            onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                        />
                    </Col>
                </Row>

                <Button className='mt-4' onClick={() => setModal(true)}>Добавить контакт</Button>
                {
                    loading ?
                        <Container
                            style={{ maxHeight: "100%" }}
                            className="d-flex justify-content-center mt-5 pb-5"
                        >
                            <PuffLoader color={"#000"} loading={loading} size={300} />
                        </Container> :


                    contacts.length === 0 ?
                        <h2>{searchValue !== '' ? 'Контакты не найдены' : 'У вас пока нет контактов'}</h2>
                        :
                        contacts.map((contact) =>
                        <Contact
                            id={contact.id}
                            firstName = {contact.firstName}
                            lastName = {contact.lastName}
                            middleName = {contact.middleName}
                            phone = {contact.phone}
                            email = {contact.email}
                            tags = {contact.tags}
                            accountId = {contact.accountId}
                            getContacts = {getContacts}
                        />
                    )


                }
            </div>
        </div>

    </>)
}