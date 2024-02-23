import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


test('renders home page', () => {
  render(<App />);
  const homeElement = screen.getByText(/Perfect Pet Match/i);
  expect(homeElement).toBeInTheDocument();
});

test('renders about page', () => {
  render(
    <Router initialEntries={['/about']}>
      <App />
    </Router>
  );
  const aboutElement = screen.getByText(/Adopt/i);
  expect(aboutElement).toBeInTheDocument();
});

test('renders adopt page', () => {
  render(
    <Router initialEntries={['/adopt']}>
      <App />
    </Router>
  );
  const adoptElement = screen.getByText(/Adopt/i);
  expect(adoptElement).toBeInTheDocument();
});

test('renders species page', () => {
  render(
    <Router initialEntries={['/species']}>
      <App />
    </Router>
  );
  const speciesElement = screen.getByText(/Species/i);
  expect(speciesElement).toBeInTheDocument();
});

test('renders login page', () => {
  render(
    <Router initialEntries={['/login']}>
      <App />
    </Router>
  );
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});

test('renders signup page', () => {
  render(
    <Router initialEntries={['/signup']}>
      <App />
    </Router>
  );
  const signupElement = screen.getByText(/Signup/i);
  expect(signupElement).toBeInTheDocument();
});

test('renders email subscription page', () => {
  render(
    <Router initialEntries={['/emailSubscription']}>
      <App />
    </Router>
  );
  const emailSubscriptionElement = screen.getByText(/EmailSubscription/i);
  expect(emailSubscriptionElement).toBeInTheDocument();
});

