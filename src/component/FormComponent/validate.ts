import { Property, CustomValidateMap } from './../Form/HookForm/types'

export const validate: CustomValidateMap = {
    // 自定义校验
    TransferList: (property: Property) => (value: any) => {
        if(!value || !value.length) return '该项为必填项'
        if(!value.includes(0)){
            return '必须选中item1'
        }
    }
};