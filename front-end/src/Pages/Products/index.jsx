import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../Components/Navbar';
import getProducts from '../../API/GetProducts';
import ProductCard from '../../Components/Products/ProductCard';
import { fetchInformationFromLocalstorage } from '../../Service/LocalSotorage';

function Products() {
  const [products, setProducts] = useState([]);

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

      <main>
        {
          products.map((product) => (
            <ProductCard key={ product.id } cardProduct={ product } />
          ))
        }
      </main>
    </div>
  );
}

export default Products;
