import Login from '@pages/auth/login/index';
import { render } from '@testing-library/react';

describe('Login', () => {
  it('renders login', () => {
    render(<Login />);
  });
});
