import React from 'react';
import PropTypes from 'prop-types';
import './table.css';
import DATA_TEST_ID from '../../tests/data-testid';

// tabela responsiva baseada no vídeo: https://youtu.be/ZtopjfXhUZI

function Table({ products }) {
  return (
    <table className="table">
      <thead>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-total</th>
      </thead>
      <tbody>
        {products.map((current, index) => (
          <tr key={ index }>
            <td
              data-label="Item"
              data-testid={
                `${DATA_TEST_ID[58]}${index}`
              }
            >
              {current.id}
            </td>
            <td
              data-label="Descrição"
              data-testid={ `${DATA_TEST_ID[59]}${index}` }
            >
              {current.name}
            </td>
            <td
              data-label="Quantidade"
              data-testid={ `${DATA_TEST_ID[60]}${index}` }
            >
              {current.quantity}
            </td>
            <td
              data-label="Valor Unitário"
              data-testid={ `${DATA_TEST_ID[61]}${index}` }
            >
              {current.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
            </td>
            <td
              data-label="Sub-total"
              data-testid={ `${DATA_TEST_ID[62]}${index}` }
            >
              {(current.price * current.quantity).toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Table;
