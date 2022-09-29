import React, { useMemo, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormProps, InputType, Validate, OutFunction, ErrorType, TriggerParams } from './types'
import FieldRender from './../FieldRender'

const Form = forwardRef<OutFunction, FormProps>((props, ref) => {
    const { formFields, defaultFormData, customCalc } = props;
    const { control, formState: { errors }, trigger, getValues, handleSubmit, register, reset } = useForm({ defaultValues: defaultFormData });

    const validateResRef = useRef<Validate>({});

    const onSubmit = useMemo(() => {
        return handleSubmit((data: InputType) => {
            validateResRef.current.isError = false;
            validateResRef.current.res = data;
        }, (err) => {
            validateResRef.current.isError = true;
            validateResRef.current.res = err;
        });
    }, [handleSubmit]);

    const onTrigger = useCallback(async (triggerParams: TriggerParams) => {
        const { key, value, oldValue, needFormTrigger = true } = triggerParams;
        let customRes;
        if(typeof customCalc === 'function'){
            customRes = await customCalc({
                key,
                value,
                formData: getValues()
            })
        }
    }, [])

    const inputRef = useRef<OutFunction>({
        trigger: async () => {
            await onSubmit();
            const { res, isError } = validateResRef.current;
            if (isError) {
                return Promise.reject(res);
            }
            return res;
        },
        getValues,
        reset,
    })

    useImperativeHandle(ref, () => inputRef.current, []);

    return formFields ?
        <React.Fragment>
            {
                formFields.map((field, i) => {
                    const { name } = field;
                    return (
                        <React.Fragment key={name}>
                            <FieldRender
                                control={control}
                                errMsg={errors[name]?.message}
                                field={field}
                                getPopupContainer={getPopupContainer}
                                getValues={getValues}
                                heighestCurrency={heighestCurrency}
                                onTrigger={onTrigger}
                                privateProps={privateProps?.[identifier]}
                                setWatch={setWatch}
                            />
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
        : null
})

export default Form