import { Link, useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import LayoutLogin from '../../Components/Layout/Login';
import DeliveryAppLogo from '../../images/DeliveryApp_Logo.png';
import context from '../../Context/Context';
import './register.css';
import CreateAccount from '../../API/CreateAccount';
import { saveInformationToLocalstorage } from '../../Service/LocalSotorage';

export default function Register() {
  const [password, setPassword] = useState('');
  const [activeButton, setActiveButton] = useState(false);
  const [alert, setAlert] = useState(false);
  const { name, setName, email, setEmail, setToken, setRole } = useContext(context);
  const history = useHistory();

  useEffect(() => {
    const regexEmail = /\S+@\S+\.\S+/;
    const minimumCharactersForPassword = 6;
    const minimumCharactersForName = 12;

    if (
      password.length >= minimumCharactersForPassword
      && regexEmail.test(email)
      && name.length >= minimumCharactersForName
    ) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [name, email, password]);

  const validData = async (event) => {
    event.preventDefault();

    const response = await CreateAccount(name, email, password);

    if (response && response.message) {
      setAlert(true);
      return;
    }

    saveInformationToLocalstorage('user', {
      name,
      email,
      role: response.role,
      token: response.token,
    });

    setToken(response.token);
    setRole(response.role);
    history.push('/customer/products');
  };

  return (
    <LayoutLogin>
      <form className="register-form">
        <span className="register-form-title register-logotipo">
          <img src={ DeliveryAppLogo } alt="imagem da logotipo" />
        </span>

        <div className="wrap-input">
          <input
            className={ `input ${name.length > 0 && 'has-value'}` }
            type="text"
            minLength={ 3 }
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
            data-testid="common_register__input-name"
          />
          <span className="focus-input" data-placeholder="Nome" />
        </div>

        <div className="wrap-input">
          <input
            className={ email.length > 0 ? 'input has-value' : 'input' }
            type="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            data-testid="common_register__input-email"
          />
          <span className="focus-input" data-placeholder="E-mail" />
        </div>

        <div className="wrap-input">
          <input
            className={ password.length > 0 ? 'input has-value' : 'input' }
            type="password"
            minLength={ 6 }
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            data-testid="common_register__input-password"
          />
          <span className="focus-input" data-placeholder="Senha" />
        </div>

        <div className="container-register-form-btn">
          <button
            className={ `register-form-btn ${!activeButton && 'btn-off'}` }
            onClick={ (event) => validData(event) }
            disabled={ !activeButton }
            type="submit"
            data-testid="common_register__button-register"
          >
            Registrar
          </button>
        </div>

        <div className="create-account-text-center">
          <span className="create-account-text">Já possui conta?</span>
          <Link to="/login" className="login-account-link">
            Fazer login.
          </Link>
        </div>
        {alert && (
          <p
            data-testid="common_register__element-invalid_register"
            className="alert"
          >
            Usuário já registrado
          </p>
        )}
      </form>
    </LayoutLogin>
  );
}
