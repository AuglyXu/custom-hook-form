import React, { useMemo, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { FormProps, TriggerParams } from './types'
import { HookFormData, Validate, HookFormOutFunction } from '../types'
import FieldRender from './FieldRender'

const Form = forwardRef<HookFormOutFunction, FormProps>((props, ref) => {
    const { formFields, defaultFormData, customCalc, privateProps } = props;
    const { control, formState: { errors }, trigger, getValues, handleSubmit, reset, setValue } = useForm<HookFormData>({ defaultValues: defaultFormData });

    const validateResRef = useRef<Validate>({});

    const onSubmit = useMemo(() => {
        return handleSubmit((data: HookFormData) => {
            validateResRef.current.isError = false;
            validateResRef.current.res = data;
        }, (err) => {
            validateResRef.current.isError = true;
            validateResRef.current.res = err;
        });
    }, [handleSubmit]);

    /** 触发联动逻辑以及表单校验 */
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

    const inputRef = useRef<HookFormOutFunction>({
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