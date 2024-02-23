import React from 'react';
import { render, fireEvent, getAllByLabelText } from '@testing-library/react';
import Signup from './signup';

test('renders signup form', () => {
    const { getByLabelText, getByText } = render(<Signup />);

    // Verify that the signup form elements are being rendered
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
});

test('submits signup form with valid credentials', () => {
    const { getByLabelText, getByText } = render(<Signup />);

    // Test user input
    fireEvent.change(getByLabelText('Username'), { target: { value: 'testuser' }});
    fireEvent.change(getByLabelText('Email'), { target: { value: 'test@testing.com' }});
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' }});
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password' }});
    fireEvent.click(getByText('Sign Up'));
});