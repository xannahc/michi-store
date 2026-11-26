import { useState, useEffect, createContext } from "react";
import { notifyInfo } from "../notification/notify";

export const CartContext = createContext({
  cart: [],
  total: 0,
  totalQuantity: 0,
  addItem: () => {},
  removeItem: () => {},
  isInCart: () => false,
  clearCart: () => {},
});

const CART_STORAGE_KEY = "michistore_cart";

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignorar errores de almacenamiento local
    }
  }, [cart]);

  const isInCart = (productoId) => {
    return cart.some((prod) => prod.id === productoId);
  };

  const addItem = (productoToAdd) => {
    if (!productoToAdd || productoToAdd.quantity <= 0) return;

    if (!isInCart(productoToAdd.id)) {
      const safeQuantity =
        typeof productoToAdd.stock === "number"
          ? Math.min(productoToAdd.quantity, productoToAdd.stock)
          : productoToAdd.quantity;

      if (safeQuantity > 0) {
        setCart((prev) => [...prev, { ...productoToAdd, quantity: safeQuantity }]);
      }
    }
  };

  const removeItem = (productoId) => {
    const cartUpdated = cart.filter((prod) => prod.id !== productoId);
    setCart(cartUpdated);
    notifyInfo("Producto eliminado del carrito");
  };

  const clearCart = (silent = false) => {
    setCart([]);
    if (!silent) {
      notifyInfo("El carrito se ha vaciado");
    }
  };

  const totalQuantity = cart.reduce((accu, prod) => accu + prod.quantity, 0);
  const total = cart.reduce((accu, prod) => accu + prod.price * prod.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        totalQuantity,
        addItem,
        removeItem,
        isInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
