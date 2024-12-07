import { useState } from "react"
import '../../Header/Header.css'
import NotificationsSectionTutor from '../../NotificationsSection/NotificationsSectionTutor/NotificationsSectionTutor'
import TicketsSectionTutor from "../../TicketsSectionTutor/TicketsSectionTutor";


export default function MainPageTutor() {
    const [active, setActive] = useState('notifications');

    return (
        <section className="main-page-t">
            <header className="header">
                <img className='main-logo' src='../../../public/logoMainPage.png' />
                <nav>
                    <ul>
                        {active === 'notifications' ? <li className='active'><a onClick={() => { setActive('notifications') }}>Уведомления</a></li> : <li><a onClick={() => { setActive('notifications') }}>Уведомления</a></li>}
                        {active === 'tickets' ? <li className='active'><a onClick={() => { setActive('tickets') }}>Тикеты</a></li> : <li><a onClick={() => { setActive('tickets') }}>Тикеты</a></li>}
                    </ul>
                </nav>
            </header>


            {active === 'notifications' ? <NotificationsSectionTutor /> : <TicketsSectionTutor />}
        </section>
    )
}