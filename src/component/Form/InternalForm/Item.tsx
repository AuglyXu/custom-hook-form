import { useMemo, cloneElement } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import FieldWrap from '../FieldWrap';
import { DEFAULT_ERR_MSG } from '../HookForm/validate';
import { FormContextType, FormItemProps } from './types';
import { CustomComponentProps } from '../../FormComponent/types'
import { HookFormData } from '../types';

function Item(props: FormItemProps) {
    const {
        required,
        name,
        label,
        hideLabel,
        validate,
        valuePropName,
        message = DEFAULT_ERR_MSG,
        children,
        renderChild,
        onChange: handleChange,
    } = props;

    const {
        control,
        errors,
        onChange: watchFn,
        trigger,
    } = useFormContext() as FormContextType;

    const rules: RegisterOptions<HookFormData> = useMemo(() => {
        if (validate) return { validate: (val) => validate(val) };
        if (required) return { validate: (val) => !!val ? undefined : message };
        return {}
    }, [message, required, validate]);

    const renderField = ({ field }: { field: CustomComponentProps }) => {
        const { onChange, onBlur, ref, value } = field;
        const propName = valuePropName ? valuePropName : 'value';
        let cd = cloneElement(children, {
            [propName]: value,
            ref,
            onChange: (...args: any[]) => {
                if (typeof handleChange === 'function') {
                    handleChange(...args);
                }
                if (typeof watchFn === 'function') {
                    watchFn(name, ...args);
                }
                onChange(...args);
                trigger && trigger(name);
            },
            onBlur,
        });

        if (typeof renderChild === 'function') cd = renderChild(cd);

        return (
            <FieldWrap
                errMsg={errors?.[name]?.message as string}
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
