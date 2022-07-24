import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../Components/Navbar';
import Table from '../../Components/TableDetailSellerOrders ';
import DATA_TEST_ID from '../../tests/data-testid';
import './orderDetailSeller.css';
import { fetchInformationFromLocalstorage } from '../../Service/LocalSotorage';
import { getOrder, updateDeliveringStatus,
  updatePreparingStatus } from '../../API/GetOrderById';

function OrderDetail(props) {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [buttonDelivering, setButtonDelivering] = useState(true);
  const [buttonPreparing, setButtonPreparing] = useState(true);
  const [dateFormat, setDate] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const { token } = fetchInformationFromLocalstorage('user');

  useEffect(() => {
    const { match } = props;

    const setPageStates = async () => {
      const orderDetail = await getOrder(match.params.id, token);
      console.log(orderDetail);
      setOrder(orderDetail);
      setProducts(orderDetail.products);
      setOrderStatus(orderDetail.status);
      setDate(new Intl.DateTimeFormat('pt-br')
        .format(new Date(orderDetail.saleDate)));

      if (orderDetail.status === 'Pendente') {
        setButtonPreparing(false);
      }
      if (orderDetail.status === 'Preparando') {
        setButtonDelivering(false);
      }
    };

    setPageStates();
  }, [props, token]);

  const setPreparing = async () => {
    const { match } = props;

    await updatePreparingStatus(match.params.id, token);

    setButtonPreparing(true);
    setButtonDelivering(false);
    setOrderStatus('Preparando');
  };

  const setDelivering = async () => {
    const { match } = props;

    await updateDeliveringStatus(match.params.id, token);

    setButtonDelivering(true);
    setOrderStatus('Em Trânsito');
  };

  const linksProducts = [
    {
      name: '',
      link: '',
      testid: '',
    },
    {
      name: 'Pedidos',
      link: '/seller/orders',
      testid: DATA_TEST_ID[12],
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
                data-testid={ DATA_TEST_ID[53] }
              >
                PEDIDO
                {' '}
                {order.id}
              </p>
              <p
                className="oder-detail-content"
                data-testid={ DATA_TEST_ID[55] }
              >
                {dateFormat}
              </p>
              <p
                className="oder-detail-content"
                data-testid={ DATA_TEST_ID[54] }
              >
                {orderStatus}
              </p>

              <button
                type="button"
                className="order-delivered-check"
                onClick={ setPreparing }
                disabled={ buttonPreparing }
                data-testid={ DATA_TEST_ID[56] }
              >
                PREPARAR PEDIDO
              </button>
              <button
                type="button"
                className="order-delivered-check"
                onClick={ setDelivering }
                disabled={ buttonDelivering }
                data-testid={ DATA_TEST_ID[57] }
              >
                SAIU PARA ENTREGA
              </button>

            </div>
            <div className="detail-main-content">
              {
                products[0] && (
                  <div className="detail-order-list">
                    <Table products={ products } />

                    <h3
                      className="detail-amount"
                      data-testid={ DATA_TEST_ID[63] }
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
