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

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SignInSection />} />
        <Route path="/register" element={<SignUpSection />} />

        {/* Тьюторские маршруты */}
        <Route path="/tutor/profile" element={<ProfileTutor />} />
        <Route path="/tutor/notifications" element={<NotificationsSectionTutor />} />
        <Route path="/tutor/tickets" element={<TicketsSectionTutor />} />

        {/* Студентские маршруты */}
        <Route path="/student/profile" element={<ProfileStudent />} />
        <Route path="/student/notifications" element={<NotificationsSectionStudent />} />
        <Route path="/student/deadlines" element={<DeadlineSection />} />
      </Routes>
    </Router>
  );
}