enum Size {
    Half = 0.5,
    Full = 1
}

interface Property {
    websize: Size,
    placeholder?: string,
    label: string,
    required: boolean,
}

export interface EachFields {
    type: string,
    name: string,
    property: Property
}

export interface EachError {
    message: string,
}

type FormFields = Array<EachFields>

type FormData = Record<string, any>

export type InputType = {
    [P in keyof FormData]: FormData[P]
}

export type ErrorType = {
    [P in keyof FormData]: EachError
}

export interface FormProps {
    formFields: FormFields
    defaultFormData: FormData
    customCalc: (customObj: { key: string, value: any, formData: InputType }) => InputType
}


export type Validate = Partial<{
    res: InputType,
    isError: boolean
}>

export type OutFunction = {
    reset: () => void,
    getValues: () => InputType,
    trigger: () => Promise<InputType> | InputType
}

export interface TriggerParams {
    key: string,
    value: any,
    oldValue: any,
    needFormTrigger: boolean
}