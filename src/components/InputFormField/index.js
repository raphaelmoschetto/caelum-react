import React from 'react';

const InputFormField = ({
    id,
    label,
    error,
    value,
    touched,
    onChange,
    onBlur,
    type,
}) => {
    const isTouched = !!touched[id];
    const hasErrors = !!error[id];
    return (
        <div className="loginPage__inputWrap">
            <label className="loginPage__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="loginPage__input"
                type={type || "text"}
                id={id}
                name={id}
                value={value[id]}
                onChange={onChange}
                onBlur={onBlur}
            />
            <p style={{ color: "red" }}>
                {isTouched && hasErrors && error[id]}
            </p>
        </div>
    );
}

export default InputFormField;