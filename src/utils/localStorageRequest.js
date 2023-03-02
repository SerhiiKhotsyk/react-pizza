export const getLSCartData = () => {
  return {
    products: JSON.parse(window.localStorage.getItem('products') || '[]'),
    totalProductQuantity: JSON.parse(window.localStorage.getItem('totalProductQuantity') || '0'),
    totalPrice: JSON.parse(window.localStorage.getItem('totalPrice') || '0'),
  };
};

export const setLSCartData = (products, totalProductQuantity, totalPrice) => {
  window.localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  window.localStorage.setItem('totalProductQuantity', JSON.stringify(totalProductQuantity));
  window.localStorage.setItem('products', JSON.stringify(products));
};
