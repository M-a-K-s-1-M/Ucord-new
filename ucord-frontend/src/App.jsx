import { useState } from 'react'
import './App.css'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm';



function App() {
  const [reg, setReg] = useState(true);
  return (
    <>
      <button onClick={() => setReg(false)}>Вход</button>
      <button onClick={() => setReg(true)}>Регестрация</button>

      {reg ? (<SignUpForm />) : (<SignInForm />)}

    </>
  )
}

export default App
