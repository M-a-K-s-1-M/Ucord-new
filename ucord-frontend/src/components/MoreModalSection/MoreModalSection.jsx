import './MoreModalSection.css'

export default function MoreSection({ onClickClose }) {
    return (
        <>
            <section className="more-container">
                <img className='close-img' src='../../../public/closeImage.svg' onClick={onClickClose} />
                <h3 className='title-deadline'>
                    Лабораторная по Физике 12 апреля 13:30
                </h3>
                <p className='description-deadline'>Лабораторная по силе трения
                    <br /><br />
                    С собой:<br />
                    Отчет<br />
                    Конспект
                    <br /><br />
                    Р-333

                </p>


            </section>
        </>
    )
}