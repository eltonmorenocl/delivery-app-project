import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import LayoutLogin from '../../Components/Layout/Login';
import DeliveryAppLogo from '../../images/DeliveryApp_Logo.png';
import Enter from '../../API/Enter';
import context from '../../Context/Context';
import './login.css';
import {
  fetchInformationFromLocalstorage,
  saveInformationToLocalstorage,
} from '../../Service/LocalSotorage';
import checkLoggedInUser from './Services';

export default function Login() {
  const [password, setPassword] = useState('');
  const [activeButton, setActiveButton] = useState(false);
  const [alert, setAlert] = useState(false);
  const { setName, email, setEmail, setToken, setRole } = useContext(context);
  const history = useHistory();

  useEffect(() => {
    const user = fetchInformationFromLocalstorage('user');
    checkLoggedInUser(history, user);
  });

  useEffect(() => {
    const regexEmail = /\S+@\S+\.\S+/;
    const minimumCharactersForPassword = 6;

    if (
      password.length >= minimumCharactersForPassword
      && regexEmail.test(email)
    ) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [email, password]);

  const validData = async (event) => {
    event.preventDefault();

    const response = await Enter(email, password);

    if (response && response.message) {
      setAlert(true);
      return;
    }

    saveInformationToLocalstorage('user', {
      name: response.name,
      email,
      role: response.role,
      token: response.token,
    });

    setName(response.name);
    setEmail(email);
    setToken(response.token);
    setRole(response.role);

    if (response.role === 'customer') history.push('/customer/products');
    if (response.role === 'seller') history.push('/seller/orders');
  };

  return (
    <LayoutLogin>
      <form className="login-form">
        <span className="login-form-title">
          <img src={ DeliveryAppLogo } alt="imagem da logotipo" />
        </span>

        <div className="wrap-input">
          <input
            className={ email.length > 0 ? 'input has-value' : 'input' }
            type="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            data-testid="common_login__input-email"
          />
          <span className="focus-input" data-placeholder="E-mail" />
        </div>

        <div className="wrap-input">
          <input
            className={ password.length > 0 ? 'input has-value' : 'input' }
            type="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            data-testid="common_login__input-password"
          />
          <span className="focus-input" data-placeholder="Senha" />
        </div>

        <div className="container-login-form-btn">
          <button
            className={ `login-form-btn ${!activeButton && 'btn-off'}` }
            onClick={ (event) => validData(event) }
            disabled={ !activeButton }
            type="submit"
            data-testid="common_login__button-login"
          >
            Entrar
          </button>
        </div>

        <div className="create-account-text-center">
          <span className="create-account-text">Não possui conta?</span>
          <button
            onClick={ () => history.push('/register') }
            type="button"
            className="create-account-link"
            data-testid="common_login__button-register"
          >
            Criar conta.
          </button>
        </div>
        {alert && (
          <p
            data-testid="common_login__element-invalid-email"
            className="alert"
          >
            Usuario ou senha incorreto
          </p>
        )}
      </form>
    </LayoutLogin>
  );
}
