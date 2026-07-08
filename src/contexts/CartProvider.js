'use client';

import { getCurrentCart, submitCart } from '@/actions/cartAcction';
import { createContext, useContext, useEffect, useState } from 'react';

// create context
const CartContext = createContext(null);
// custom hook
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // local state cart
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const getcurt = async () => {
      const { cart } = await getCurrentCart();
      setLocalCart(cart?.cartItems || []);
    };
    getcurt();
  }, []);

  /*cartProduct = {
    product: product?._id,
    title: product?.title,
    image: product?.images?.[0]?.url,
    price: product?.price,
    stock: product?.stock,
    quantity: 1,
  }; */

  // add to cart
  const addToCart = async cartProduct => {
    const exsits = localCart?.find(i => i.product === cartProduct.product);

    if (exsits) {
      if (cartProduct.stock < exsits.quantity) {
        return {
          status: false,
          message: 'Stock limit reached',
        };
      }
      setLocalCart(prev =>
        prev.map(i =>
          i.product === cartProduct.product
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      );
    } else {
      setLocalCart(prev => [...prev, cartProduct]);
    }
    const res = await submitCart('ADDTOCART', cartProduct);
    return res;
  };

  //increment
  const increment = async cartProduct => {
    const exists = localCart?.find(i => i.product === cartProduct.product);

    if (!exists) {
      setLocalCart(prev => [...prev, cartProduct]);
    } else {
      if (cartProduct.stock < exists.quantity) {
        return {
          status: false,
          message: 'Stock limit reached',
        };
      }
      setLocalCart(prev =>
        prev.map(i =>
          i.product === cartProduct.product
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      );
    }
    const res = await submitCart('INCREMENT', cartProduct);
    return res;
  };

  //decrement
  const decrement = async cartProduct => {
    const exsits = localCart?.find(i => i.product === cartProduct.product);
    if (!exsits) {
      setLocalCart(prev => [...prev, cartProduct]);
    } else {
      if (1 > exsits.quantity) {
        return {
          status: false,
          message: 'Minimum quantity reached',
        };
      }
      setLocalCart(prev =>
        prev.map(i =>
          i.product === cartProduct.product
            ? { ...i, quantity: i.quantity - 1 }
            : i,
        ),
      );
    }
    const res = await submitCart('DECREMENT', cartProduct);
    return res;
  };

  // delete cart

  const remove = async cartProduct => {
    const exsits = localCart?.find(i => i.product === cartProduct.product);
    if (!exsits) {
      return {
        success: false,
        message: 'Product not Found!',
      };
    } else {
      setLocalCart(prev => prev.filter(i => i.product !== cartProduct.product));
    }
    const res = await submitCart('REMOVE', cartProduct);
    return res;
  };

  // clear cart
  const clearCart = async () => {
    setLocalCart([]);
    const res = await submitCart('REMOVE');
    return res;
  };

  /* provide */
  const value = {
    increment,
    decrement,
    remove,
    clearCart,
    addToCart,
    localCart,
  };

  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
