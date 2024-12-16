import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignInSection from '../components/Forms/SignInSection/SignInSection.jsx';
import SignUpSection from '../components/Forms/SignUpSection/SignUpSection.jsx';

import GeneralLayout from '../components/Layout/GeneralLayout.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSection />} />
        <Route path="/signup" element={<SignUpSection />} />

        <Route path='/main/*' element={<GeneralLayout />} />

        {/* <Route path='tutor' element={<TutorLayout />}>
          Тьюторские маршруты
          <Route index element={<DefaultPage />} />
          <Route path="notifications" element={<NotificationsSectionTutor />} />
          <Route path="tickets" element={<TicketsSectionTutor />} />
          <Route path="profile" element={<ProfileTutor />} />
        </Route>

        <Route path='student' element={<StudentLayout />}>
          Студентские маршруты
          <Route index element={<DefaultPage />} />
          <Route path="notifications" element={<NotificationsSectionStudent />} />
          <Route path="deadlines" element={<DeadlineSection />} />
          <Route path="profile" element={<ProfileStudent />} />
        </Route> */}


      </Routes>
    </Router >
  );
}