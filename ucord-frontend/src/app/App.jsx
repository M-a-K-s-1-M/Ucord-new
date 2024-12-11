import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';

import SignInSection from '../components/Forms/SignInSection/SignInSection.jsx';
import SignUpSection from '../components/Forms/SignUpSection/SignUpSection.jsx';

import NotificationsSectionStudent from '../components/NotificationsSection/NotificationsSectionStudent/NotificationsSectionStudent.jsx';
import DeadlineSection from '../components/DeadlineSection/DeadlineSection.jsx';
import ProfileStudent from '../components/Profile/ProfileStudent/ProfileStudent.jsx';

import NotificationsSectionTutor from '../components/NotificationsSection/NotificationsSectionTutor/NotificationsSectionTutor.jsx';
import TicketsSectionTutor from '../components/TicketsSectionTutor/TicketsSectionTutor.jsx';
import ProfileTutor from '../components/Profile/ProfileTutor/ProfileTutor.jsx';

import TutorLayout from '../components/Layout/TutorLayout.jsx';
import StudentLayout from '../components/Layout/StudentLayout.jsx';
import DefaultPage from '../components/DefaultPage/DefaultPage.jsx';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSection />} />
        <Route path="/signup" element={<SignUpSection />} />

        <Route path='tutor' element={<TutorLayout />}>
          {/* Тьюторские маршруты */}
          <Route index element={<DefaultPage />} />
          <Route path="notifications" element={<NotificationsSectionTutor />} />
          <Route path="tickets" element={<TicketsSectionTutor />} />
          <Route path="profile" element={<ProfileTutor />} />
        </Route>

        <Route path='student' element={<StudentLayout />}>
          {/* Студентские маршруты */}
          <Route index element={<DefaultPage />} />
          <Route path="notifications" element={<NotificationsSectionStudent />} />
          <Route path="deadlines" element={<DeadlineSection />} />
          <Route path="profile" element={<ProfileStudent />} />
        </Route>


      </Routes>
    </Router >
  );
}