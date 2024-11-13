import { useState } from "react";
import './ChatModalSection.css';

export default function ChatSection({ onClickClose }) {

    const [textMessage, setTextMessage] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt.target.value)
    }

    return (
        <section className="chat-container">
            <img className="close-img" src="../../../public/closeImage.svg" width='50' onClick={onClickClose} />
            <div className="chat">
                <div className="message theme">
                    <h4>Студент</h4>
                    <div className="description">
                        <h3>Тема обращения</h3>
                        <p>Описание</p>
                    </div>
                </div>

                <ul>
                    <li className="message tutor">
                        <h4>Тьютор</h4>
                        <div className="description">
                            <p>Ответ тьютера</p>
                        </div>
                    </li>

                    <li className="message student">
                        <h4>Студент</h4>
                        <div className="description">
                            <p>Ответ студента</p>
                        </div>
                    </li>

                </ul>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder="Сообщение" value={textMessage} onChange={(evt) => setTextMessage(evt.target.value)} />
                    <button type="submit">Отправить</button>
                </form>
            </div>

            <div className="status-container">
                <p>Проблема решена?</p>
                <p className="status">Проблема решается</p>
            </div>

        </section>
    )
}