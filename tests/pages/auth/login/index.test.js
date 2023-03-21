import Login from '@pages/auth/login/index';
import { store } from '@store/index';
import { Provider } from 'react-redux';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
      // ... whatever else you you call on `router`
    };
  },
}));


describe('Login', () => {
  it('renders login', () => {
    <Provider store={store}>
      render(<Login />, {});
    </Provider>
  });
});
