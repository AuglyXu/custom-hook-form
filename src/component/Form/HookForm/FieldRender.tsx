import React, { useCallback, useMemo } from 'react'
import { Controller, RegisterOptions } from 'react-hook-form'
import FieldWrap from './../FieldWrap'
import { FieldRenderProps } from './types'
import { ValidateFn, HookFormData } from '../types'
import { getField } from './../../FormComponent/FieldMap'
import validateMap, { normalValidate } from '../HookForm/validate';
import { Grid } from '@mui/material'

const FieldRender: React.FC<FieldRenderProps> = (props) => {
    const { field: { type: fieldType, property, name, label, required, hideLabel }, errMsg, control, privateProps, outerStyle, onTrigger, publicProps, entry } = props

    const Field = getField(fieldType)

    const getRules = useCallback(() => {
        const { maxLength, maxSelectLength } = property;
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
    }, [property, privateProps, fieldType, required]);

    const getProps = useCallback(() => {
        return {
            entry, // 新建为new，编辑为edit
            readOnly: property.isFieldReadOnly,
            ...publicProps, // 公共属性
            ...property, // 表单配置里面的属性
            ...privateProps, // 私有属性
        };
    }, [publicProps, property, privateProps, onTrigger]); // eslint-disable-line

    const node = useMemo(() => {
        const propName = property.valuePropName || 'value'
        return (
            Field ? (
                <Controller
                    control={control}
                    name={name}
                    rules={getRules()}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                        return (
                            <FieldWrap
                                errMsg={errMsg}
                                label={label}
                                outerStyle={outerStyle}
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
                                    onChange={(changeObj: any, needTrigger = true) => {

                                        // 是 e.target.value 或者 value
                                        const val = (typeof changeObj === 'object' && changeObj.target) ? changeObj.target[propName] : changeObj
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
                                    {...getProps()}
                                    {...{ [propName]: value }}
                                />
                            </FieldWrap>
                        )
                    }}
                />
            ) : null
        )
    }, [Field, control, errMsg, getRules, hideLabel, label, name, onTrigger, outerStyle, required, getProps, property])

    return useMemo(() => (
        node ? (
            <Grid item={true} xs={property.websize === 0.5 ? 6 : 12}>
                {node}
            </Grid>
        ) : null
    ), [node, property])
}

export default FieldRender