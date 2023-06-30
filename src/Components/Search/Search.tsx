import {Col, Form, Row} from "react-bootstrap";
import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "../../../firebase";
import * as events from "events";
import {Contact} from "../../Pages/MainPage";
import {types} from "sass";
import Boolean = types.Boolean;
import {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";

interface SearchProps {

    contact: Array<Contact>;
    setContacts: (contact: Array<Contact>) => void;
}
export const Search: React.FC<SearchProps> = ({setContacts, setLoading}) => {
    const {id} = useAuth();
    const contactsCollection = collection(db, 'contacts');
    const [searchContacts, setSearchContacts] = useState<Array<Contact>>([])
    const [tagSearch, setTagSearch] = useState<boolean>(false);


    const conditionalSearch = async (value: string) => {
        if(tagSearch){
            const doc = query(contactsCollection, where('tags', 'array-contains', value), orderBy('lastName'))
            const data = await getDocs(doc);
            const fetchedData: Array<Contact> = []
            data.forEach((doc) => {
                fetchedData.push({id: doc.id, ...doc.data()} as Contact)
            })
            setContacts(fetchedData);

        }else{

            const filteredFetchedData = searchContacts.filter((item) => {
                return value.toLowerCase() === '' ? item :
                    item.lastName.toLowerCase().includes(value.toLowerCase())
                    | item.firstName.toLowerCase().includes(value.toLowerCase())
                    | item.middleName.toLowerCase().includes(value.toLowerCase())
                    | item.phone.toLowerCase().includes(value.toLowerCase())
                    | item.email.toLowerCase().includes(value.toLowerCase())
            })

            setContacts(filteredFetchedData);

        }
    }

    useEffect(() => {

        const getContactsForSearch = async  () => {

            const doc = query(contactsCollection, where('accountId', '==', id), orderBy('lastName'))
            const data = await getDocs(doc);
            const fetchedData: Array<Contact> = []
            data.forEach((doc) => {
                fetchedData.push({id: doc.id, ...doc.data()} as Contact)
            })
            setSearchContacts(fetchedData);

        }

        getContactsForSearch();

    }, [])


    return(
        <div>
            <Form>
                <Row>
                    <Form.Group as={Col} md={9} lg={9}>
                        <Form.Control
                            onChange={(e) => conditionalSearch(e.target.value)}
                        placeholder='Введите что-нибудь..'
                        />
                    </Form.Group>

                    <Form.Group as={Col} md={3} lg={3}>
                        <Form.Check
                        className='mt-2'
                        type="checkbox"
                        label='Поиск по тегам'
                        сhecked={tagSearch}
                        onChange={() => setTagSearch(!tagSearch)}
                        />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}