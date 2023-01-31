import React, { useContext } from 'react';
import context from '../../Context/Context';
import { saveInformationToLocalstorage } from '../../Service/LocalSotorage';
import './table.css';

// tabela responsiva baseada no vídeo: https://youtu.be/ZtopjfXhUZI

function Table() {
  const { card, setCard } = useContext(context);

  const removeProduct = (id) => {
    const updated = card.filter((current) => current.id !== id);
    setCard(updated);
    saveInformationToLocalstorage('products', updated);
  };

  return (
    <table className="table">
      <thead>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-total</th>
        <th>Romover Item</th>
      </thead>
      <tbody>
        {card && card.map((current, index) => (
          <tr key={ index }>
            <td
              data-label="Item"
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-label="Descrição"
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {current.name}
            </td>
            <td
              data-label="Quantidade"
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {current.quantity}
            </td>
            <td
              data-label="Valor Unitário"
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              {Number(current.price).toFixed(2).replace('.', ',')}
            </td>
            <td
              data-label="Item"
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              {Number(current.price * current.quantity).toFixed(2).replace('.', ',')}
            </td>
            <td>
              <button
                className="table-remove"
                type="button"
                onClick={ () => removeProduct(current.id) }
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
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

export default Table;
