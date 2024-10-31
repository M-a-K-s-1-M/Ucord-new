import { Link } from 'react-router-dom';
import { useState } from 'react'
import './SignInSection.css'
import axios from 'axios';
import SubmitButton from '../../Buttons/Submit/SubmitButton';

// const apiUrl = 'http://localhost:8080/api/v1/auth/signin';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async (evt) => {
        evt.PreventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken)

            setResponseData(response.data);

        } catch (error) {
            console.error('Ошибка: ', error);
        }
    }

    return (
        <section className='sign-in container'>
            <img src="../../public/imageAuthorization.png"></img>
            <form className="auth-form" onSubmit={handleSubmit}>
                <p>Email</p>
                <label title="Email" htmlFor="email" >
                    <input
                        type='email'
                        id='email'
                        name='email'
                        autoComplete='off'
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                        required
                    ></input>
                </label><br />

                <p>Пароль</p>
                <label title="Пороль" htmlFor="password">
                    <input
                        type='password'
                        id='password'
                        name='password'
                        autoComplete="off"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        required

                    ></input>
                </label><br />

                <SubmitButton>Вход</SubmitButton>
            </form>

            <p>У меня нет аккаунта <Link to='/signup'>Зарегистрироваться</Link></p>

            {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
        </section>
    )
}