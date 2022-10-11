import { useRef } from 'react';
import Form from './../component/Form';
import { FormOutFunction } from './../component/Form/types'
import { Button, Typography } from '@mui/material';
import TransferList from '../component/FormComponent/TransferList';

/** 自定义组件 */
function CustomFormComponent() {
    const formRef = useRef<FormOutFunction>()
    const handleSubmit = async () => {
        const res = await formRef.current?.trigger()
        console.log('校验通过', res)
    }
    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                自定义表单组件
            </Typography>
            <Form ref={formRef}>
                <Form.Item
                    name="transfer"
                    required
                    label='统计右穿梭框的数据'
                >
                    <TransferList />
                </Form.Item>
            </Form>
            <Button variant="outlined" onClick={handleSubmit}>提交</Button>
        </>
    );
}

export default CustomFormComponent;
