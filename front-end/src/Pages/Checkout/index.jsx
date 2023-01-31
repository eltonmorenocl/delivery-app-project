import React, { useEffect, useContext } from 'react';
import searchUser from '../../API/searchUser';
import CheckoutForm from '../../Components/Forms/CheckoutForm';
import NavBar from '../../Components/Navbar';
import Table from '../../Components/Table';
import context from '../../Context/Context';
import { fetchInformationFromLocalstorage } from '../../Service/LocalSotorage';
import './checkout.css';

function Checkout() {
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

  const { card, setCard, setSellerList } = useContext(context);

  useEffect(() => {
    const products = fetchInformationFromLocalstorage('products');
    setCard(products);

    const user = fetchInformationFromLocalstorage('user');

    const fetchData = async () => {
      const data = await searchUser(user.token, 'seller');
      setSellerList(data);
    };

    fetchData();
  }, [setCard, setSellerList]);

  return (
    <>
      <NavBar links={ linksProducts } />
      <div className="checkout">
        <h1 className="checkout-title">Carrinho</h1>
        <div className="checkout-main-content">
          <div className="checkout-order-list">
            <Table />
            <h3
              className="chackout-amount"
            >
              Valor total:
              {card ? (
                <span data-testid="customer_checkout__element-order-total-price">
                  {card
                    .reduce(
                      (previous, current) => previous + current.price * current.quantity,
                      0,
                    )
                    .toFixed(2)
                    .replace('.', ',')}
                </span>
              ) : (
                ' 0,00'
              )}
            </h3>
          </div>
        </div>
      </div>
      <div className="checkout">
        <h1 className="checkout-title">Detalhes para entrega</h1>
        <div className="checkout-main-content">
          <div className="checkout-order-list">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
