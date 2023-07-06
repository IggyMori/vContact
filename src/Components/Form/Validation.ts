export type ValidationType = {
error: boolean,
 message: string
}

const setValidationValue = (
    isValid: boolean,
    name: string,
    message: string,
    setValidation : any,
    validation: any,
) => {
    if (isValid) {
        setValidation({
            ...validation,
            [name]: {
                error: false,
                message: message,
            },
        })
    } else {
        setValidation({
            ...validation,
            [name]: {
                error: true,
                message: message,
            },
        });
    }

}
export const validationHandler = (
        name: string,
        value: string,
        validation: any,
        setValidation: any,
) => {
    if (value === "") {
        setValidation({
            ...validation,
            [name]: {
                error: true,
                message: "Поле не должно быть пустым!",
            },
        });
    }else{
        switch (name){
            case "email":
                value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
                    ? setValidationValue(
                        true,
                        name,
                        "",
                        validation,
                        setValidation
                    )
                    : setValidationValue(
                        false,
                        name,
                        "Неверный формат Email!",
                        validation,
                        setValidation
                    );
                break;

            case "password":
                value.length >= 6
                ?
                    setValidationValue(
                        true,
                        name,
                        "",
                        validation,
                        setValidation
                    )
                    : setValidationValue(
                        false,
                        name,
                        "Должно быть не менее 6 символов",
                        validation,
                        setValidation
                    );

                break;
            case "phone":
                value.match(/^998\d{9}$/)
                    ?
                    setValidationValue(
                        true,
                        name,
                        "",
                        validation,
                        setValidation
                    )
                    : setValidationValue(
                        false,
                        name,
                        "Неверный формат номера",
                        validation,
                        setValidation
                    );
                break;

        }
    }
}