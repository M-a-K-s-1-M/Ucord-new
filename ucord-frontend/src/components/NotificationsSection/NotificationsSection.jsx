import './NotificationsSection.css'
import axios from 'axios';
// import ChatButton from '../Buttons/Chat/ChatButton';
import ChatSection from '../ChatSection/ChatSection.jsx'
import { useState } from 'react';

export default function NotificationsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const opneModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <main className='notifications container'>

            {isModalOpen && <ChatSection onClickClose={closeModal} />}

            <section className='block-ad'>
                <div className='ad-item'>
                    <div className='title-container'>
                        <h3>Тема объявления</h3>
                        <button type='button'>Подробнее</button>
                    </div>
                    <p className='description'>Описание</p>
                </div>
            </section>

            <section className='block-requests'>
                <div className='requests-item'>
                    <div className='title-container'>
                        <h3>Тема обращения</h3>
                        <button className='btn-status'>Решается</button>
                    </div>
                    <p className='description'>Описание</p>
                    <div className='btn-wrapper'>
                        <button className='btn-chat' type='button' onClick={opneModal}>Чат</button>
                    </div>
                </div>

                <div className='requests-item'>
                    <div className='title-container'>
                        <h3>Тема обращения</h3>
                        <button className='btn-status decided'>Решено</button>
                    </div>
                    <p className='description'>Описание</p>
                    <div className='btn-wrapper'>
                        <button className='btn-chat' type='button'>Чат</button>
                    </div>
                </div>
            </section>
        </main>
    )
}