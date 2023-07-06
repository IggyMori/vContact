import {Button, Col, Row} from "react-bootstrap";
import '../../Styles/Components/Contact.scss'
import {useState} from "react";
import {ContactForm} from "../Form/ContactForm";
import {Modal} from "../Modal/Modal";
export interface ContactProps{
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;

    tags: string[];

    accountId: string | null;
    getContacts: () => void;
    key: number;
}
export const Contact: React.FC<ContactProps> =
    ({id,
         firstName,
         lastName,
         middleName,
         phone,
         email,
         tags,
         accountId,
        getContacts,
        key
     }) => {

    const contact = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,

        phone: phone,
        email: email,

        tags: tags,

        accountId: accountId
    }
    const [modal, setModal] = useState<boolean>(false);
    return(
       <div className='contactWrapper' key={key}>
           <Modal open={modal} onClose={() => setModal(false)}>
               <h2>Внести изменения</h2>
               <ContactForm getContacts={() => getContacts()} type='edit' contact={contact} onClose={() => setModal(false)} />
           </Modal>
           <Row>
               <Col lg={2}>
                   <h4>ФИО</h4>
                   {lastName + ' ' + firstName + ' ' + middleName}
               </Col>
               <Col lg={2}>
                   <h4>Телефон</h4>
                   {phone}
               </Col>
               <Col lg={2}>
                   <h4>Email</h4>
                   {email}
               </Col>
               <Col lg={3}>
                   <h4>Tеги</h4>

                       {tags.map((tag, i) =>
                           <div className='tag' key={i}>
                               {
                                   `${tag}${i != tags.length -1 ? ',' : '' }`  }
                           </div>
                       )}


               </Col>
               <Col lg={3}>
                   <h4>Действия</h4>
                   <Row>
                       <Col><Button onClick={() => setModal(true)} variant="outline-success">
                           Изменить
                       </Button></Col>

                   </Row>
               </Col>
           </Row>
       </div>
    )
}