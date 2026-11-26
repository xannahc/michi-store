import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import carrito from "./assets/shopcart.svg";
import clases from "./CartWidget.module.css";

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/cart")}
      className={clases.botonCarrito}
      aria-label="Ver carrito de compras"
    >
      <img className={clases.carro} src={carrito} alt="Carrito de compras" />
      <span className={clases.cantidad}>{totalQuantity}</span>
    </button>
  );
};

export default CartWidget;
