import './MoreModalSection.scss'

export default function MoreSection({ onClickClose }) {
    return (
        <div className='bg-wrapper'>
            <section className="more-container">
                <img className='close-img' src='../../../public/closeImage.png' width='50' onClick={onClickClose} />
                <h3 className='title-deadline'>
                    Лабораторная по Физике 12 апреля 13:30
                </h3>
                <div className='description-deadline-container'>
                    <p className='description'>
                        Лабораторная по силе трения
                        <br /><br />
                        С собой:<br />
                        Отчет<br />
                        Конспект
                        <br /><br />
                        Р-333
                    </p>

                    <button className="btn-delete"><img src='../../../../public/trash.svg' /></button>
                </div>
            </section>
        </div>
    )
}