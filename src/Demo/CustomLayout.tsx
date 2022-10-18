import { useRef } from 'react';
import Form from '../component/Form';
import { FormOutFunction, HookFormData } from '../component/Form/types'
import { Button, Typography, TextField, RadioGroup, FormControlLabel, Radio, Switch } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';

/** 自定义布局 */
function CustomLayout() {
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
                自定义Layout(放成两排, 栅格为 8 4 4 8)
                不更改表单不过校验按钮置灰
            </Typography>
            <Grid container spacing={2}>
                <Form ref={formRef} renderSubmitButton={({ isValid, isDirty }) => {
                    return <Button disabled={!(isValid && isDirty)} variant="outlined" onClick={handleSubmit}>提交</Button>
                }}>
                    <Grid xs={8}>
                        <Form.Item name="test1" required label='有label带校验'>
                            <TextField size='small' />
                        </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                        <Form.Item name="test2" required label='test2' hideLabel>
                            <TextField size='small' />
                        </Form.Item>
                    </Grid>
                    <Grid xs={4}>
                        <Form.Item label="单选框" required={false} name="test3">
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </Form.Item>
                    </Grid>
                    <Grid xs={8}>
                        <Form.Item label="表单值不从value属性上拿" required={true} name="test4" valuePropName='checked'>
                            <FormControlLabel
                                control={
                                    <Switch name="gilad" />
                                }
                                label="Gilad Gray"
                            />
                        </Form.Item>
                    </Grid>
                </Form>
            </Grid>
        </>
    );
}

export default CustomLayout;
