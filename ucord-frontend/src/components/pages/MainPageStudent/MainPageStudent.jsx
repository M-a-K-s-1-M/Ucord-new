import { useState } from "react";
import NotificationsSectionStudent from "../../NotificationsSection/NotificationsSectionStudent/NotificationsSectionStudent";
import DeadlineSection from "../../DeadlineSection/DeadlineSection";
import ProfileSectionStudent from "../../Profile/ProfileSectionStudent";
import './MainPageStudent.scss'

export default function MainPageStudent() {
    const [active, setActive] = useState('notifications')

    return (
        <section className="main-page">
            <header className="header">
                <img className='main-logo' src='../../../public/logoMainPage.png' onClick={() => setActive('notifications')} />
                <nav>
                    <ul>
                        {active === 'notifications' ? <li>
                            <a className='active' onClick={() => { setActive('notifications') }}>Уведомления</a>
                        </li> : <li>
                            <a onClick={() => { setActive('notifications') }}>Уведомления</a>
                        </li>}
                        {active === 'deadline' ? <li >
                            <a className='active' onClick={() => { setActive('deadline') }}>Дедлайн</a>
                        </li> : <li>
                            <a onClick={() => { setActive('deadline') }}>Дедлайн</a>
                        </li>}
                    </ul>

                    {active === 'profile' ? <button className="profile active" onClick={() => { setActive('profile') }}><img src="../../../../public/profileActive.png" /></button>
                        : <button className="profile" onClick={() => { setActive('profile') }}><img src="../../../../public/profile.png" /></button>}
                </nav>
            </header>


            {active === 'notifications' && <NotificationsSectionStudent />}
            {active === 'deadline' && <DeadlineSection />}
            {active === 'profile' && <ProfileSectionStudent />}
        </section>
    )
}