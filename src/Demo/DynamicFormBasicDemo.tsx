import { useRef, useCallback } from 'react';
import { HookForm } from './../component/Form';
import { HookFormOutFunction, CustomCalcType } from './../component/Form/types'
import { Button, Typography } from '@mui/material';
import { Entry, Size } from '../component/FormComponent/types';

const formFields = [
    {
        type: 'TextField',
        name: 'test1',
        label: 'test1',
        required: false,
        property: {
            websize: Size.Half,
        }
    },
    {
        type: 'TextField',
        name: 'test2',
        label: 'test2 readOnly',
        required: false,
        property: {
            websize: Size.Half,
            InputProps: {
                readOnly: true,
            }
        }
    },
    {
        type: 'TextField',
        name: 'test3',
        required: false,
        label: 'test3',
        property: {
            websize: Size.Full,
        }
    },
    {
        type: 'TextField',
        name: 'test4',
        required: true,
        label: 'test4',
        property: {
            websize: Size.Half,
        }
    },
    {
        type: 'TextField',
        name: 'test5',
        label: 'test4 * 2',
        required: true,
        property: {
            websize: Size.Half,
        }
    },
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

/** 动态表单Demo */
function DynamicFormBasicDemo() {
    const formRef = useRef<HookFormOutFunction>()
    const handleSubmit = async () => {
        const res = await formRef.current?.trigger()
        console.log('校验通过', res)
    }

    const customCalc = useCallback(({ key, value, formData }: CustomCalcType) => {
        if (key === 'test4') {
            return {
                test5: value * 2
            }
        }
    }, [])

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
