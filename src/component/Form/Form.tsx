import React, { useMemo, useContext, cloneElement } from 'react';
import { Controller } from 'react-hook-form';
import FormContext from './context';
import FieldWrap from '../FieldRender/FieldWrap';
import { DEFUALT_ERR_MSG } from '../HookForm/validate';

function Item(props) {
    const {
        required,
        name,
        label,
        hideLabel,
        validate,
        valuePropName,
        message = DEFUALT_ERR_MSG,
        children,
        renderChild,
        onChange: handleChange,
    } = props;

    const {
        control,
        errors,
        onChange: watchFn,
        trigger,
    } = useContext(FormContext);

    const rules = useMemo(() => {
        if (validate) return { validate: (val) => validate(val) };
        if (required) return { validate: (val) => !!val ? undefined : message };
    }, [message, required, validate]);

    const renderField = ({ field }) => {
        const { onChange, onBlur, ref, value } = field;
        const propName = valuePropName ? valuePropName : 'value';
        let cd = cloneElement(children, {
            [propName]: value,
            ref,
            onChange: (...args) => {
                if (typeof handleChange === 'function') {
                    handleChange(...args);
                }
                if (typeof watchFn === 'function') {
                    watchFn(name, ...args);
                }
                onChange(...args);
                trigger(name);
            },
            onBlur,
        });

        if (typeof renderChild === 'function') cd = renderChild(cd);

        return (
            <FieldWrap
                errMsg={errors[name]?.message}
                hideLabel={hideLabel}
                label={label}
                required={required}
            >
                {cd}
            </FieldWrap>);
    };

    return (!name ?
        <FieldWrap
            label={label}
            required={required}
            errMsg={errors[name]?.message}
            hideLabel={hideLabel}
        >
            {children}
        </FieldWrap> :
        <Controller
            control={control}
            name={name}
            render={renderField}
            rules={rules}
        />);
}

export default Item;
