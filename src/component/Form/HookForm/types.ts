import { ReactNode } from 'react'
import { Control, UseFormGetValues } from 'react-hook-form'
import { ValidateFn, HookFormData } from '../types';
import { Size, Entry } from './../../FormComponent/types';

export interface ValidateMap {
    [propName: string]: Array<ValidateFn>;
}

export type ValidateMapType = { validate: ValidateMap }

export type enhanceValidateFn = (property: Property) => ValidateFn

export interface Property {
    websize: Size
    isFieldReadOnly?: boolean,
    placeholder?: string
    maxLength?: number
    maxSelectLength?: number
    hideLabel?: boolean
    validate?: ValidateFn | Record<string, enhanceValidateFn>
    valuePropName?: string
}

export type CustomValidateMap = Record<string, enhanceValidateFn>
export interface EachFields {
    type: string
    name: string
    label: ReactNode
    required: boolean
    property: Property
    hideLabel?: boolean
}

export type FormFields = Array<EachFields>

export interface EachPrivateProps {
    customRule: (val: any) => string | undefined
}

export interface FormProps {
    formFields: FormFields
    entry: Entry,
    defaultFormData?: HookFormData
    customCalc?: (customObj: { key: string, value: any, formData: HookFormData }) => HookFormData | undefined
    privateProps?: Record<any, any>
    publicProps?: Record<any, any>
}

export interface TriggerParams {
    key: string,
    value: any,
    oldValue: any,
    needFormTrigger: boolean
}

export interface FieldRenderProps {
    field: EachFields
    control: Control<HookFormData>
    errMsg: string | undefined
    getValues: UseFormGetValues<HookFormData>
    onTrigger: (params: TriggerParams) => Promise<void>
    entry: Entry,
    privateProps?: HookFormData | undefined
    publicProps?: HookFormData | undefined
    outerStyle?: Record<string, any>
}
