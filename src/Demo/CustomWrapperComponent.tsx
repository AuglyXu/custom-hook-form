import { useRef } from 'react';
import Form from '../component/Form';
import { FormOutFunction } from '../component/Form/types'
import { Button, Typography, TextField } from '@mui/material';

/** 表单组件非直接包裹 */
function CustomLayout() {
    const formRef = useRef<FormOutFunction>()
    const handleSubmit = async () => {
        const res = await formRef.current?.trigger()
        console.log('校验通过', res)
    }
    const changeValue = () => {
        formRef.current?.setValue('test1', 111)
    }
    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                需要被div包裹的Form, 可以手动设置value
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                表单组件需要直接被Form.Item包裹，如果没有被直接包裹，Form.Item上使用renderChild
            </Typography>
            <Form ref={formRef}>
                <Form.Item name="test1" required label='有label带校验' renderChild={(child) => (
                    <div>
                        包裹着表单组件的div
                        {child}
                    </div>
                )}>
                    <TextField size='small' />
                </Form.Item>
            </Form>
            <Button onClick={changeValue} style={{ marginRight: 30 }}>手动改变value值为111</Button>
            <Button variant="outlined" onClick={handleSubmit}>提交</Button>
        </>
    );
}

export default CustomLayout;
