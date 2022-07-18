import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from '../../Context/Context';

function Cart({ cartState }) {
  const { products, setProducts } = useContext(context);
  const [totalPrice, setTotalPrice] = useState('0');
  // const [activeButton, setActiveButton] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setTotalPrice('0');
    const calculateTotalPrice = () => {
      products.forEach((product) => {
        setTotalPrice((prevPrice) => {
          const price = Number(prevPrice.replace(',', '.'));
          return (price + (Number(product.price) * product.quantity))
            .toFixed(2).replace('.', ',');
        });
      });
    };

    calculateTotalPrice();
  }, [products, setTotalPrice, setProducts, cartState]);

  return (
    <div data-testid="customer_products__checkout-bottom-value">
      <button
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ (totalPrice === '0' || totalPrice === '0,00') }
        onClick={ () => history.push('/customer/checkout') }
      >
        { `Ver Carrinho: R$ ${totalPrice}` }
      </button>
    </div>
  );
}

Cart.propTypes = {
  cartState: PropTypes.shape({
    priceChange: PropTypes.number,
    setChange: PropTypes.func,
  }).isRequired,
};

export default Cart;
