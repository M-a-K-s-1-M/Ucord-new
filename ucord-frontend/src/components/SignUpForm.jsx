import { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRole] = useState('ROLE_USER');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
                username,
                email,
                password,
                roles: 'ROLE_USER'
            });

            console.log('Успешная авторизация:', response.data);
            // Здесь можно добавить логику после успешной авторизации
        } catch (error) {
            console.error('Ошибка при авторизации:', error.response?.data || error.message);
            // Здесь можно добавить обработку ошибок
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Имя пользователя"
                    required
                />
            </label>

            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="почта"
                required
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
            />

            <select value={roles} onChange={(evt) => setRole(evt.target.value)}>
                <option value='ROLE_USER'>Студент</option>
                <option value='ROLE_MENTER'>Тьютор</option>
            </select>
            <button type="submit">Авторизация</button>
        </form>
    );
}

export default SignUpForm;
