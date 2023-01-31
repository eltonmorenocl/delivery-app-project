import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from '../../Context/Context';

function ProductCard({ cardProduct, cartState }) {
  const { id, name, url_image: image, price } = cardProduct;
  const { setChange } = cartState;

  const { products, setProducts } = useContext(context);
  const [activeButton, setActiveButton] = useState(false);
  const [productQty, setProductQty] = useState(0);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (!savedProducts || savedProducts.length === 0) return null;

    setProducts(savedProducts);
  }, [setProducts]);

  useEffect(() => {
    if (productQty <= 0) setActiveButton(false);
    else setActiveButton(true);

    setChange((prev) => prev + 1);

    localStorage.setItem('products', JSON.stringify(products));
  }, [setChange, productQty, products]);

  useEffect(() => {
    const product = products.find((item) => item.id === id);

    if (!product) return null;

    setProductQty(product.quantity);
  }, [id, products]);

  const handleRemoveItem = () => {
    setProductQty(productQty - 1);
    cardProduct.quantity = productQty;

    if (products.find((item) => item.id === id) === undefined) {
      setProducts((prevProducts) => {
        prevProducts.push(cardProduct);
        return prevProducts;
      });
    }

    setProducts((prevProducts) => {
      const product = prevProducts.find((item) => item.id === id);
      product.quantity -= 1;

      if (product.quantity === 0) {
        const productNotOnCart = products.findIndex((item) => item.id === id);
        prevProducts.splice(productNotOnCart, 1);
        return prevProducts;
      }

      return prevProducts;
    });
  };

  const handleAddItem = async () => {
    await setProductQty(productQty + 1);
    cardProduct.quantity = productQty;

    if (products.find((item) => item.id === id) === undefined) {
      setProducts((prevProducts) => {
        prevProducts.push(cardProduct);
        return prevProducts;
      });
    }

    setProducts((prevProducts) => {
      const product = prevProducts.find((item) => item.id === id);
      product.quantity += 1;
      return prevProducts;
    });
  };

  const handleInputChange = ({ target }) => {
    const newValue = Number(target.value);
    setProductQty(newValue);
    cardProduct.quantity = productQty;

    if (products.find((item) => item.id === id) === undefined) {
      setProducts((prevProducts) => {
        prevProducts.push(cardProduct);
        return prevProducts;
      });
    }

    setProducts((prevProducts) => {
      const product = prevProducts.find((item) => item.id === id);
      product.quantity = newValue;

      if (product.quantity === 0) {
        const productNotOnCart = products.findIndex((item) => item.id === id);
        prevProducts.splice(productNotOnCart, 1);
        return prevProducts;
      }

      return prevProducts;
    });
  };

  return (
    <div className="product-card">

      <img
        data-testid={ `customer_products__img-card-bg-image--${id}` }
        src={ image }
        alt={ name }
        height="70px"
      />

      <div className="product-info">

        <span data-testid={ `customer_products__element-card-title--${id}` }>
          { name }
        </span>

        <span
          className="price"
          data-testid={ `customer_products__element-card-price--${id}` }
        >
          { `R$ ${price.replace('.', ',')}` }
        </span>

        <div className="product-quantity">
          <button
            data-testid={ `customer_products__button-card-rm-item--${id}` }
            type="button"
            disabled={ !activeButton }
            onClick={ handleRemoveItem }
          >
            -
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity--${id}` }
            value={ productQty }
            min={ 0 }
            onChange={ handleInputChange }
          />
          <button
            data-testid={ `customer_products__button-card-add-item--${id}` }
            type="button"
            onClick={ handleAddItem }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  cardProduct: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url_image: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  cartState: PropTypes.shape({
    priceChange: PropTypes.number,
    setChange: PropTypes.func,
  }).isRequired,
};

export default ProductCard;
