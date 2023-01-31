import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../Components/Navbar';
import getProducts from '../../API/GetProducts';
import ProductCard from '../../Components/Products/ProductCard';
import Cart from '../../Components/Products/Cart';
import { fetchInformationFromLocalstorage } from '../../Service/LocalSotorage';
import './products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [changePrice, setChange] = useState(0);

  const history = useHistory();
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

  useEffect(() => {
    const componentDidMount = async () => {
      const allProducts = await getProducts();
      allProducts.forEach((item) => { item.quantity = 0; });
      setProducts(allProducts);
    };

    const user = fetchInformationFromLocalstorage('user');
    const minimumCharactersForToken = 50;

    if (!user || user.token.length < minimumCharactersForToken) {
      localStorage.removeItem('user');
      history.push('/login');
    }

    componentDidMount();
  }, [history]);

  return (
    <div>
      <NavBar links={ linksProducts } />

      <main className="product-page">

        <section className="products-cards">
          {
            products.map((product) => (
              <ProductCard
                key={ product.id }
                cardProduct={ product }
                cartState={ { changePrice, setChange } }
              />
            ))
          }
        </section>
        <Cart cartState={ { changePrice, setChange } } />
      </main>
    </div>
  );
}

export default Products;
