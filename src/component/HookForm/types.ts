import { UseFormGetValues, UseFormReset } from 'react-hook-form'
import { ValidateFn } from '../FieldRender/types';

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

type FormData = Record<string, any>

export type InputType = {
    [P in keyof FormData]: FormData[P]
}

export interface EachPrivateProps {
    customRule: (val: any) => string | undefined
}


export interface FormProps {
    formFields: FormFields
    defaultFormData: FormData
    customCalc?: (customObj: { key: string, value: any, formData: InputType }) => InputType
    privateProps?: Record<any, any>
}


export type Validate = Partial<{
    res: InputType,
    isError: boolean
}>

export type OutFunction = {
    reset: UseFormReset<InputType>,
    getValues: UseFormGetValues<InputType>,
    trigger: () => Promise<InputType> | InputType,
} | undefined

export interface TriggerParams {
    key: string,
    value: any,
    oldValue: any,
    needFormTrigger: boolean
}