import CustomInput from '../FormComponent/Input'

/**
 * 格式为
 * [type]: Component
 */
const fieldMap: Record<string, any> = {
    "Input": CustomInput
}

export const getField = (fieldType: string) => fieldMap[fieldType]