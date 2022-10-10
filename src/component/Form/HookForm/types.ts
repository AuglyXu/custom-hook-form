import { ValidateFn, HookFormData } from '../types';
import { Control, UseFormGetValues } from 'react-hook-form'

enum Size {
    Half = 0.5,
    Full = 1
}

export interface ValidateMap {
    [propName: string]: Array<ValidateFn>;
}

export type ValidateMapType = { validate: ValidateMap }

export type enhanceValidateFn = (property: Property) => ValidateFn

export interface Property {
    websize: Size
    label: string
    required: boolean
    placeholder?: string
    maxLength?: number
    maxSelectLength?: number
    hideLabel?: boolean
    validate?: ValidateFn | Record<string, enhanceValidateFn>
}

export type CustomValidateMap = Record<string, enhanceValidateFn>

export interface EachFields {
    type: string
    name: string
    property: Property
}

export type FormFields = Array<EachFields>

export interface EachPrivateProps {
    customRule: (val: any) => string | undefined
}

export interface FormProps {
    formFields: FormFields
    defaultFormData: HookFormData
    customCalc?: (customObj: { key: string, value: any, formData: HookFormData }) => HookFormData
    privateProps?: Record<any, any>
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
    privateProps?: HookFormData | undefined
    outerStyle?: Record<string, any>
}
