import { ReactNode } from 'react'
import { EachFields, TriggerParams } from '../HookForm/types'
import { Control, UseFormGetValues } from 'react-hook-form'

export interface FieldRenderProps {
    field: EachFields
    control: Control<HookFormData>
    errMsg: string | undefined
    getValues: UseFormGetValues<HookFormData>
    onTrigger: (params: TriggerParams) => Promise<void>
    privateProps?: HookFormData | undefined
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
