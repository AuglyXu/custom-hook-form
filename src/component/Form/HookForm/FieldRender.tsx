import React, { useCallback } from 'react'
import { Controller, RegisterOptions } from 'react-hook-form'
import FieldWrap from './../FieldWrap'
import { FieldRenderProps } from '../FieldWrap/types'
import { ValidateFn, HookFormData } from '../types'
import { getField } from './../../FormComponent/FieldMap'
import validateMap, { normalValidate } from '../HookForm/validate';

const FieldRender: React.FC<FieldRenderProps> = (props) => {
    const { field: { type: fieldType, property, name }, errMsg, control, privateProps, outerStyle, onTrigger } = props

    const { label, required, hideLabel } = property

    const Field = getField(fieldType)

    const getRules = useCallback(() => {
        const { maxLength, maxSelectLength, required } = property;
        let rules: RegisterOptions<HookFormData> = {};
        if (maxLength) {
            rules.maxLength = {
                value: maxLength,
                message: `最多只能输入${maxLength}个字`
            };
        }
        const ruleArr: Array<ValidateFn> = [];
        if (required) {
            if (fieldType in validateMap) {
                ruleArr.push(validateMap[fieldType](property));
            }
            else ruleArr.push(normalValidate);
        }
        if (maxSelectLength) {
            ruleArr.push((val) => {
                if (val?.length > maxSelectLength) {
                    return `选择不能超过${maxSelectLength}个`;
                }
            });
        }
        if (privateProps?.customRule) {
            ruleArr.push(privateProps.customRule);
        }
        if (ruleArr.length) {
            rules.validate = (val) => {
                for (const fn of ruleArr) {
                    const msg = fn(val);
                    if (msg) return msg;
                }
            };
        }
        return rules;
    }, [property, privateProps, fieldType]);

    return (
        <Controller
            control={control}
            name={name}
            rules={getRules()}
            render={({ field: { onChange, onBlur, value, ref } }) => {
                return (
                    <FieldWrap
                        errMsg={errMsg}
                        label={label}
                        outerStyle={outerStyle || {}}
                        required={required}
                        hideLabel={hideLabel}
                    >
                        <Field
                            onBlur={onBlur}
                            // onChange={changeFn}
                            /** onChange
                             * @param {object} val 更改后的值
                             * @param {boolean} needFormTrigger 是否触发表单校验
                             * @param {boolean} needTrigger 是否触发表单联动、计算公式等逻辑
                             */
                            onChange={(val: any, needTrigger = true) => {
                                onChange(val);
                                needTrigger && onTrigger(
                                    {
                                        key: name,
                                        value: val,
                                        needFormTrigger: needTrigger, // 需要触发表单校验
                                        oldValue: value
                                    }
                                );
                            }}
                            ref={ref}
                            value={value}
                        />
                    </FieldWrap>
                )
            }}
        />

    )
}

export default FieldRender