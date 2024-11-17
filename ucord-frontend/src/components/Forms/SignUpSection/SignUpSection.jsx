import { useState } from "react";
import Input from "../Input";
import SubmitButton from '../../Buttons/Submit/SubmitButton'
import { Link, useNavigate } from "react-router-dom";
import './SignUpSection.css'
import axios from "axios";
import { validateAndJoinFIO } from "../ValidateAndJoinFIO";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')

    const [inputInfo, setInputInfo] = useState({
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        group: '',
        role: 'ROLE_USER'
    });

    async function handleSubmit(evt) {
        evt.preventDefault();

        const usernameCorrect = validateAndJoinFIO(inputInfo.username);

        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/auth/register',
            data: {
                username: usernameCorrect,
                email: inputInfo.email,
                password: inputInfo.password,
                role: inputInfo.role,
                groupName: inputInfo.group,
            }
        }

        await axios(config)
            .then(response => {
                if (response.status === 200) {
                    navigate('/signin')
                }
            })
            .catch(error => {
                console.error('Ошибка при регистрации:', error);
                setErrorMessage('Произошла ошибка при регистрации. Попробуйте еще раз.');
            })

        // try {
        //     const response = await axios.post('http://localhost:8080/api/v1/auth/register',
        //         {
        //             username: usernameCorrect,
        //             email: inputInfo.email,
        //             password: inputInfo.password,
        //             role: inputInfo.role,
        //             groupName: inputInfo.group,
        //         });


        //     if (response.status === 200) {
        //         navigate('/signin');
        //     } else {
        //         throw new Error('Не удалось зарегистрироваться')
        //     }
        // } catch (error) {
        //     console.error('Ошибка при регистрации:', error);
        //     setErrorMessage('Произошла ошибка при регистрации. Попробуйте еще раз.');

        // }
    }

    return (
        <section className="sign-up container">
            <img src='../../../../public/imageAuthorization.png' alt='' />
            <form className="auth-form" onSubmit={handleSubmit}>

                <p>ФИО</p>
                <Input
                    type='text'
                    id='username'
                    name='username'
                    autoComplete='off'
                    value={setInputInfo.username}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                username: evt.target.value
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
                                email: evt.target.value
                            }
                        })
                    }}
                />

                <p>Пароль</p>
                <Input
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='off'
                    value={inputInfo.password}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                password: evt.target.value
                            }
                        })
                    }}
                />

                <p>Потверждение пароля</p>
                <Input
                    type='password'
                    id='passwordRepeat'
                    name='passwordRepeat'
                    autoComplete='off'
                    value={inputInfo.passwordRepeat}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                passwordRepeat: evt.target.value
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
                                role: evt.target.value
                            }
                        })
                    }}>
                        <option aria-checked value='ROLE_USER'>Студент</option>
                        <option value='ROLE_TUTOR_UNRECOGNIZED'>Тьютор</option>
                    </select>
                </label>

                {inputInfo.role === 'ROLE_USER' &&
                    <>
                        <p>Академическая группа</p>
                        <Input
                            type='text'
                            id='group'
                            name='group'
                            autoComplete='off'
                            value={inputInfo.group}
                            onChange={(evt) => {
                                setInputInfo(props => {
                                    return {
                                        ...props,
                                        group: evt.target.value
                                    }
                                })
                            }}
                        />
                    </>
                }

                <SubmitButton>Регистрация</SubmitButton>
            </form>

            {errorMessage && <p>{errorMessage}</p>}


            <p>У меня уже есть аккаунт <Link to='/signin'>Войти</Link></p>
        </section>
    )
}

