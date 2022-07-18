import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DeliveryAppName from '../../images/DeliveryApp_Name.png';
import context from '../../Context/Context';
import './navbar.css';

// Menu responsivo inspirado no vídeo: https://youtu.be/bHRXRYTppHM

function NavBar({ links }) {
  const [activeMenu, setActiveMenu] = useState(false);
  const { name, setName, setEmail, setToken, setRole } = useContext(context);

  const history = useHistory();

  const exit = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!name && user && user.name) {
      setName(user.name);
      setEmail(user.email);
      setToken(user.token);
      setRole(user.role);
    }
  });

  return (
    <header>
      <nav className="navbar">
        <img className="logo-name" src={ DeliveryAppName } alt="Delivery APP" />

        <button
          className="mobile-menu"
          onClick={ () => setActiveMenu(!activeMenu) }
          type="button"
        >
          <div className={ activeMenu ? 'line1' : '' } />
          <div className={ activeMenu ? 'line2' : '' } />
          <div className={ activeMenu ? 'line3' : '' } />
        </button>

        <ul
          className={ `nav-list ${
            activeMenu ? 'nav-list-active' : 'nav-list-off'
          }` }
        >
          {links.map((current, index) => (
            <li key={ index }>
              <Link
                className="navbar-li"
                to={ current.link }
                data-testid={ current.testid }
              >
                {current.name}
              </Link>
            </li>
          ))}
          <li>
            <span
              className="navbar-li"
              data-testid="customer_products__element-navbar-user-full-name"
            >
              {name || 'sem nome'}
            </span>
          </li>
          <li>
            <button
              className="navbar-li navbar-button"
              type="button"
              onClick={ () => exit() }
              data-testid="customer_products__element-navbar-link-logout"
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

NavBar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      testid: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default NavBar;
