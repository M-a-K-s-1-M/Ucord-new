import './NotificationsSection.css'
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NotificationsSection() {
    const navigate = useNavigate();
    async function handleOnClickUser(evt) {
        evt.preventDefault();

        try {
            const token = AuthService.getAccessToken();
            const response = await axios.get('http://localhost:8080/api/v1/app/user',
                {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                    // withCredentials: true
                }).catch(async (error) => {
                    localStorage.removeItem('token');
                    // AuthService.refreshTokens();

                    const responseNew = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {
                        withCredentials: true,
                    });

                    console.log('2')

                    if (responseNew.data.token) {
                        localStorage.setItem('token', responseNew.data.token);
                    }

                    const token = localStorage.getItem('token');

                    if (!token) {
                        navigate('/signin');
                        return
                    }

                    await axios.get('http://localhost:8080/api/v1/app/user',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            withCredentials: true
                        })
                    console.log('3')
                })

            console.log('1')

            // if (response.status !== 200) {
            // localStorage.removeItem('token');
            // // AuthService.refreshTokens();

            // const responseNew = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {
            //     withCredentials: true,
            // });

            // console.log('2')

            // if (responseNew.data.accessToken) {
            //     localStorage.setItem('token', responseNew.data.accessToken);
            // }

            // const token = localStorage.getItem('token');

            // if (!token) {
            //     navigate('/signin');
            //     return
            // }

            // await axios.get('http://localhost:8080/api/v1/app/user',
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         },
            //         withCredentials: true
            //     })
            // console.log('3')
            // }



        } catch (error) {
            console.log(error);
            // localStorage.removeItem('token');
            // // AuthService.refreshTokens();

            // const responseNew = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {
            //     withCredentials: true,
            // });

            // if (responseNew.data.accessToken) {
            //     localStorage.setItem('token', responseNew.data.accessToken);
            // }

            // const token = localStorage.getItem('token');

            // if (!token) {
            //     navigate('/signin');
            //     return
            // }

            // await axios.get('http://localhost:8080/api/v1/app/user',
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         },
            //         withCredentials: true
            //     })

        }
    }

    return (
        <section className="notifications-container">
            <header>Hello user</header>
            <button onClick={handleOnClickUser}>Кнопка 1</button>
            <button>Кнопка 2</button>
        </section>
    )
}