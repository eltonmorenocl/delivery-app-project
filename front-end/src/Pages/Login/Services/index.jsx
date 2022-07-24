const checkLoggedInUser = (history, user) => {
  if (user && user.role === 'seller') {
    history.push('/seller/orders');
  } else if (user && user.role === 'customer') {
    history.push('/customer/products');
  } else if (user && user.role === 'administrator') {
    history.push('/admin/manage');
  }
};

export default checkLoggedInUser;
