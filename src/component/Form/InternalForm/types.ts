import { CustomComponentProps } from './../../FormComponent/types';
import { ValidateFn } from "../types"
import { HookFormData } from '../types'
import { UseFormReturn, FieldErrors } from 'react-hook-form'

export interface FormProps {
    children: React.ReactNode
    defaultFormData?: HookFormData
    onChange?: (name: string, ...arg: any[]) => any
    needWrap?: boolean
    style?: Record<string, any>
    shrink?: boolean // 是否需要边距
    renderSubmitButton?: (object: { isDirty: boolean, isValid: boolean }) => React.ReactNode
}

export interface FormItemProps {
    children: React.ReactElement<CustomComponentProps>,
    required?: boolean
    name?: string
    renderChild?: (callback: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => React.ReactElement<any>,
    label?: string
    hideLabel?: boolean
    validate?: ValidateFn
    valuePropName?: string
    message?: string
    onChange?: (...rest: any[]) => any
    customValidateKey?: Array<string>
    outerStyle?: Record<string, any>
    customErrorText?: boolean
}

export type FormContextType = UseFormReturn<HookFormData> & {
    onChange: (name: string, ...arg: any[]) => any
    errors: FieldErrors<HookFormData>
    shrink?: boolean
}