import React from 'react';
import './tableAdmin.css';
import PropTypes from 'prop-types';

// tabela responsiva baseada no vídeo: https://youtu.be/ZtopjfXhUZI

function TableAdmin({ users, testsId, handleDelete }) {
  return (
    <table className="table">
      <thead>
        <th>ID</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Tipo</th>
        <th>Remover</th>
      </thead>
      <tbody>
        {users && users.map((current, index) => (
          <tr key={ index }>
            <td
              data-label="ID"
              data-testid={ `${testsId[69]}${index}` }
            >
              {current.id}
            </td>
            <td
              data-label="Nome"
              data-testid={ `${testsId[70]}${index}` }
            >
              {current.name}
            </td>
            <td
              data-label="E-mail"
              data-testid={ `${testsId[71]}${index}` }
            >
              {current.email || 'email indisponivel'}
            </td>
            <td
              data-label="Tipo"
              data-testid={ `${testsId[72]}${index}` }
            >
              {current.role}
            </td>
            <td>
              <button
                className="table-remove"
                type="button"
                onClick={ () => handleDelete(current.id) }
                data-testid={ `${testsId[73]}${index}` }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableAdmin.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
  testsId: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleDelete: PropTypes.string.isRequired,
};

export default TableAdmin;
