import { useState } from 'react';
import './NotificationsSectionTutor.scss'
import MultiSelect from '../../MultiSelect/MultiSelect';

// const animatedComponents = makeAnimated();

const colourOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VI', label: 'Virgin Islands' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
]

const students = [
    { id: 1, name: 'Костылев Эдуард Сергеевич', group: 'РИ-230941' },
    { id: 2, name: 'Морев Владислав Витальевич', group: 'РИ-230941' },
    { id: 3, name: 'Емельянов Максим Андреевич', group: 'РИ-230941' },
]


export default function NotificationsSectionTutor() {
    const [group, setGroup] = useState([])
    const [student, setStudent] = useState([])
    const [curs, setCurs] = useState([]);
    const [direction, setDirection] = useState([]);

    const [selectedStudents, setSelectedStudents] = useState([]);

    const handleSubmitFilter = (evt) => {
        evt.preventDefault();
    }

    const handleChangeGroup = (selectedOptions) => {
        setGroup(selectedOptions);;
    };

    const handleChangeStudent = (selectedOptions) => {
        setStudent(selectedOptions);;
    };

    const handleChangeCurs = (selectedOptions) => {
        setCurs(selectedOptions);;
    };

    const handleChangeDirection = (selectedOptions) => {
        setDirection(selectedOptions);;
    };

    const handleStudentSelect = (e, student) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedStudents(prev => [...prev, student]);
        } else {
            setSelectedStudents(prev => prev.filter(s => s !== student));
        }
    };

    const handleSelectAll = (e) => {
        setSelectedStudents(e.target.checked ? students : []);
    };


    return (
        <section className="notifications-t">
            <div className="ads-container">
                <form className='form-filter'>
                    <div className='input-wrapper' onSubmit={handleSubmitFilter}>
                        <label htmlFor="group">Группа</label>
                        <MultiSelect
                            options={colourOptions}
                            value={group}
                            onChange={handleChangeGroup}
                            isSelectAll={true}
                            menuPlacement={"bottom"}
                            className='select'
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="students">Студент(ы)</label>
                        <MultiSelect
                            options={colourOptions}
                            value={student}
                            onChange={handleChangeStudent}
                            isSelectAll={true}
                            menuPlacement={"bottom"}
                            className='select'
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="curs">Курс</label>
                        <MultiSelect
                            options={colourOptions}
                            value={curs}
                            onChange={handleChangeCurs}
                            isSelectAll={true}
                            menuPlacement={"bottom"}
                            className='select'
                            id='curs'
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="direction">Направление</label>
                        <MultiSelect
                            options={colourOptions}
                            value={direction}
                            onChange={handleChangeDirection}
                            isSelectAll={true}
                            menuPlacement={"bottom"}
                            className='select'
                        />
                    </div>
                    <div className="btn-wrapper">
                        <button className='btn-search'><img src='../../../../public/search.png' /></button>
                    </div>
                </form>

                <form className='form-ad'>
                    <div className="theme-ad-container">
                        <label htmlFor="themeAd" />
                        <input
                            type="text"
                            name='themeAd'
                            id='tehemeAd'
                            className='theme-ad-input'
                            placeholder="Тема объявления"
                            maxLength='50'
                            required />
                    </div>

                    <div className="description-ad-container">
                        <label htmlFor="descriptionAd" />
                        <textarea
                            name="descriptionAd"
                            id="descriptionAd"
                            className="description-ad-input"
                            spellCheck='true'
                            placeholder="Описание объявления"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-publish">Выложить</button>
                </form>
            </div>

            <div className="student-list-wrapper">

                <div className="student-list-container">
                    <div className='title-container'>
                        <h3 className='fio-title'>ФИО</h3>
                        <h3 className='group-title'>Группа</h3>
                        <h3 className="mailing-title">Рассылка</h3>
                    </div>
                    <form className='form-student'>
                        <ul className="student-list">

                            {students.map(student => {
                                return (
                                    <li className="student-item" key={student.id}>
                                        <p className='student'>{student.name}</p>
                                        <p className='group'>{student.group}</p>
                                        <p className='mailing'>
                                            <input
                                                type='checkbox'
                                                className='mailing-checkbox'
                                                id='custom-checkbox'
                                                value={student}
                                                onChange={(e) => handleStudentSelect(e, student)}
                                                checked={selectedStudents.includes(student)} />
                                            <label htmlFor="custom-checkbox"></label>
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>

                        <p className='checked-all-container'>Выбрать всех <input
                            onClick={() => setSelectedStudents(students)}
                            className='checked-all-input'
                            type='checkbox'
                            checked={selectedStudents.length === students.length}
                            onChange={(e) => handleSelectAll(e)}
                        />
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}