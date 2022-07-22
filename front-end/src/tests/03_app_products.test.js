import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'
import GetProducts from '../API/GetProducts';


describe(" Products Component", () => {
  test("testa se mostra todos itens dos produtos", async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('common_login__input-email');
    userEvent.type(inputEmail, "zebirita@email.com");
   
    const inputPassword = screen.getByTestId('common_login__input-password');
    userEvent.type(inputPassword, "$#zebirita#$");

    const buttonLogin = screen.getByTestId('common_login__button-login');
    userEvent.click(buttonLogin);

    const CreateAccountRes = {
      status: 200,
      data: [
  {
    "id": 1,
    "name": "Skol Lata 250ml",
    "url_image": "http://localhost:3001/images/skol_lata_350ml.jpg",
    "price": "2.20"
  },
  {
    "id": 2,
    "name": "Heineken 600ml",
    "url_image": "http://localhost:3001/images/heineken_600ml.jpg",
    "price": "7.50"
  },
  {
    "id": 3,
    "name": "Antarctica Pilsen 300ml",
    "url_image": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
    "price": "2.49"
  },
]
    }

    jest.spyOn(axios, 'get').mockResolvedValue(CreateAccountRes);

  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/customer/products');
  })

    const item = screen.findByTestId('customer_products__img-card-bg-image--1');
    expect(item).toBeDefined();

    const item2 = screen.findByTestId('customer_products__img-card-bg-image--1');
    expect(item2).toBeDefined();

    const item3 = screen.findByTestId('customer_products__element-card-title--1');
    expect(item3).toBeDefined();

    const item4 = screen.findByTestId('customer_products__button-card-rm-item--1');
    expect(item4).toBeDefined();

    const item5 = screen.findByTestId('customer_products__button-card-add-item--1');
    expect(item5).toBeDefined();

    const item6 = screen.findByTestId('customer_products__input-card-quantity--1');
    expect(item6).toBeDefined();

    const item7 = screen.findByTestId('customer_products__checkout-bottom-value');
    expect(item7).toBeDefined();
});
});