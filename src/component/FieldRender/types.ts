import { ReactNode } from 'react'
import { EachFields, InputType, TriggerParams } from './../Form/types'
import { Control, UseFormGetValues } from 'react-hook-form'

export interface FieldRenderProps {
    field: EachFields
    control: Control<InputType>
    errMsg: string | undefined
    getValues: UseFormGetValues<InputType>
    onTrigger: (params: TriggerParams) => Promise<void>
    privateProps?: InputType | undefined
    outerStyle?: Record<string, any>
}

export interface FieldWrapProps {
    label: ReactNode
    required: boolean
    outerStyle: Record<string, any>
    children: ReactNode
    errMsg: string | undefined
    hideLabel: boolean | undefined
}

export type ValidateFn = (val: any) => string | void