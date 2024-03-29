import React, { useState, useEffect, Fragment } from 'react';

const FormManager = ({ children, initialValues, onFormValidation }) => {
    const [values, setValues] = useState({ ...initialValues });
    const [errors, setErrors] = useState({ ...initialValues });
    const [touched, setTouched] = useState({ ...initialValues });

    useEffect(() => {
        setErrors(onFormValidation(values))
    }, [onFormValidation, values]);

    const onFormFieldChange = ({ target }) => {
        const value = target.value;
        const name = target.name;
        const updatedValues = { ...values, [name]: value };
        setValues(updatedValues);
    };

    const onFormFieldBlur = ({ target }) => {
        setTouched({ ...touched, [target.name]: true })
    };

    return (
        <Fragment>
            {children && 
                children({
                    values,
                    errors,
                    touched,
                    onFormFieldChange,
                    onFormFieldBlur,
                })}
        </Fragment>
    );
};

export default FormManager;