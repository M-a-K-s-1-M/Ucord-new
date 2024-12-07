import { useState } from "react"
import './DeadlineSection.scss'
import MoreModalSection from "../Modal/MoreModalSection/MoreModalSection";

export default function DeadlineSection() {
    const [subjectText, setSubjectText] = useState('');
    const [dataText, setDataText] = useState('');

    const [modalMoreOpen, setModalMoreOpen] = useState(false);

    const openModalMore = () => {
        setModalMoreOpen(true);
    }

    const closeModalMore = () => {
        setModalMoreOpen(false);
    }

    return (
        <main className="deadline-container">
            {modalMoreOpen && <MoreModalSection onClickClose={closeModalMore} />}
            <section className="deadline">
                <form className="deadline-form">

                    <div className="input-group">
                        <label htmlFor="date">Дата</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={dataText}
                            onChange={(evt) => setDataText(evt.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="subject">Предмет</label>
                        <input
                            type='text'
                            name='subject'
                            id='subject'
                            value={subjectText}
                            onChange={(evt) => setSubjectText(evt.target.value)}
                        />
                    </div>

                </form>

                <ul className="deadline-list">
                    <li className="deadline-item">
                        <p className="description">Лабораторная по Физике</p>
                        <p className="data">12 апреля 2025</p>
                        <button type='button' onClick={openModalMore}>Подробнее</button>
                    </li>



                </ul>

                <div className="btn-wrapper">
                    <button className="btn-add"><img src='../../../public/plus.png' width='60' /></button>
                </div>

            </section>
        </main>
    )
}