import { useState } from "react";
import Input from "../Input";
import SubmitButton from '../../Buttons/Submit/SubmitButton'
import { Link } from "react-router-dom";
import './SignUpSection.css'

export default function SignUpForm() {
    const [inputInfo, setInputInfo] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        password: '',
        passwordRepeat: '',
        role: ''
    });

    function handleSubmit() {

    }

    return (
        <section className="sign-up container">
            <img src='../../../../public/imageAuthorization.png' alt='' />
            <form className="auth-form" onSubmit={handleSubmit}>

                <p>Имя</p>
                <Input
                    type='text'
                    id='firstName'
                    name='firstName'
                    autoComplete='off'
                    value={inputInfo.firstName}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                firstName: evt.target.value,
                            }
                        })
                    }}
                />

                <p>Фамилия</p>
                <Input
                    type='text'
                    id='lastName'
                    name='lastName'
                    autoComplete='off'
                    value={inputInfo.lastName}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                lastName: evt.target.value,
                            }
                        })
                    }}
                />

                <p>Отчество</p>
                <Input
                    type='text'
                    id='patronymic'
                    name='patronymic'
                    autoComplete='off'
                    value={inputInfo.patronymic}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                patronymic: evt.target.value,
                            }
                        })
                    }}
                />

                <p>Email</p>
                <Input
                    type='text'
                    id='email'
                    name='email'
                    autoComplete='off'
                    value={inputInfo.email}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                email: evt.target.value,
                            }
                        })
                    }}
                />

                <p>Пароль</p>
                <Input
                    type='text'
                    id='password'
                    name='password'
                    autoComplete='off'
                    value={inputInfo.password}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                password: evt.target.value,
                            }
                        })
                    }}
                />

                <p>Потверждение пароля</p>
                <Input
                    type='text'
                    id='passwordRepeat'
                    name='passwordRepeat'
                    autoComplete='off'
                    value={inputInfo.passwordRepeat}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                passwordRepeat: evt.target.value,
                            }
                        })
                    }}
                />

                <p>Роль</p>
                <label>
                    <select value={inputInfo.role} onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                role: evt.target.value,
                            }
                        })
                    }}>
                        <option aria-checked value='ROLE_USER'>Студент</option>
                        <option value='ROLE_MENTOR'>Тьютор</option>
                    </select>
                </label>

                <SubmitButton>Регистрация</SubmitButton>
            </form>

            <p>У меня уже есть аккаунт <Link to='/'>Войти</Link></p>
        </section>
    )
}

