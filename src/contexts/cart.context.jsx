import { createContext, useState } from "react";

export const CartContext = createContext({

  isCartOpen: false,
  setIsOpen: () => {},
});
//We need the provider, inside the cartontextProvider, we render the children
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};