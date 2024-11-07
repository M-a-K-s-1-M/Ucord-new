import { useState } from "react";
import Header from "../Header/Header";
import NotificationsSection from "../NotificationsSection/NotificationsSection";
import DeadlineSection from "../DeadlineSection/DeadlineSection";

export default function MainPage() {
    const [active, setActive] = useState('notifications')

    return (
        <>
            <header className="header">
                <img className='main-logo' src='../../../public/logoMainPage.png' />
                <nav>
                    <ul>
                        {active === 'notifications' ? <li className='active'><a onClick={() => { setActive('notifications') }}>Уведомления</a></li> : <li><a onClick={() => { setActive('notifications') }}>Уведомления</a></li>}
                        {active === 'deadline' ? <li className='active'><a onClick={() => { setActive('deadline') }}>Дедлайн</a></li> : <li><a onClick={() => { setActive('deadline') }}>Дедлайн</a></li>}
                    </ul>
                </nav>
            </header>

            {active === 'notifications' ? <NotificationsSection /> : <DeadlineSection />}
        </>
    )
}