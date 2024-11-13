import './NotificationsSection.css'
import axios from 'axios';
import ChatModalSection from '../ChatModalSection/ChatModalSection.jsx'
import { useState } from 'react';
import AskModalSection from '../AskModalSection/AskModalSection.jsx';

export default function NotificationsSection() {
    const [isModalChatOpen, setIsModalChatlOpen] = useState(false);
    const [isModalAskOpen, setIsModalAskOpen] = useState(false);

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



    return (
        <main className={`notifications ${isModalChatOpen ? 'modal-open' : ''}`}>

            {isModalChatOpen && <ChatModalSection onClickClose={closeModalChat} />}
            {isModalAskOpen && <AskModalSection onClickClose={closeModalAsk} />}

            <section className='block-ad'>

                <ul className='ad-list'>
                    <li className='ad-item'>
                        <div className='title-container'>
                            <h3>Тема объявления</h3>
                            <button type='button'>Подробнее</button>
                        </div>
                        <p className='description'>Описание</p>
                    </li>

                    <li className='ad-item'>
                        <div className='title-container'>
                            <h3>Тема объявления</h3>
                            <button type='button'>Подробнее</button>
                        </div>
                        <p className='description'>Описание</p>
                    </li>
                    <li className='ad-item'>
                        <div className='title-container'>
                            <h3>Тема объявления</h3>
                            <button type='button'>Подробнее</button>
                        </div>
                        <p className='description'>Описание</p>
                    </li>
                    <li className='ad-item'>
                        <div className='title-container'>
                            <h3>Тема объявления</h3>
                            <button type='button'>Подробнее</button>
                        </div>
                        <p className='description'>Описание</p>
                    </li>
                    <li className='ad-item'>
                        <div className='title-container'>
                            <h3>Тема объявления</h3>
                            <button type='button'>Подробнее</button>
                        </div>
                        <p className='description'>Описание</p>
                    </li>
                </ul>

            </section>

            <section className='block-requests'>
                <div className='requests-list'>
                    <div className='requests-item'>
                        <div className='title-container'>
                            <h3>Тема обращения</h3>
                            <button className='btn-status'>Решается</button>
                        </div>
                        <p className='description'>Описание</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </div>

                    <div className='requests-item'>
                        <div className='title-container'>
                            <h3>Тема обращения</h3>
                            <button className='btn-status decided'>Решено</button>
                        </div>
                        <p className='description'>Описание</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </div>

                    <div className='requests-item'>
                        <div className='title-container'>
                            <h3>Тема обращения</h3>
                            <button className='btn-status decided'>Решено</button>
                        </div>
                        <p className='description'>Описание</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </div>
                    <div className='requests-item'>
                        <div className='title-container'>
                            <h3>Тема обращения</h3>
                            <button className='btn-status decided'>Решено</button>
                        </div>
                        <p className='description'>Описание</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </div>
                    <div className='requests-item'>
                        <div className='title-container'>
                            <h3>Тема обращения</h3>
                            <button className='btn-status decided'>Решено</button>
                        </div>
                        <p className='description'>Описание</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </div>


                </div>

                <div className='btn-wrapper'>
                    <button type='button' className='btn-question' onClick={openModalAsk}>Спросить</button>
                </div>
            </section>
        </main>
    )
}