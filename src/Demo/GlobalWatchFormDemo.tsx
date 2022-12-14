import { useRef } from 'react';
import Form from './../component/Form';
import { FormOutFunction, HookFormData } from './../component/Form/types'
import { TextField, Button, Typography, RadioGroup, FormControlLabel, Radio, Switch } from '@mui/material';

function GlobalWatchFormDemo() {
    const formRef = useRef<FormOutFunction>()
    const handleSubmit = async () => {
        const { res, isError } = await formRef.current?.trigger() as { res: HookFormData, isError: boolean }
        if (!isError) {
            console.log('校验通过', res)
        }
    }
    return (
        <>
            <Typography variant="subtitle1" gutterBottom>
                全局表单的监听
            </Typography>
            <Form ref={formRef} onChange={(name, ...rest) => {
                if (name === 'test4') {
                    const value = rest[0].target.checked
                    console.log(name, "改变了", value)

                }
                else {
                    console.log(name, "改变了", rest[0].target.value)
                }
            }}>
                <Form.Item name="test1" required label='有label带校验'>
                    <TextField size='small' />
                </Form.Item>
                <Form.Item name="test2" required label='test2' hideLabel>
                    <TextField size='small' />
                </Form.Item>
                <Form.Item label="单选框" required={false} name="test3">
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </Form.Item>
                <Form.Item label="表单值不从value属性上拿" required={true} name="test4" valuePropName='checked'>
                    <FormControlLabel
                        control={
                            <Switch name="gilad" />
                        }
                        label="Gilad Gray"
                    />
                </Form.Item>
            </Form>
            <Button variant="outlined" onClick={handleSubmit}>提交</Button>
        </>
    );
}

export default GlobalWatchFormDemo;
