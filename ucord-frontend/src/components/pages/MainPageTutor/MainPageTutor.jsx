import { useState } from "react"
import NotificationsSectionTutor from '../../NotificationsSection/NotificationsSectionTutor/NotificationsSectionTutor'
import TicketsSectionTutor from "../../TicketsSectionTutor/TicketsSectionTutor";
import './MainPageTutor.scss'
import ProfileTutor from "../../Profile/ProfileTutor/ProfileTutor";

export default function MainPageTutor() {
    const [active, setActive] = useState('notifications');

    return (
        <section className="main-page-t">
            <header className="header">
                <img className='main-logo' src='../../../public/logoMainPage.png' onClick={() => setActive('notifications')} />
                <nav>
                    <ul>
                        {active === 'notifications' ? <li><a className='active' onClick={() => { setActive('notifications') }}>Уведомления</a></li> : <li><a onClick={() => { setActive('notifications') }}>Уведомления</a></li>}
                        {active === 'tickets' ? <li><a className='active' onClick={() => { setActive('tickets') }}>Тикеты</a></li> : <li><a onClick={() => { setActive('tickets') }}>Тикеты</a></li>}
                    </ul>

                    {active === 'profile' ? <button className="profile active" onClick={() => { setActive('profile') }}><img src="../../../../public/profileActive.png" /></button>
                        : <button className="profile" onClick={() => { setActive('profile') }}><img src="../../../../public/profile.png" /></button>}
                </nav>

            </header>


            {active === 'notifications' && <NotificationsSectionTutor />}
            {active === 'tickets' && <TicketsSectionTutor />}
            {active === 'profile' && <ProfileTutor />}
        </section>
    )
}