import { useRef } from 'react';
import './App.css';
import HookForm from './component/HookForm';
import Form from './component/Form'
import { OutFunction } from './component/HookForm/types'
import { FormOutFunction } from './component/Form/type';
interface FormData {
  test: number
}

const defaultFormData: FormData = { test: 1 }

function App() {
  const formRef = useRef<OutFunction>()
  const secondFormRef = useRef<FormOutFunction>()
  const handleSubmit = async () => {
    await formRef.current?.trigger()
    await secondFormRef.current?.trigger()
    console.log("通过校验")
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
        <Form.Item name="xuxianzhe" required>
          <input />
        </Form.Item>
      </Form>
      <button onClick={handleSubmit}>提交</button>
    </>
  );
}

export default App;
