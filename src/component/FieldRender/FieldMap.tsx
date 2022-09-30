import CustomInput from '../FormComponent/Input'

const fieldMap: Record<string, any> = {
    "Input": CustomInput
}

export const getField = (fieldType: string) => fieldMap[fieldType]