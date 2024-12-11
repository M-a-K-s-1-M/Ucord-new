import { Link, NavLink } from 'react-router-dom'
import './Header.scss'
// import { useRoles } from '../../hooks/useRoles';

export default function Header() {
    // const currentUserRole = useRoles();
    const currentUserRole = 'student';

    const tabs = {
        tutor: [
            { label: 'Уведомления', to: '/tutor/notifications' },
            { label: 'Тикеты', to: '/tutor/tickets' },
            { label: 'Профиль', to: '/tutor/profile' },
        ],
        student: [
            { label: 'Уведомления', to: '/student/notifications' },
            { label: 'Дедлайны', to: '/student/deadlines' },
            { label: 'Профиль', to: '/student/profile' },
        ]
    };

    const currentTabs = currentUserRole ? tabs[currentUserRole.toLowerCase()] : [];

    return (
        <>

            <header className="header">
                <NavLink to={currentTabs[0].to}><img className='main-logo' src='../../../public/logoMainPage.png' /></NavLink>
                <nav>
                    <ul>
                        <li><NavLink to={currentTabs[0].to} className={({ isActive }) => isActive ? 'link active' : 'link'} > {currentTabs[0].label}</NavLink></li>
                        <li><NavLink to={currentTabs[1].to} className={({ isActive }) => isActive ? 'link active' : 'link'} >{currentTabs[1].label}</NavLink></li>
                    </ul>

                    <button className='btn-profile'><NavLink className={({ isActive }) => isActive ? 'link-profile active' : 'link-profile'} to={currentTabs[2].to}></NavLink></button>

                </nav>
            </header >
        </>
    )
}
