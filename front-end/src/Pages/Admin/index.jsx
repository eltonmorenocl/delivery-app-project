import axios from 'axios';
import React, { useCallback, useEffect, useState, useReducer } from 'react';

import NavBar from '../../Components/Navbar';

import API_URL from '../../API/API_URL';
import { fetchInformationFromLocalstorage } from '../../Service/LocalSotorage';

import testsId from '../../tests/data-testid';

import './admin.css';
import TableAdmin from '../../Components/TableAdmin';

const linksAdmin = [
  {
    name: 'Gerenciar Usuários',
    link: '/admin/manage',
    testid: testsId[12],
  },
];

const reducer = (state, action) => {
  switch (action.type) {
  case 'SET_USER_NAME':
    return { ...state, name: action.payload };
  case 'SET_USER_EMAIL':
    return { ...state, email: action.payload };
  case 'SET_USER_PASSWORD':
    return { ...state, password: action.payload };
  case 'SET_USER_ROLE':
    return { ...state, role: action.payload };
  default:
    return state;
  }
};

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  role: 'seller',
};

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

export default function Admin() {
  const [token] = useState(
    () => fetchInformationFromLocalstorage('user').token,
  );
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isNewUserValid, setIsNewUserValid] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    const fetchedUsers = await axios.get(`${API_URL}user`, {
      headers: { Authorization: token },
    });

    setUsers(fetchedUsers.data);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = state;

    await axios
      .post(
        `${API_URL}user/register`,
        {
          name,
          email,
          password,
          role,
        },
        { headers: { Authorization: token } },
      )
      .then(() => setHasError(false))
      .catch(() => setHasError(true));

    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}user/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    fetchUsers();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch({ type: `SET_USER_${name}`, payload: value });
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, token]);

  useEffect(() => {
    const isNameValid = state.name.length >= MIN_NAME_LENGTH;
    const isPasswordValid = state.password.length >= MIN_PASSWORD_LENGTH;
    const isEmailValid = EMAIL_REGEX.test(state.email);

    setIsNewUserValid(isNameValid && isPasswordValid && isEmailValid);
  }, [state]);

  return (
    <>
      <NavBar links={ linksAdmin } />

      <form onSubmit={ handleSubmit } className="admin_form">
        <label htmlFor="NAME">
          Nome:
          <input
            type="text"
            id="NAME"
            name="NAME"
            value={ state.name }
            onChange={ handleChange }
            data-testid={ testsId[64] }
          />
        </label>

        <label htmlFor="EMAIL">
          Email:
          <input
            type="text"
            id="EMAIL"
            name="EMAIL"
            value={ state.email }
            onChange={ handleChange }
            data-testid={ testsId[65] }
          />
        </label>

        <label htmlFor="PASSWORD">
          Senha:
          <input
            type="text"
            id="PASSWORD"
            name="PASSWORD"
            value={ state.password }
            onChange={ handleChange }
            data-testid={ testsId[66] }
          />
        </label>

        <label htmlFor="ROLE">
          Cargo:
          <select
            name="ROLE"
            defaultValue={ state.role }
            onChange={ handleChange }
            data-testid={ testsId[67] }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={ !isNewUserValid }
          data-testid={ testsId[68] }
        >
          Cadastrar
        </button>

        {hasError && (
          <p data-testid="admin_manage__element-invalid-register">
            Erro ao cadastrar usuário
          </p>
        )}
      </form>

      <div className="admin_center_table">
        <div className="admin_table">
          <TableAdmin
            users={ users }
            testsId={ testsId }
            handleDelete={ handleDelete }
          />
        </div>
      </div>
    </>
  );
}
