import { Property, CustomValidateMap } from './../Form/HookForm/types'

export const validate: CustomValidateMap = {
    // 自定义校验
    CustomInput: (property: Property) => (value: any) => {
        if (value !== '1') {
            return '输入的值不为1'
        }
    }
};