import Login from '@pages/auth/login/index';
import { store } from '@store/index';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
      // ... whatever else you you call on `router`
    };
  },
}));

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  }; //fixing the window.matchMedia issue , need to mock it.

describe('Login', () => {
  it('renders login', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // checking if the fields have rendered or not
    expect(screen.getByTestId('userName')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('rememberMe')).toBeInTheDocument();
    expect(screen.getByTestId('signIn')).toBeInTheDocument();
  });

  it('should disable login button when required fields are empty', async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    // Find the login button
    const loginButton = screen.getByTestId('signIn');

    // Check if the login button is disabled when required fields are empty
    expect(loginButton).toBeDisabled();

    // Fill in the username field
    const usernameField = screen.getByLabelText('Username');
    await act(() => {
      fireEvent.change(usernameField, { target: { value: 'testuser' } });
    });

    // Check if the login button is still disabled
    expect(loginButton).toBeDisabled();

    // Fill in the password field
    const passwordField = screen.getByLabelText('Password');
    await act(() => {
      fireEvent.change(passwordField, { target: { value: 'testpassword' } });
    });

    // Check if the login button is now enabled
    expect(loginButton).toBeEnabled();
  });
});
