import './App.css'
import SignInSection from './components/Forms/SignInSection/SignInSection.jsx'
import { Route, Routes } from 'react-router-dom'
import SignUpSection from './components/Forms/SignUpSection/SignUpSection.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<SignInSection />} />
        <Route path="/signup" element={<SignUpSection />} />
      </Routes>
    </>
  )
}
