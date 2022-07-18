import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../Components/Navbar';
import Table from '../../Components/TableDetailOrders';
import DATA_TEST_ID from '../../tests/data-testid';
import context from '../../Context/Context';

function OrderDetail(props) {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);

  const { token } = useContext(context);

  useEffect(() => {
    const { match } = props;
    const response = async () => {
      const res = await axios.get(`http://localhost:3001/sales/${match.params.id}`, {
        headers: {
          Authorization: token,
        },
      });
      setOrder(res.data);
      setProducts(res.data.products);
    };
    response();
  }, [props, token]);

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
            <h1 className="checkout-title">Detalhes do pedidos</h1>
            <div>
              <p
                data-testid={ DATA_TEST_ID[37] }
              >
                PEDIDO
                {' '}
                {order.id}
              </p>
              <p
                data-testid={ DATA_TEST_ID[38] }
              >
                P.VEND:
                {order.seller.name}
              </p>
              <p
                data-testid={ DATA_TEST_ID[39] }
              >
                {order.saleDate}
              </p>
              <p
                data-testid={ DATA_TEST_ID[40] }
              >
                {order.status}
              </p>
              <p data-testid={ DATA_TEST_ID[47] }>
                MARCAR COMO ENTREGUE
              </p>
            </div>
            <div className="checkout-main-content">
              {
                products[0] && (
                  <div className="checkout-order-list">
                    <Table products={ products } />

                    <h3
                      className="chackout-amount"
                      data-testid={
                        `${DATA_TEST_ID[46]}${order.id}`
                      }
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
