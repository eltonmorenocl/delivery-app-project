import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';
// import './cardOrders.css';

function CardOrders({ order, user }) {
  const history = useHistory();

  return user === 'seller' ? (
    <div
      onClick={ () => history.push(`/seller/orders/${order.id}`) }
      onKeyPress={ () => history.push(`/seller/orders/${order.id}`) }
      role="button"
      tabIndex={ order.id }
    >
      <div>
        <div>
          <p>Pedido</p>
          <h4 data-testid={ `seller_orders__element-order-id-${order.id}` }>
            {order.id}
          </h4>
        </div>
        <div>
          <h3
            data-testid={ `seller_orders__element-delivery-status-${order.id}` }
          >
            {order.status}
          </h3>
        </div>
        <div>
          <h4 data-testid={ `seller_orders__element-order-date-${order.id}` }>
            {new Intl.DateTimeFormat('pt-br').format(new Date(order.saleDate))}
          </h4>
          <h4 data-testid={ `seller_orders__element-card-price-${order.id}` }>
            {Number(order.totalPrice).toFixed(2).replace('.', ',')}
          </h4>
        </div>
      </div>
      <p data-testid={ `seller_orders__element-card-address-${order.id}` }>
        {`${order.address.street}, ${order.address.number}`}
      </p>
    </div>
  ) : (
    <div
      onClick={ () => history.push(`/customer/orders/${order.id}`) }
      onKeyPress={ () => history.push(`/customer/orders/${order.id}`) }
      role="button"
      tabIndex={ order.id }
    >
      <div>
        <div>
          <p>Pedido</p>
          <h4 data-testid={ `customer_orders__element-order-id-${order.id}` }>
            {order.id}
          </h4>
        </div>
        <div>
          <h3
            data-testid={ `customer_orders__element-delivery-status-${order.id}` }
          >
            {order.status}
          </h3>
        </div>
        <div>
          <h4 data-testid={ `customer_orders__element-order-date-${order.id}` }>
            {new Intl.DateTimeFormat('pt-br').format(new Date(order.saleDate))}
          </h4>
          <h4 data-testid={ `customer_orders__element-card-price-${order.id}` }>
            {Number(order.totalPrice).toFixed(2).replace('.', ',')}
          </h4>
        </div>
      </div>
    </div>
  );
}

CardOrders.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.string.isRequired,
};

export default CardOrders;
