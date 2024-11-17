import './NotificationsSection.css'
import axios from 'axios';
import ChatModalSection from '../ChatModalSection/ChatModalSection.jsx'
import { useEffect, useState } from 'react';
import AskModalSection from '../AskModalSection/AskModalSection.jsx';
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

    useEffect(() => {
        setDataAdBlock(adData());
    }, [])

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
                </ul>

                {/* {dataAdBlock && setDataAdBlock.map(block => {
                    return (
                        <>
                            <ul className='ad-list' id={block.id}>
                                <li className='ad-item'>
                                    <div className='title-container'>
                                        <h3>{block.article}</h3>
                                        <button type='button'>Подробнее</button>
                                    </div>
                                    <p className='description'>{block.description}</p>
                                </li>
                            </ul>
                        </>)
                })} */}

            </section>

            <section className='block-requests'>
                <ul className='requests-list'>

                    <li className='requests-item'>
                        <div className='title-container'>
                            <h3>Тема обращения</h3>
                            <button className='btn-status'>Решается</button>
                        </div>
                        <p className='description'>Описание</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </li>

                    <li className='requests-item'>
                        <div className='title-container'>
                            <h3>Тема обращения</h3>
                            <button className='btn-status decided'>Решено</button>
                        </div>
                        <p className='description'>Описание</p>
                        <div className='btn-wrapper'>
                            <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                        </div>
                    </li>



                </ul>

                <div className='btn-wrapper'>
                    <button type='button' className='btn-question' onClick={openModalAsk}>Спросить</button>
                </div>
            </section>
        </main>
    )
}