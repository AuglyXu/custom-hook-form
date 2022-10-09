import React, { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { InputType, Validate } from '../HookForm/types';
import { FormOutFunction, FormProps } from './type';
import styles from './Form.module.less'

const InternalForm: React.ForwardRefRenderFunction<FormOutFunction, FormProps> = (props, ref) => {
    const {
        defaultFormData,
        children,
        onChange,
        needWrap,
        style
    } = props;

    const {
        control,
        formState: { errors },
        trigger,
        getValues,
        setValue,
        handleSubmit,
        reset,
        unregister,
    } = useForm({ defaultValues: defaultFormData });

    const validateResRef = useRef<Validate>({});

    const contextValue: UseFormReturn<InputType, any> = useMemo(() => ({
        errors,
        control,
        trigger,
        onChange,
    }) as unknown as UseFormReturn<InputType, any>, [control, errors, onChange, trigger]);

    const onSubmit = useMemo(() => {
        return handleSubmit((data) => {
            validateResRef.current.isError = false;
            validateResRef.current.res = data;
        }, (err) => {
            validateResRef.current.isError = true;
            validateResRef.current.res = err;
        });
    }, [handleSubmit]);

    const formRef = useRef<FormOutFunction>({
        trigger: async () => {
            await onSubmit();
            const { res, isError } = validateResRef.current;
            console.log(res, isError)
            if (isError) {
                return Promise.reject(res);
            }
            return res;
        },
        getValues,
        setValue,
        reset,
        unregister,
    })

    useImperativeHandle(ref, () => formRef.current, []);

    return (
        <FormProvider {...contextValue}>
            {needWrap ?
                <div
                    className={styles['form-wrap']}
                    style={style}
                >
                    {children}
                </div>
                : children
            }
        </FormProvider>);
}

const Form = forwardRef<FormOutFunction, FormProps>(InternalForm);

export default Form;

