import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import React from 'react';
import './cardOrders.css';

function CardOrders({ order, user }) {
  const history = useHistory();

  return user === 'seller' ? (
    <div
      className={ `cardOrders ${
        order.status === 'Em Trânsito' ? 'cardOrders_in-transit' : ''
      }${order.status === 'Preparando' ? 'cardOrders_in-preparing' : ''}${
        order.status === 'Entregue' ? 'cardOrders_delivered' : ''
      }` }
      onClick={ () => history.push(`/seller/orders/${order.id}`) }
      onKeyPress={ () => history.push(`/seller/orders/${order.id}`) }
      role="button"
      tabIndex={ order.id }
    >
      <div className="cardOrders_card">
        <div className="cardOrders_request">
          <p>Pedido:</p>
          <p data-testid={ `seller_orders__element-order-id-${order.id}` }>
            {order.id}
          </p>
        </div>
        <div className="cardOrders_status">
          <p>Status:</p>
          <p data-testid={ `seller_orders__element-delivery-status-${order.id}` }>
            {order.status}
          </p>
        </div>
        <div className="cardOrders_date">
          <p>Data:</p>
          <p data-testid={ `seller_orders__element-order-date-${order.id}` }>
            {new Intl.DateTimeFormat('pt-br').format(new Date(order.saleDate))}
          </p>
        </div>
        <div className="cardOrders_price">
          <p>Valor:</p>
          <p data-testid={ `seller_orders__element-card-price-${order.id}` }>
            {Number(order.totalPrice).toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>
      <p data-testid={ `seller_orders__element-card-address-${order.id}` }>
        {`${order.address.street}, ${order.address.number}`}
      </p>
    </div>
  ) : (
    <div
      className={ `cardOrders ${
        order.status === 'Em transito' ? 'cardOrders_in-transit' : ''
      }${order.status === 'Preparando' ? 'cardOrders_in-preparing' : ''}${
        order.status === 'Entregue' ? 'cardOrders_delivered' : ''
      }` }
      onClick={ () => history.push(`/customer/orders/${order.id}`) }
      onKeyPress={ () => history.push(`/customer/orders/${order.id}`) }
      role="button"
      tabIndex={ order.id }
    >
      <div className="cardOrders_card">
        <div className="cardOrders_request">
          <p>Pedido:</p>
          <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
            {order.id}
          </p>
        </div>
        <div className="cardOrders_status">
          <p>Status:</p>
          <p
            data-testid={ `customer_orders__element-delivery-status-${order.id}` }
          >
            {order.status}
          </p>
        </div>
        <div className="cardOrders_date">
          <p>Data:</p>
          <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
            {new Intl.DateTimeFormat('pt-br').format(new Date(order.saleDate))}
          </p>
        </div>
        <div className="cardOrders_price">
          <p>Valor:</p>
          <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
            {Number(order.totalPrice).toFixed(2).replace('.', ',')}
          </p>
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
