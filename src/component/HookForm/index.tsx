import React, { useMemo, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { FormProps, InputType, Validate, OutFunction, TriggerParams } from './types'
import FieldRender from '../FieldRender'

const Form = forwardRef<OutFunction, FormProps>((props, ref) => {
    const { formFields, defaultFormData, customCalc, privateProps } = props;
    const { control, formState: { errors }, trigger, getValues, handleSubmit, reset, setValue } = useForm<InputType>({ defaultValues: defaultFormData });

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
        const { key, value, needFormTrigger = true } = triggerParams;
        let customRes;
        if (typeof customCalc === 'function') {
            customRes = await customCalc({
                key,
                value,
                formData: getValues()
            })
        }
        const res = { ...customRes }
        Object.keys(res).forEach(k => {
            setValue(k, res[k])
        })
        if (needFormTrigger) trigger(key)
    }, [getValues, setValue, trigger, customCalc])

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
                                errMsg={errors[name]?.message as string | undefined}
                                field={field}
                                getValues={getValues}
                                onTrigger={onTrigger}
                                privateProps={privateProps?.[name]}
                            />
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
        : null
})

export default Form