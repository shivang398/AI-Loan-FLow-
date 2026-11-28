import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';
import LoginPage from '../pages/auth/LoginPage';
import App from '../App';

describe('Authentication & RBAC Integration', () => {
  it('renders login page correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/admin@realmoneygroups.in/i)).toBeInTheDocument();
  });

  it('handles successful login and redirects', async () => {
    // "/" is the public landing page; staff sign in at /login
    window.history.pushState({}, 'Login', '/login');
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Mock Login
    const emailInput = screen.getByPlaceholderText(/admin@realmoneygroups.in/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByRole('button', { name: /Sign In to Dashboard/i });

    // only company domains are accepted by the login form
    fireEvent.change(emailInput, { target: { value: 'admin@realmoneygroups.in' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check if redirected to dashboard (which has "Dashboard Overview")
      expect(screen.getByText(/Dashboard Overview/i)).toBeInTheDocument();
    }, { timeout: 5000 });   // the dashboard is lazy-loaded; allow time for its chunk on a slow CI machine
  });

  it('enforces RBAC for Admin routes', async () => {
    // Assuming user is already logged in as ADMIN from previous test
    // Navigate to admin users
    window.history.pushState({}, 'Users', '/admin/users');
    
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Staff screens are lazy-loaded, so allow time for the chunk to load
    expect(await screen.findByRole('heading', { name: /User Management/i }, { timeout: 15000 })).toBeInTheDocument();
  }, 20000);
});
