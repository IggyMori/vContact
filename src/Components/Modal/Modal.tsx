
import { Button, Col, Container, Row } from "react-bootstrap";
import '../../Styles/Components/Modal.scss'
import cross from "../../assets/cross.png";
import {PropsWithChildren} from "react";


interface ModalProps{
    open: boolean;
    onClose: () => void;
}
export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ open, onClose, children }) => {
    return (
        <div className={open ? "modalWrapper active" : "modalWrapper"}>
            <Container className={open ? "modalWindow active" : "modalWindow"}>
                <Row>
                    <Col lg={10} md={10} sm={10} xs={10}></Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                        <img src={cross} onClick={() => onClose(false)} />
                    </Col>
                </Row>
                <Row className="modalContent">
                    {children}
                    <Col
                        lg={12}
                        md={12}
                        xs={12}
                        className="d-flex justify-content-center mt-2"
                    >

                    </Col>
                </Row>
            </Container>
        </div>
    );
};
