import './NotificationsSectionTutor.css'

export default function NotificationsSectionTutor() {
    return (
        <section className="notifications-t">
            <div className="ads-block">
                <form>
                    <div className="form-filter-container">
                        <div className='input-wrapper'>
                            <label htmlFor="group">Группа</label>
                            <input type="text" value="Все" id='group' name='group' />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="students">Студент(ы)</label>
                            <input type="text" value="Все" id='students' name='students' />
                        </div>
                    </div>

                    <div className="theme-ad-container">
                        <label htmlFor="themeAd" />
                        <input
                            type="text"
                            name='themeAd'
                            id='tehemeAd'
                            placeholder="Тема объявления"
                            required />
                    </div>

                    <div className="description-ad-container">
                        <label htmlFor="descriptionAd" />
                        <textarea
                            name="descriptionAd"
                            id="descriptionAd"
                            className="description-ad"
                            spellCheck='true'
                            placeholder="Описание объявления"
                            required
                        />
                    </div>

                    <button type="submit" className="btn">Выложить</button>
                </form>
            </div>

            <div className="student-list-block">
                <ul className="student-list">
                    <li className="student-item"></li>
                </ul>
            </div>
        </section>
    )
}