import { useState } from 'react';
import './AskModalSection.css';

export default function AskSection({ onClickClose }) {
    const [themeText, setThemeText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log(themeText, descriptionText);
    }

    return (
        <section className='ask-container'>
            <img className="close-img" src="../../../public/closeImage.svg" width='50' onClick={onClickClose} />
            <form className='ask-form' onSubmit={handleSubmit}>
                <label >
                    <input className='theme-question'
                        type='text'
                        name='theme'
                        id='theme'
                        placeholder='Тема вопроса'
                        autoComplete='off'
                        value={themeText} onChange={(evt) => setThemeText(evt.target.value)}
                        required />
                </label>
                <label>
                    <textarea
                        className='description-question'
                        spellCheck='true'
                        id='description'
                        name='description'
                        placeholder='Описание вопроса'
                        value={descriptionText}
                        onChange={(evt) => setDescriptionText(evt.target.value)}
                        required />
                </label>

                <div className='btn-wrapper'>
                    <button className='btn-ask' type='submit'>Спросить</button>
                </div>
            </form>
        </section>
    )
}