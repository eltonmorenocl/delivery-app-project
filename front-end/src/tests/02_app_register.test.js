import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateAccount from '../API/CreateAccount';

describe(" Register Component", () => {
  test("testa de possui o campo name", () => {
    const render = renderWithRouter(<App />);
    render.history.push('/register');
    
    const inputName = screen.getByTestId("common_register__input-name");
    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveValue('');
  });

  test("testa de possui o campo email", () => {
    const render = renderWithRouter(<App />);
    render.history.push('/register');
    
    const inputEmail = screen.getByTestId("common_register__input-email");
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
  });

  test("testa de possui o campo senha", () => {
    const render = renderWithRouter(<App />);
    render.history.push('/register');
    
    const inputPassword = screen.getByTestId("common_register__input-password");
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveValue('');
  });

  test("testa de possui o botao register", () => {
    const render = renderWithRouter(<App />);
    render.history.push('/register');
    
    const buttonRegister = screen.getByRole("button", {name: /registrar/i});
    expect(buttonRegister).toBeInTheDocument();
  });

  test("testa o fucionamento do register", async () => {
    const { history } =  renderWithRouter(<App />);
    history.push('/register');

    const CreateAccountRes = {
      status: 200,
      data: {
        user: {
          name: 'zebirita',
          email: 'zebirita@email.com'
        },
        token: 'ert.pwk.mfa'
      }
    }

    CreateAccount.post = jest.fn(() => Promise.resolve(CreateAccountRes));

    const inputName = screen.getByTestId("common_register__input-name");
    userEvent.type(inputName, 'testes teste2');
    expect(inputName).toHaveValue('testes teste2');
    
    const inputEmail = screen.getByTestId("common_register__input-email");
    userEvent.type(inputEmail, 'testes@testes2.com');
    expect(inputEmail).toHaveValue('testes@testes2.com');

    const inputPassword = screen.getByTestId("common_register__input-password");
    userEvent.type(inputPassword, 'testes2');
    expect(inputPassword).toHaveValue('testes2');

    const buttonRegister = screen.getByRole("button", {name: /registrar/i});
    userEvent.click(buttonRegister);

    waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/customer/products');
    })
  });
});
