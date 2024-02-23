import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

test('renders navbar links', () => {
    render(
        <Router>
            <Navbar />
        </Router>
    );

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();

    const adoptLink = screen.getByText(/Adopt/i);
    expect(adoptLink).toBeInTheDocument();

    const speciesLink = screen.getByText(/Species/i);
    expect(speciesLink).toBeInTheDocument();

    const subscribeLink = screen.getByText(/Subscribe/i);
    expect(subscribeLink).toBeInTheDocument();

    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();
});

test('renders login and signup links when not logged in', () => {
    render(
        <Router>
            <Navbar />
        </Router>
    );

    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();

    const signupLink = screen.getByText(/Sign Up/i);
    expect(signupLink).toBeInTheDocument();

    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
});

test('renders logout button when logged in', () => {
    render(
        <Router>
            <Navbar isLoggedIn={true} />
        </Router>
    );

    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();

    expect(screen.queryByText(/Login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Up/i)).not.toBeInTheDocument();
});
