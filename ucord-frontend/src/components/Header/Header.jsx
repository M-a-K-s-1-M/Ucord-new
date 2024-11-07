import { useState } from 'react';
import './Header.css'

export default function Header() {
    const [active, setActive] = useState('notifications')

    return (
        <header className="header">
            <img className='main-logo' src='../../../public/logoMainPage.png' />
            <nav>
                <ul>
                    {active === 'notifications' ? <li className='active'><a onClick={() => { setActive('notifications') }}>Уведомления</a></li> : <li><a onClick={() => { setActive('notifications') }}>Уведомления</a></li>}
                    {active === 'deadline' ? <li className='active'><a onClick={() => { setActive('deadline') }}>Дедлайн</a></li> : <li><a onClick={() => { setActive('deadline') }}>Дедлайн</a></li>}
                </ul>
            </nav>
        </header>
    )
}