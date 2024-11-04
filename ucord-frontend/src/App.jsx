import './App.css'
import SignInSection from './components/Forms/SignInSection/SignInSection.jsx'
import { Route, Routes } from 'react-router-dom'
import SignUpSection from './components/Forms/SignUpSection/SignUpSection.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotificationsSections from './components/NotificationsSection/NotificationsSection.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUpSection />} />
        <Route path="/signin" element={<SignInSection />} />

        <Route
          path='/main'
          element={<ProtectedRoute><NotificationsSections /></ProtectedRoute>}
        />
      </Routes >
    </>
  )
}
