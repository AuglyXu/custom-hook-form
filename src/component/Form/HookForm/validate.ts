import { FormFields, EachFields, ValidateMap, ValidateMapType } from './types'
import { validate } from '../../FormComponent/validate';

interface FormMap {
    FORM: Array<EachFields>
}

export const DEFAULT_ERR_MSG = '该项为必填项';

/**
 * formMap: {
 *     FORM: [field1, field2]
 * }
 * @param fields 动态表单
 * @returns 表单Map
 */
export const getForms = (fields: FormFields) => {
    if (!fields?.length) return {};
    const formMap: FormMap = {
        FORM: [],
    };
    fields.forEach(field => {
        formMap.FORM.push(field);
    });
    return formMap;
};

/** 获取校验类型 */
export const getValidateType = (type: string) => {
    return type;
};

/** 普通校验 */
export const normalValidate = (value: any) => {
    if (Array.isArray(value)) return (value.length ? undefined : DEFAULT_ERR_MSG);
    return (value !== null && value !== undefined && value !== '') ? undefined : DEFAULT_ERR_MSG;
};

/** 最大长度校验 */
export const maxLengthValidate = (maxLength: number) => (value: any) => value?.length < maxLength ? undefined : `最多只能输入${maxLength}个字`;

export const getValidateMap = (formFields: FormFields): { validate: ValidateMap } => {
    /**
     * map数据结构
     * map: {
     *     [name]: [validateFunction]
     * }
     */
    const _map: ValidateMap = {}; // 校验方法
    formFields.forEach(({ property, name, type, required }) => {
        if (required) {
            if (typeof property.validate === 'function') {
                _map[name] = [property.validate];
            }
            else { // 组件特有校验逻辑
                const key = `${getValidateType(type)}`;
                if (key in validate) {
                    _map[name] = [validate[key](property)];
                }
                else _map[name] = [normalValidate];
            }
            // property其他校验逻辑
            if (property.maxLength) {
                _map[name].push(maxLengthValidate(property.maxLength));
            }
        }
    });
    return {
        validate: _map,
    };
};

/**
 *
 * @param {*} validateMap 通过 getValidateMap 获取
 * @returns function
 */
export const validateForm = (validateMap: ValidateMapType) => (value: any) => {
    const { validate: _validate } = validateMap;
    const keys = Object.keys(_validate || {});
    return keys.every(name => _validate[name].every(validateFn => {
        const msg = validateFn(value[name]);
        if (msg) console.warn('FORM', name, validateFn); // eslint-disable-line
        return !msg;
    }));
};

export default validate;
