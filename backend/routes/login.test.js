import React from 'react';
import { render, fireEvent, getAllByLabelText } from '@testing-library/react';
import Login from './Login';

test('renders login form', () => {
    const { getByLabelText, getByText } = render(<Login />);

    // Verify that the login form elements are being rendered
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
});

test('submits login form with valid credentials', () => {
    const { getByLabelText, getByText } = render(<Login />);

    // Test user input
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@testing.com' }});
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' }});
    fireEvent.change(getByText('Login'));
});