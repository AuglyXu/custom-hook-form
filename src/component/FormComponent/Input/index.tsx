import React, { forwardRef } from 'react'
import { CustomComponentProps } from '../type'

const CustomInput = forwardRef<any, CustomComponentProps>((props) => {
    return <input />
})

export default CustomInput