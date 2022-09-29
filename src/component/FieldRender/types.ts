import { EachFields, InputType } from './../Form/types'
import { Control, UseFormGetValues } from 'react-hook-form'

export interface FieldRenderProps {
    field: EachFields
    control: Control<InputType>,
    errMsg: string | undefined,
    getValues: UseFormGetValues<InputType>
}