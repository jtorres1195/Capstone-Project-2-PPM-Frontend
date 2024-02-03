import React from 'react';

const signupUI = () => {
    //State to track user inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    //Function to handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || password !== confirmPassword);
        setErrorMessage('Please fill in all required fields and ensure passwords match');


        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Redirect to login page or any other page after successful signup
                history.push('/login');
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Signup failed.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setErrorMessage('Internal server error. Please try again later');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            {errorMessage && <p style={{ color: 'red'}}>{errorMessage}</p>}
            <form onSubmit={handleSignup}>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                <button type='submit'>Sign Up</button>
            </form>
        </div >
    )
}

export default signupUI;