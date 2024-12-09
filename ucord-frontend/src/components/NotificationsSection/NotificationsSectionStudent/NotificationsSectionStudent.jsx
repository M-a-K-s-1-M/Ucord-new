import './NotificationsSectionStudent.scss'
import ChatModalSection from '../../Modal/ChatModalSection/ChatModalSection.jsx'
import AskModalSection from '../../Modal/AskModalSection/AskModalSection.jsx';
import { useState } from 'react';
import DeleteModal from '../../Modal/DeleteModal/DeleteModal.jsx';

export default function NotificationsSection() {
    const [isChat, setIsChat] = useState(false);
    const [isAsk, setIsAsk] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const [modals, setModals] = useState({});

    const handleDeleteClick = (itemId) => {
        setModals(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    // проверка статуса у вопроса 
    // const renderRequestItem = (li) => {
    //     const shouldShowDeleteModal = li.className.includes('decided') || li.className.includes('expected');

    //     return (
    //         <li className={li.className}>
    //             {/* ... остальной код li ... */}
    //             {shouldShowDeleteModal && <DeleteModal />}
    //         </li>
    //     );
    // };


    const openModalChat = () => {
        setIsChat(true);
    }

    const closeModalChat = () => {
        setIsChat(false);
    }

    const openModalAsk = () => {
        setIsAsk(true);
    }

    const closeModalAsk = () => {
        setIsAsk(false);
    }

    return (
        <main className='notifications'>

            {isChat && <ChatModalSection onClickClose={closeModalChat} />}
            {isAsk && <AskModalSection onClickClose={closeModalAsk} />}

            <section className='block-ad'>

                <ul className='ad-list'>
                    <li className='ad-item'>
                        <div className='title-container'>
                            <h3>Изменение расписания занятий по Программированию</h3>
                            <button type='button' >Подробнее</button>
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

                    <li className='requests-item resolve'>
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

                    <li className='requests-item decided'>
                        <div className='title-container'>
                            <h3>Вопрос по поводу изменения расписания занятий</h3>
                            <button className='btn-status decided'>Решено</button>
                        </div>
                        <p className='description'>Уважаемый куратор, у меня возникли вопросы по поводу изменений в расписании
                            занятий по Программированию для группы РТФ-212. Мне стало известно, что занятия 26 октября
                            будут проходить...
                        </p>
                        <div className='btn-wrapper'>
                            <button className="btn-deleted" type='button' onClick={() => setIsDelete(true)}><img src='../../../../public/trash.svg' /></button>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                        {isDelete && <DeleteModal onClose={() => setIsDelete(false)} type='request' />}
                    </li>

                    <li className='requests-item expected'>
                        <div className='title-container'>
                            <h3>Необходимость уточнения деталей переноса занятий</h3>
                            <button className='btn-status expected'>Ожидает принятия</button>
                        </div>
                        <p className='description'>Здравствуйте, уважаемый куратор! Я хотел бы получить дополнительные разъяснения по поводу переноса занятий по Программированию....</p>
                        <div className='btn-wrapper'>
                            <button className="btn-deleted" type='button' onClick={() => setIsDelete(true)}><img src='../../../../public/trash.svg' /></button>
                        </div>
                        {isDelete && <DeleteModal onClose={() => setIsDelete(false)} type='request' />}
                    </li>

                </ul>

                <div className='btn-wrapper'>
                    <button type='button' className='btn-question' onClick={openModalAsk}>Спросить</button>
                </div>
            </section>
        </main >
    )
}