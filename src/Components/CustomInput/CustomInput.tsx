import { Form } from "react-bootstrap";
export const CustomInput = (props) => {
    return (
        <>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                className={props.className}
                style={{ borderColor: props.error === true ? "red" : "#ced4da" }}
                type={props.type}
                name={props.name}
                onChange={props.onChange}
                placeholder={props.placeholder}
                disabled={props.disabled}
                maxLength={props.maxLength}
                value={props.value}
                onBlur={props.onBlur}
                required={props.required}
            />
        </>
    );
};
