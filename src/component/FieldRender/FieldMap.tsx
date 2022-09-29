import React from 'react'
import CustomInput from '../FormComponent/Input'

const fieldMap: Record<string, React.FC> = {
    "Input": CustomInput
}

export const getField = (fieldType: string) => fieldMap[fieldType]