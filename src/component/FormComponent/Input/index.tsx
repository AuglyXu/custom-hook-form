import { forwardRef } from 'react'
import { CustomComponentProps } from '../types'

const CustomInput = forwardRef<any, CustomComponentProps>((props) => {
    const { value } = props;
    return <input value={value} {...props}/>
})

export default CustomInput