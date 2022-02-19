import SignUpPage from './SignUpPage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<SignUpPage />);
      const header = screen.queryByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });
    it('has username input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });
    it('has email input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('E-mail');
      expect(input).toBeInTheDocument();
    });
    it('has password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input.type).toBe('password');
    });
    it('has password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toBeInTheDocument();
    });
    it('has password type for password repeat input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password Repeat');
      expect(input.type).toBe('password');
    });
    it('has Sign Up button', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });
    it('has disables thie button initially', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    let button;
    let requestBody;
    let counter;

    const server = setupServer(
      rest.post('/api/1.0/users', (req, res, ctx) => {
        requestBody = req.body;
        counter += 1;
        return res(ctx.status(200));
      })
    );

    beforeEach(() => {
      counter = 0;
      server.listen();
    });
    afterEach(() => {
      server.close();
    });

    const setup = () => {
      render(<SignUpPage />);
      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('E-mail');
      const passwordInput = screen.getByLabelText('Password');
      const passwordInputRepeat = screen.getByLabelText('Password Repeat');
      button = screen.queryByRole('button', { name: 'Sign Up' });

      userEvent.type(usernameInput, 'user1');
      userEvent.type(emailInput, 'user1@mail.com');
      userEvent.type(passwordInput, 'abcd123');
      userEvent.type(passwordInputRepeat, 'abcd123');
    };

    it('enables the button when password & password repeat input have same value', () => {
      setup();
      expect(button).toBeEnabled();
    });
    it('sends username, email and password to backend when click the button', async () => {
      setup();
      userEvent.click(button);
      // axios 버전
      // const mockFn = jest.fn();
      // axios.post = mockFn;

      // userEvent.click(button);

      // const firstCallOfMockFunction = mockFn.mock.calls[0];
      // const body = firstCallOfMockFunction[1];

      // expect(body).toEqual({
      //   username: 'user1',
      //   email: 'user1@mail.com',
      //   password: 'abcd123',
      // });

      // fetch 버전
      // const mockFn = jest.fn();
      // window.fetch = mockFn;
      // userEvent.click(button);

      // const firstCallOfMockFunction = mockFn.mock.calls[0];
      // const body = JSON.parse(firstCallOfMockFunction[1].body);
      // expect(body).toEqual({
      //   username: 'user1',
      //   email: 'user1@mail.com',
      //   password: 'abcd123',
      // });

      // msw 버전
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'abcd123',
      });
    });
    it('disables button when there is an ongoing api call', async () => {
      setup();
      userEvent.click(button);
      userEvent.click(button);
      await new Promise(resolve => setTimeout(resolve, 500));
      expect(counter).toBe(1);
    });
  });
});
