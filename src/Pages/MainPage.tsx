import {useEffect, useState} from "react";
import {collection, getDocs, query, where, orderBy, limit, startAfter, getCountFromServer} from 'firebase/firestore'
import '../Styles/Pages/MainPage.scss'
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Contact} from "../Components/Contact/Contact";
import {db} from "../../firebase";
import {Modal} from "../Components/Modal/Modal";
import {ContactForm} from "../Components/Form/ContactForm";
import {useAuth} from "../hooks/useAuth";
import {PuffLoader} from "react-spinners";
import {Search} from "../Components/Search/Search";

export type Contact = {
    id: string,
    firstName: string,
    lastName: string,
    middleName: string,

    phone: string,
    email: string,

    tags: []

    accountId: string

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

    const getContacts = async () =>  {
        setLoading(true);
        const doc = query(contactsCollection, where('accountId', '==', id), orderBy('lastName'), limit(4))
        const data = await getDocs(doc);
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
    }

    const getContactsMore = async () => {

        const doc = query(contactsCollection, where('accountId', '==', id), orderBy('lastName'), limit(5), startAfter(lastDocEl))
        const data = await getDocs(doc);
        const lastDoc = data.docs[data.docs.length - 1];
        const fetchedData: Array<Contact> = []
        data.forEach((doc) => {
            fetchedData.push({id: doc.id, ...doc.data()} as Contact)
        })
        const snapShot = await getCountFromServer(contactsCollection);
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
    }, [])

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
                <Search setLoading={() => setLoading} setContacts={setContacts} />

                <Button className='mt-4' onClick={() => setModal(true)}>Добавить контакт</Button>
                {
                    loading ?
                        <Container
                            style={{ maxHeight: "100%" }}
                            className="d-flex justify-content-center mt-5 pb-5"
                        >
                            <PuffLoader color={"#000"} loading={loading} size={300} />
                        </Container> :


                    contacts.length === 0 ? <h2>У вас пока нет контактов</h2> :  contacts.map((contact) =>
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