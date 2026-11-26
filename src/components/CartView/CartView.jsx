import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import NoProducts from "../NoProducts/NoProducts";
import clases from "./CartView.module.css";

const CartView = () => {
  const { totalQuantity, cart, total, clearCart } = useContext(CartContext);

  if (totalQuantity === 0) {
    return <NoProducts />;
  }

  return (
    <main className={clases.cartWrapper}>
      <section className={clases.cartlist}>
        <div className={clases.header}>
          <h1>Tu carrito de compras</h1>
          <span className={clases.countBadge}>
            {totalQuantity} {totalQuantity === 1 ? "unidad" : "unidades"}
          </span>
        </div>

        <div className={clases.itemsList}>
          {cart.map((prod) => (
            <CartItem key={prod.id} {...prod} />
          ))}
        </div>

        <div className={clases.summary}>
          <div className={clases.totals}>
            <p>
              Cantidad total: <strong>{totalQuantity}</strong>
            </p>
            <h3>Total: ${total}</h3>
          </div>

          <div className={clases.actions}>
            <button
              type="button"
              onClick={() => clearCart(false)}
              className={clases.clearBtn}
            >
              Vaciar carrito
            </button>
            <Link to="/" className={clases.continueLink}>
              Seguir comprando
            </Link>
            <Link to="/checkout" className={clases.checkoutLink}>
              Ir al Checkout
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartView;
