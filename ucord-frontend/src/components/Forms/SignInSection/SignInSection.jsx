import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './SignInSection.css'
import axios from 'axios';
import SubmitButton from '../../Buttons/Submit/SubmitButton';
import AuthService from '../../../services/AuthService';

// const apiUrl = 'http://localhost:8080/api/v1/auth/signin';

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
                email,
                password
            },
                {
                    withCredentials: true
                });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);

                navigate('/main')

                // const token = AuthService.getAccessToken();
                // const responseNew = await axios.get('http://localhost:8080/api/v1/app/user',
                //     {
                //         headers: {
                //             Authorization: `Bearer ${token}`
                //         }
                //     })


            }
        } catch (error) {
            console.error('Ошибка: ', error);

            // Здесь можно дополнительно обработать ошибки и попробовать обновить токен
            const refreshResponse = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {
                withCredentials: true,
            });

            if (refreshResponse.data.token) {
                localStorage.setItem('token', refreshResponse.data.accessToken);
            }
            console.log('токен обновлён')
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

            <p>У меня нет аккаунта <Link to='/'>Зарегистрироваться</Link></p>
            {/* 
            {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>} */}
        </section>
    )
}