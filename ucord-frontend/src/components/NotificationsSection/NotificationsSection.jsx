import './NotificationsSection.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

export default function NotificationsSection() {

    return (
        <>
            {/* <Header /> */}
            <main className='notifications container'>
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
                            <button className='btn-chat' type='button'>Чат</button>
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
        </>
    )
}