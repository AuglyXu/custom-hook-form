import { useRef } from 'react';
import Form from './../component/Form';
import { FormOutFunction } from './../component/Form/types'
import { TextField, Button, Typography } from '@mui/material';
import TransferList from './../component/FormComponent/TransferList'

function CustomValidateDemo() {
    const formRef = useRef<FormOutFunction>()
    const handleSubmit = async () => {
        const res = await formRef.current?.trigger()
        console.log('校验通过', res)
    }
    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                自定义校验的表单
            </Typography>
            <Form ref={formRef}>
                <Form.Item
                    name="testCustomValidate"
                    required
                    label='自定义校验——电话'
                    validate={(value) => {
                        if(!value) return '请填写电话号码'
                        if(!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)){
                            return '请输入正确的电话号码'
                        }
                    }}
                >
                    <TextField size='small' />
                </Form.Item>
            </Form>
            <Button variant="outlined" onClick={handleSubmit}>提交</Button>
        </>
    );
}

export default CustomValidateDemo;
