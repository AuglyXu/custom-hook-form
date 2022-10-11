import { useRef } from 'react';
import { HookForm } from './../component/Form';
import { HookFormOutFunction } from './../component/Form/types'
import { Button, Typography } from '@mui/material';
import { Entry, Size } from '../component/FormComponent/types';

const formFields = [
    {
        type: 'TextField',
        name: 'test1',
        label: 'test1',
        required: true,
        property: {
            websize: Size.Half,
        }
    },
    {
        type: 'TransferList',
        name: 'test2',
        label: 'test2',
        required: true,
        property: {
            websize: Size.Half,
        }
    }
]

const privateProps = {
    'test2': {
        adornment: 'kg'
    }
}

/** 动态表单的自定义校验 */
function DynamicPropsFormDemo() {
    const formRef = useRef<HookFormOutFunction>()
    const handleSubmit = async () => {
        const res = await formRef.current?.trigger()
        console.log('校验通过', res)
    }

    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                基础表单——PrivateProps(针对自定义组件的特殊逻辑)
            </Typography>
            <HookForm
                ref={formRef}
                formFields={formFields}
                entry={Entry.NEW}
                privateProps={privateProps}
            />
            <Button variant="outlined" onClick={handleSubmit}>提交</Button>
        </>
    );
}

export default DynamicPropsFormDemo;
