import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext.jsx';
import { dummyProducts } from '../assets/assets.js';
import { toast } from 'react-hot-toast';
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //fetch all products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  //add product to cart
  const addToCart = (itemId) => {
    //deep copy the existing cart, so not mutating teh cartItems directly
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    toast.success('Added to Cart');
  };

  //update cart quantity
  const updateCartItems = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success('Cart updated');
  };

  //remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    toast.success('Removed from Cart');
    setCartItems(cartData);
  };

  //cart items count
  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  //get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += cartItems[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  //call the fetchProducts function when the component is mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItems,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
