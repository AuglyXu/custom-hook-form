import { ValidateResult } from 'react-hook-form'
import { UseFormSetValue, UseFormGetValues, UseFormReset, UseFormUnregister } from 'react-hook-form'

export type ValidateFn = (val: any) => ValidateResult | Promise<ValidateResult>

type FormDataType = Record<string, any>

export type HookFormData = {
    [P in keyof FormDataType]: FormDataType[P]
}

export type Validate = Partial<{
    res: HookFormData,
    isError: boolean
}>

export type FormOutFunction = {
    reset: UseFormReset<HookFormData>
    getValues: UseFormGetValues<HookFormData>
    trigger: () => Promise<HookFormData> | HookFormData,
    setValue: UseFormSetValue<HookFormData>
    unregister: UseFormUnregister<HookFormData>
} | undefined

export type HookFormOutFunction = {
    reset: UseFormReset<HookFormData>,
    getValues: UseFormGetValues<HookFormData>,
    trigger: () => Promise<HookFormData> | HookFormData,
} | undefined

export interface CustomCalcType {
    key: string,
    value: any,
    formData: HookFormData
}