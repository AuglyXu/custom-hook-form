import { ReactNode } from 'react'

export interface FieldWrapProps {
    label: ReactNode
    required: boolean
    children: ReactNode
    errMsg?: string | undefined
    hideLabel?: boolean | undefined
    outerStyle?: Record<string, any>
}
