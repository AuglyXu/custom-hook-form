import { forwardRef } from 'react'
import { CustomComponentProps } from '../types'

const CustomInput = forwardRef<any, CustomComponentProps>((props) => {
    return <input />
})

export default CustomInput