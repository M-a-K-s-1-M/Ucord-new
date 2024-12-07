import './ProfileSecitonStudent.scss';

export default function ProfileSectionStudent() {

    return (
        <section className="profile-container">
            <section className="profile">
                <h3>Основная информация</h3>
                <form>
                    <label htmlFor="role">Роль</label>
                    <input type='text' id='role' name="role" disabled />

                    <label htmlFor="name">Имя</label>
                    <input type='text' id='name' name="name" required />

                    <label htmlFor="surname">Фамилия</label>
                    <input type='text' id='surname' name="surname" required />

                    <label htmlFor="patronymic">Отчество</label>
                    <input type='text' id='patronymic' name="patronymic" required />

                    <label htmlFor="email">Почта</label>
                    <input type='text' id='email' name="email" required />

                    <button className="btn-save disabled" type="submit">Сохранить</button>
                </form>

                <h3>Смена пароля</h3>
                <form>
                    <label htmlFor="password">Пароль</label>
                    <input type='password' id='password' name="password" autoComplete='off' required />

                    <label htmlFor="newPassword">Новый пароль</label>
                    <input type='password' id='newPassword' name="newPassword" autoComplete='off' required />

                    <label htmlFor="newPasswordRepeat">Потверждение пароля</label>
                    <input type='password' id='newPasswordRepeat' name="newPasswordRepeat" autoComplete='off' required />

                    <button className="btn-change disabled" type="submit">Поменять</button>
                </form>

                <a href="#">Выйти из аккаунта</a>
            </section>
        </section>
    )
}