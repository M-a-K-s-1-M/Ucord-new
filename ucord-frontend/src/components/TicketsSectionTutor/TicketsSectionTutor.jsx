import './TicketsSectionTutor.scss'

export default function TicketsSectionTutor() {
    return (
        <section className="tickets-t">
            <section className='tickets-container'>
                <ul className='tickets-list'>
                    <li className='ticket-item'>
                        <div className='info-ticket-wrapper'>
                            <h3 className='title'>Необходимость уточнения деталей переноса занятий</h3>
                            <p className='description'>Здравствуйте, уважаемый куратор! Я хотел бы получить
                                дополнительные разъяснения по поводу переноса занятий
                                по Программированию на 26 октября в аудиторию 205.
                                Существуют ли другие изменения в расписании или требования
                                к подготовке к занятиям, о которых нам следует знать?
                            </p>
                        </div>
                        <div className='info-student-wrapper'>
                            <div className="info-student">
                                <p className='student'>Костылев Эдуард Сергеевич</p>
                                <p className='group'>РИ-230941</p>
                            </div>
                            <button type='button' className='btn-take-ticket'>Взять тикет</button>
                        </div>
                    </li>


                </ul>
            </section>

            <section className='chats-container'>
                <div className='btn-wrapper'>
                    <button className='btn-resolve active'>Решается</button>
                    <button className="btn-decided">Решено</button>
                </div>

                <div className="chats-list-wrapper">


                    <ul className="chats-list">
                        <li className='chat-item'>
                            <div className='info-chat-wrapper'>
                                <h3 className='title'>Проблема с доступом к университетской сети</h3>
                                <p className='description'>Уважаемый тьютор, у меня возникли проблемы с
                                    доступом к университетской сети Wi-Fi. Я не могу подключиться, скорость
                                    очень низкая. Куда мне обратиться для решения данной проблемы?
                                </p>
                            </div>

                            <div className="status-chat-wrapper">
                                <button type='button' className='status-chat resolve'>Решается</button>
                                <div className="info-student">
                                    <p className='student'>Костылев Эдуард Сергеевич</p>
                                    <p className='group'>РИ-230941</p>
                                </div>
                                <button className='btn-chat'>Чат</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
    )
}