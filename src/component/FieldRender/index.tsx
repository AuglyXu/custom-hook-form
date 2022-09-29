import React from 'react'
import { Controller } from 'react-hook-form'
import FieldWrap from './FieldWrap'
import { FieldRenderProps } from './types'
import { getField } from './FieldMap'

const FieldRender: React.FC<FieldRenderProps> = (props) => {
    const { field: { type: fieldType, property, name }, errMsg, getValues, control } = props

    const Field = getField(fieldType)

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const { onChange, onBlur, value, ref } = field;
                return (
                    <FieldWrap>
                        <Field
                            onBlur={onBlur}
                            // onChange={changeFn}
                            /** onChange
                             * @param {object} val 更改后的值
                             * @param {boolean} needFormTrigger 是否触发表单校验
                             * @param {boolean} needTrigger 是否触发表单联动、计算公式等逻辑
                             */
                            onChange={(val, needTrigger = true) => {
                                onChange(val);
                                needTrigger && onTrigger(
                                    {
                                        key: identifier,
                                        value: val,
                                        oldValue: value,
                                        needFormTrigger, // 需要触发表单校验
                                    }
                                );
                            }}
                            ref={ref}
                            value={value}
                            // {...getProps()}
                        />
                    </FieldWrap>
                )
            }}
        />

    )
}

export default FieldRender