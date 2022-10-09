import { ReactNode } from 'react'
import { EachFields, InputType, TriggerParams } from '../HookForm/types'
import { Control, UseFormGetValues, ValidateResult } from 'react-hook-form'

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
    children: ReactNode
    errMsg?: string | undefined
    hideLabel?: boolean | undefined
    outerStyle?: Record<string, any>
}

export type ValidateFn = (val: any) => ValidateResult | Promise<ValidateResult>