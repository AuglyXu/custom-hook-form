import React from 'react';
import './App.css';
import Form from './component/Form';

interface FormData {
  game: number
}

const defaultFormData: FormData = { game: 1 }

function App() {
  return (
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
    />
  );
}

export default App;
