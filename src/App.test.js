import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App'; // Adjust the import path as necessary

describe('App Component', () => {
  const setup = (initialRoute = '/') => {
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  it('renders the home page by default', () => {
    setup();
    expect(screen.getByText('Home Page')).toBeInTheDocument(); 
  });

  it('renders the about page when navigating to /about', () => {
    setup('/about');
    expect(screen.getByText('About Page')).toBeInTheDocument(); 
  });

  it('renders the Pets page when navigating to /pets', () => {
    setup('/pets');
    expect(screen.getByText('Pets Page')).toBeInTheDocument(); 
  });

  it('renders the Animal Types page when navigating to /animalTypes', () => {
    setup('/animalTypes');
    expect(screen.getByText('Animal Types Page')).toBeInTheDocument(); 
  });

  it('renders the Animal Type page for a specific type when navigating to /animalTypes/:type', () => {
    setup('/animalTypes/dogs');
    expect(screen.getByText('Animal Type Page: Dogs')).toBeInTheDocument(); 
  });

  it('renders the Email Subscriptions page when navigating to /emailsubscriptions', () => {
    setup('/emailsubscriptions');
    expect(screen.getByText('Email Subscriptions Page')).toBeInTheDocument(); 
  });

  it('renders the Login page when navigating to /login', () => {
    setup('/login');
    expect(screen.getByText('Login Page')).toBeInTheDocument(); 
  });

  it('renders the Signup page when navigating to /signup', () => {
    setup('/signup');
    expect(screen.getByText('Signup Page')).toBeInTheDocument(); 
  });

  it('renders the User Profile page when navigating to /userprofile', () => {
    setup('/userprofile');
    expect(screen.getByText('User Profile Page')).toBeInTheDocument(); 
  });

  it('always renders the Navbar', () => {
    setup();
    expect(screen.getByText('Navbar')).toBeInTheDocument(); 
  });
});
