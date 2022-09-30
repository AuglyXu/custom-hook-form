import { useRef } from 'react';
import './App.css';
import Form from './component/Form';
import { OutFunction } from './component/Form/types'
interface FormData {
  game: number
}

const defaultFormData: FormData = { game: 1 }

function App() {
  const formRef = useRef<OutFunction>()
  const handleSubmit = async () => {
    await formRef.current?.trigger()
    console.log("通过校验")
  }
  return (
    <>
      <Form
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
      />
      <button onClick={handleSubmit}>提交</button>
    </>
  );
}

export default App;
