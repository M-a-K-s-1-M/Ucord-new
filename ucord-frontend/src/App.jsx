import './App.css'
import SignInSection from './components/Forms/SignInSection/SignInSection.jsx'
import { Route, Routes } from 'react-router-dom'
import SignUpSection from './components/Forms/SignUpSection/SignUpSection.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import MainPage from './pages/MainPage.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUpSection />} />
        <Route path="/signin" element={<SignInSection />} />

        <Route
          path='/'
          element={<ProtectedRoute><MainPage /></ProtectedRoute>}
        />
      </Routes >
    </>
  )
}
