import { useRef, useCallback } from 'react';
import { HookForm } from './../component/Form';
import { HookFormOutFunction, CustomCalcType, HookFormData } from './../component/Form/types'
import { Button, Typography } from '@mui/material';
import { Entry, Size } from '../component/FormComponent/types';

const formFields = [
    {
        type: 'TransferList',
        name: 'test6',
        label: 'test6',
        required: true,
        property: {
            websize: Size.Full,
        }
    }
]

/** 动态表单的自定义校验 */
function DynamicFormBasicDemo() {
    const formRef = useRef<HookFormOutFunction>()
    const handleSubmit = async () => {
        const { res, isError } = await formRef.current?.trigger() as { res: HookFormData, isError: boolean }
        if (!isError) {
            console.log('校验通过', res)
        }
    }

    const customCalc = useCallback(({ key, value, formData } : CustomCalcType) => {
        console.log(value)
        if(key === 'test4') {
            return {
                test5: value * 2
            }
        }
    },[])
    
    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                基础表单——渲染加部分联动逻辑
            </Typography>
            <HookForm
                ref={formRef}
                formFields={formFields}
                entry={Entry.NEW}
                customCalc={customCalc}
            />
            <Button variant="outlined" onClick={handleSubmit}>提交</Button>
        </>
    );
}

export default DynamicFormBasicDemo;
