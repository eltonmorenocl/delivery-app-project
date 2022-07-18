import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from './Context';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [products, setProducts] = useState([]);
  const [card, setCard] = useState([]);
  const [sellerList, setSellerList] = useState([]);

  const contextValue = {
    name,
    setName,
    token,
    setToken,
    email,
    setEmail,
    role,
    setRole,
    products,
    setProducts,
    card,
    setCard,
    sellerList,
    setSellerList,
  };

  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
