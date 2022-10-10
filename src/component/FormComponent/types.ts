import { ControllerRenderProps } from 'react-hook-form'

export interface CustomComponentProps extends Partial<ControllerRenderProps> {
    onChange: (...event: any[]) => void
}

export interface FormComponentProps<T> {
    onChange?: (...event: any[]) => void
    value?: T
}