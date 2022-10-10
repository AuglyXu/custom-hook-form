import { useRef } from 'react';
import './App.css';
import HookForm from './component/InternalForm/HookForm';
import Form from './component/Form'
import { HookFormOutFunction } from './component/InternalForm/HookForm/types'
import { FormOutFunction } from './component/Form/types';
import { TextField } from '@mui/material';

interface HookFormData {
  test: number
}

const defaultFormData: HookFormData = { test: 1 }

function App() {
  const formRef = useRef<HookFormOutFunction>()
  const secondFormRef = useRef<FormOutFunction>()
  const handleSubmit = async () => {
    await formRef.current?.trigger()
    await secondFormRef.current?.trigger()
  }
  return (
    <>
      {/* <HookForm
        defaultFormData={defaultFormData}
        formFields={[{
          type: "Input",
          name: 'test',
          property: {
            websize: 0.5,
            label: 'test',
            required: true
          }
        }]}
        ref={formRef}
      /> */}
      <Form ref={secondFormRef}>
        <Form.Item name="xuxianzhe" required label='123'>
          <TextField />
        </Form.Item>
      </Form>
      <button onClick={handleSubmit}>提交</button>
    </>
  );
}

export default App;
