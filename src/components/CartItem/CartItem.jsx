import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import clases from "./CartItem.module.css";

const CartItem = ({ name, price, quantity, id, img }) => {
  const { removeItem } = useContext(CartContext);

  return (
    <article className={clases.card}>
      <div className={clases.info}>
        {img && (
          <img src={img} alt={name} className={clases.thumb} />
        )}
        <div>
          <Link to={`/detail/${id}`} className={clases.name}>
            {name}
          </Link>
          <p className={clases.unitPrice}>Precio unitario: ${price}</p>
        </div>
      </div>

      <div className={clases.numbers}>
        <span className={clases.qty}>Cant: {quantity}</span>
        <span className={clases.subtotal}>Subtotal: ${quantity * price}</span>
        <button
          type="button"
          className={clases.botonEliminar}
          onClick={() => removeItem(id)}
          aria-label={`Eliminar ${name} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default CartItem;
