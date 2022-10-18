import React, { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { HookFormData, Validate, FormOutFunction } from '../types';
import { FormProps } from './types';
import { withStyles, WithStyles } from '@mui/styles'
import styles from './FormStyle'


interface InternalFormProps extends WithStyles<typeof styles>, FormProps {
}

const InternalForm: React.ForwardRefRenderFunction<FormOutFunction, InternalFormProps> = (props, ref) => {
    const {
        defaultFormData,
        children,
        onChange,
        needWrap,
        style,
        classes,
        shrink, // 取消 label 间边距以及每个 Form.Item 的边距
        renderSubmitButton
    } = props;

    const {
        control,
        formState: { errors, isDirty, isValid },
        trigger,
        getValues,
        setValue,
        handleSubmit,
        reset,
        unregister,
    } = useForm({ defaultValues: defaultFormData });

    const validateResRef = useRef<Validate>({});

    const contextValue: UseFormReturn<HookFormData, any> = useMemo(() => ({
        errors,
        control,
        trigger,
        onChange,
        shrink
    }) as unknown as UseFormReturn<HookFormData, any>, [control, errors, onChange, trigger, shrink]);

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
            return validateResRef.current;
        },
        getValues,
        setValue,
        reset,
        unregister
    })


    useImperativeHandle(ref, () => formRef.current, []);

    return (
        <FormProvider {...contextValue}>
            {needWrap ?
                <div
                    className={classes['formWrap']}
                    style={style}
                >
                    {children}
                </div>
                : children
            }
            { renderSubmitButton && renderSubmitButton({ isValid, isDirty }) }
        </FormProvider>);
}

const Form = withStyles(styles)(forwardRef<FormOutFunction, InternalFormProps>(InternalForm));

export default Form;
