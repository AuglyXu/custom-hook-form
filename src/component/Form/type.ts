import { ValidateFn } from "../FieldRender/types"
import { InputType } from './../HookForm/types'
import { UseFormSetValue, UseFormGetValues, UseFormReset, UseFormUnregister, UseFormReturn, FieldErrors } from 'react-hook-form'

export interface FormProps {
    children: React.ReactElement<any>
    defaultFormData?: InputType
    onChange?: (name: string, ...arg: any[]) => any
    needWrap?: boolean
    style?: Record<string, any>
}

export interface FormItemProps {
    required: boolean
    name: string
    children: React.ReactElement<any>,
    renderChild?: (callback: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => React.ReactElement<any>,
    label?: string
    hideLabel?: boolean
    validate?: ValidateFn
    valuePropName?: string
    message?: string
    onChange?: (...rest: any[]) => any
}

export type FormOutFunction = {
    reset: UseFormReset<InputType>
    getValues: UseFormGetValues<InputType>
    trigger: () => Promise<InputType> | InputType,
    setValue: UseFormSetValue<InputType>
    unregister: UseFormUnregister<InputType>
} | undefined

export type FormContextType = UseFormReturn<InputType> & {
    onChange: (name: string, ...arg: any[]) => any
    errors: FieldErrors<InputType>
}