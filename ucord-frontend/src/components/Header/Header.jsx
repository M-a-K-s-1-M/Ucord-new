import './Header.scss'
export default function Header({ active, onClick }) {
    return (
        <header className="header">
            <img className='main-logo' src='../../../public/logoMainPage.png' onClick={() => setActive('notifications')} />
            <nav>
                <ul>
                    {active === 'notifications' ? <li>
                        <a className='active' onClick={onClick}>Уведомления</a>
                    </li> : <li>
                        <a onClick={onClick}>Уведомления</a>
                    </li>}
                    {active === 'deadline' ? <li >
                        <a className='active' onClick={onClick}>Дедлайн</a>
                    </li> : <li>
                        <a onClick={onClick}>Дедлайн</a>
                    </li>}
                </ul>

                {active === 'profile' ? <button className="profile active" onClick={onClick}><img src="../../../../public/profileActive.png" /></button>
                    : <button className="profile" onClick={onClick}><img src="../../../../public/profile.png" /></button>}
            </nav>
        </header>
    )
}
