export type ValidationType = {
error: boolean,
 message: string
}

export const validationHandler = (
        name: string,
        value: string,
        validation: any,
        setValidation: (arg: any) => void,
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
                    ?
                    setValidation({
                        ...validation,
                        [name]: {
                            error: false,
                            message: '',
                        },
                    })
                    :
                    setValidation({
                        ...validation,
                        [name]: {
                            error: true,
                            message: "Неверный формат Email!",
                        },
                    })

                break;

            case "password":
                value.length >= 6
                ?
                    setValidation({
                        ...validation,
                        [name]: {
                            error: false,
                            message: '',
                        },
                    })
                    :
                    setValidation({
                        ...validation,
                        [name]: {
                            error: true,
                            message: "Должно быть не менее 6 символов",
                        },
                    })

                break;
            case "phone":
                value.match(/^998\d{9}$/)
                    ?

                    setValidation({
                        ...validation,
                        [name]: {
                            error: false,
                            message: '',
                        },
                    })
                    :
                    setValidation({
                        ...validation,
                        [name]: {
                            error: true,
                            message: "Неверный формат номера",
                        },
                    })
                break;

        }
    }
}