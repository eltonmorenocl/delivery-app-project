import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import axios from 'axios'

test('Alterando o valor dos campos e testando o valor guardado', () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('common_login__input-email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail).toHaveValue('');
  userEvent.type(inputEmail, 'adm@deliveryapp.com');
  expect(inputEmail).toHaveValue('adm@deliveryapp.com');

  const inputPassword = screen.getByTestId('common_login__input-password');
  expect(inputPassword).toBeInTheDocument();
  expect(inputPassword).toHaveValue('');
  userEvent.type(inputPassword, '--adm2@21!!--');
  expect(inputPassword).toHaveValue('--adm2@21!!--');
});

test('Se todos os componentes necessários se encontrando na página', () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('common_login__input-email');
  expect(inputEmail).toBeInTheDocument();

  const inputPassword = screen.getByTestId('common_login__input-password');
  expect(inputPassword).toBeInTheDocument();

  const buttonLogin = screen.getByTestId('common_login__button-login');
  expect(buttonLogin).toBeInTheDocument();

  const buttonRegister = screen.getByTestId('common_login__button-register');
  expect(buttonRegister).toBeInTheDocument();

  const errorMessage = screen.queryByTestId('common_login__element-invalid-email');
  expect(errorMessage).toBeNull();
});

test('Se o botão de registro funciona', () => {
  const { history } = renderWithRouter(<App />);

  const buttonRegister = screen.getByTestId('common_login__button-register');
  expect(buttonRegister).toBeInTheDocument();
  userEvent.click(buttonRegister);

  const { pathname } = history.location;
  expect(pathname).toBe('/register');

});

test('Se o botão de login funciona', async () => {
  const { history } = renderWithRouter(<App />);

  const CreateAccountRes = {
    status: 200,
    data: {
      user: {
        name: 'zebirita',
        email: 'zebirita@email.com'
      },
      token: 'ert.pwk.mfa',
      role: 'customer',
    }
  }

  jest.spyOn(axios, 'post').mockResolvedValue(CreateAccountRes);

  const inputEmail = screen.getByTestId('common_login__input-email');
  expect(inputEmail).toBeInTheDocument();
  userEvent.type(inputEmail, 'zebirita@email.com');
  expect(inputEmail).toHaveValue('zebirita@email.com');

  const inputPassword = screen.getByTestId('common_login__input-password');
  expect(inputPassword).toBeInTheDocument();
  userEvent.type(inputPassword, '$#zebirita#$');
  expect(inputPassword).toHaveValue('$#zebirita#$');

  const buttonLogin = screen.getByTestId('common_login__button-login');
  expect(buttonLogin).toBeInTheDocument();
  userEvent.click(buttonLogin);

  
  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/customer/products');
  })
});

test('Se o botão de REGISTER funciona', async () => {
  const { history } = renderWithRouter(<App />);

  const buttonRegister = screen.getByTestId('common_login__button-register');
  expect(buttonRegister).toBeInTheDocument();
  userEvent.click(buttonRegister);
  
  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/register');
  })
});