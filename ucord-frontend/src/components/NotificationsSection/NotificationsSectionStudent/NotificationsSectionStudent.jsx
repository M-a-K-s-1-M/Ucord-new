import './NotificationsSectionStudent.scss'
import axios from 'axios';
import ChatModalSection from '../../Modal/ChatModalSection/ChatModalSection.jsx'
import { useEffect, useState } from 'react';
import AskModalSection from '../../Modal/AskModalSection/AskModalSection.jsx';
import { useNavigate } from 'react-router-dom';




export default function NotificationsSection() {
    const [isModalChatOpen, setIsModalChatlOpen] = useState(false);
    const [isModalAskOpen, setIsModalAskOpen] = useState(false);

    const [dataAdBlock, setDataAdBlock] = useState({})

    const openModalChat = () => {
        setIsModalChatlOpen(true);
        document.body.classList.add('modal-open');
    }

    const closeModalChat = () => {
        setIsModalChatlOpen(false);
        document.body.classList.remove('modal-open');
    }

    const openModalAsk = () => {
        setIsModalAskOpen(true);
        document.body.classList.add('modal-open');
    }

    const closeModalAsk = () => {
        setIsModalAskOpen(false);
        document.body.classList.remove('modal-open');
    }

    const adData = async () => {

        await axios.get('http://localhost:8081/api/v1/personal-account/announcement/search', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            console.log(response)
            return response.data.content
        }).catch(error => {
            console.log(error);
            return null
        })
    }

    // useEffect(() => {
    //     setDataAdBlock(adData());
    // }, [])

    return (
        <main className='notifications'>

            {isModalChatOpen && <ChatModalSection onClickClose={closeModalChat} />}
            {isModalAskOpen && <AskModalSection onClickClose={closeModalAsk} />}

            <section className='block-ad'>

                <ul className='ad-list'>
                    <li className='ad-item'>
                        <div className='title-container'>
                            <h3>Изменение расписания занятий по Программированию</h3>
                            <button type='button'>Подробнее</button>
                        </div>
                        <p className='description'>В связи с проведением технических работ в аудитории 314,
                            изменяется расписание занятий по Программированию для группы РТФ-212.
                            Новое расписание: Занятия 26 октября будут проходить в аудитории 205.
                            Уважаемые студенты группы РТФ-212!  Сообщаем вам, что в связи с проведением
                            технических работ в аудитории 314...</p>
                    </li>


                </ul>

            </section>

            <section className='block-requests'>
                <ul className='requests-list'>

                    <li className='requests-item'>
                        <div className='title-container'>
                            <h3>Проблема с доступом к университетской сети</h3>
                            <button className='btn-status resolve'>Решается</button>
                        </div>
                        <p className='description'>Уважаемый [Имя куратора], у меня возникли
                            проблемы с доступом к университетской сети Wi-Fi. Я не могу подключиться,
                            скорость очень низкая. Куда мне обратиться для решения данной проблемы?</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </li>

                    <li className='requests-item'>
                        <div className='title-container'>
                            <h3>Вопрос по поводу изменения расписания занятий</h3>
                            <button className='btn-status decided'>Решено</button>
                        </div>
                        <p className='description'>Уважаемый куратор, у меня возникли вопросы по поводу изменений в расписании
                            занятий по Программированию для группы РТФ-212. Мне стало известно, что занятия 26 октября
                            будут проходить...
                        </p>
                        <div className='btn-wrapper'>
                            <button className="btn-deleted" type='button' ><img src='../../../../public/trash.svg' /></button>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </li>

                    <li className='requests-item'>
                        <div className='title-container'>
                            <h3>Необходимость уточнения деталей переноса занятий</h3>
                            <button className='btn-status expected'>Ожидает принятия</button>
                        </div>
                        <p className='description'>Здравствуйте, уважаемый куратор! Я хотел бы получить дополнительные разъяснения по поводу переноса занятий по Программированию....</p>
                        <div className='btn-wrapper'>
                            <button className="btn-deleted" type='button' ><img src='../../../../public/trash.svg' /></button>
                        </div>
                    </li>

                </ul>

                <div className='btn-wrapper'>
                    <button type='button' className='btn-question' onClick={openModalAsk}>Спросить</button>
                </div>
            </section>
        </main >
    )
}