import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface CheckoutContextType {
  cart: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  setShipping: (info: ShippingInfo) => void;
  setPayment: (info: PaymentInfo) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Kashmir Valley Tour',
      price: 1200,
      quantity: 1,
      image: 'https://picsum.photos/seed/kashmir/400/300',
      description: 'A 7-day luxury tour through the heart of Kashmir.'
    },
    {
      id: '2',
      name: 'Dal Lake Houseboat Stay',
      price: 450,
      quantity: 2,
      image: 'https://picsum.photos/seed/lake/400/300',
      description: '2 nights in a premium houseboat with breakfast.'
    }
  ]);

  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CheckoutContext.Provider value={{
      cart,
      shipping,
      payment,
      setShipping,
      setPayment,
      addToCart,
      removeFromCart,
      clearCart,
      totalPrice
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
