import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../Components/Navbar';
import Table from '../../Components/TableDetailOrders';
import DATA_TEST_ID from '../../tests/data-testid';
import './orderDetail.css';
import { fetchInformationFromLocalstorage } from '../../Service/LocalSotorage';
import { getOrder, updateOrderStatus } from '../../API/GetOrderById';

function OrderDetail(props) {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [button, setButton] = useState(true);
  const [dateFormat, setDate] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const { token } = fetchInformationFromLocalstorage('user');

  useEffect(() => {
    const { match } = props;

    const setPageStates = async () => {
      const orderDetail = await getOrder(match.params.id, token);

      setOrder(orderDetail);
      setProducts(orderDetail.products);
      setOrderStatus(orderDetail.status);
      setDate(new Intl.DateTimeFormat('pt-br')
        .format(new Date(orderDetail.saleDate)));

      if (orderDetail.status === 'Em Trânsito') {
        setButton(false);
      }
    };

    setPageStates();
  }, [props, token]);

  const setDeliveredOrder = async () => {
    const { match } = props;

    await updateOrderStatus(match.params.id, token);

    setButton(true);
    setOrderStatus('Entregue');
  };

  const linksProducts = [
    {
      name: 'Produtos',
      link: '/customer/products',
      testid: 'customer_products__element-navbar-link-products',
    },
    {
      name: 'Meus pedidos',
      link: '/customer/orders',
      testid: 'customer_products__element-navbar-link-orders',
    },
  ];

  return (
    <>
      <NavBar links={ linksProducts } />
      {
        order.id && (
          <div>
            <h1 className="detail-title">Detalhes do pedidos</h1>
            <div className="order-detail-container">
              <p
                className="oder-detail-content"
                data-testid={ DATA_TEST_ID[37] }
              >
                PEDIDO
                {' '}
                {order.id}
              </p>
              <p
                className="oder-detail-content"
                data-testid={ DATA_TEST_ID[38] }
              >
                Vendedor(a):
                {order.seller.name}
              </p>
              <p
                className="oder-detail-content"
                data-testid={ DATA_TEST_ID[39] }
              >
                {dateFormat}
              </p>
              <p
                className="oder-detail-content"
                data-testid={ DATA_TEST_ID[40] }
              >
                {orderStatus}
              </p>

              <button
                type="button"
                className="order-delivered-check"
                onClick={ setDeliveredOrder }
                disabled={ button }
                data-testid={ DATA_TEST_ID[47] }
              >
                MARCAR COMO ENTREGUE
              </button>

            </div>
            <div className="detail-main-content">
              {
                products[0] && (
                  <div className="detail-order-list">
                    <Table products={ products } />

                    <h3
                      className="detail-amount"
                      data-testid="customer_order_details__element-order-total-price"
                    >
                      Valor total:
                      {` ${products
                        .reduce(
                          (previous, current) => (
                            previous + current.price * current.quantity
                          ),
                          0,
                        )
                        .toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}
                    </h3>
                  </div>

                )
              }
            </div>
          </div>)
      }
    </>
  );
}

OrderDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default OrderDetail;
