import React from 'react';

const LoginUI = () => {
    //State to track user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Function to handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email,
                password,
            });

            const token = response.data.token;

            console.log('Login successful! Token:', token);
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
        }
    }

return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <label>
                Email:
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type='submit'>Login</button>
        </form>
    </div >
    )
}

export default LoginUI;