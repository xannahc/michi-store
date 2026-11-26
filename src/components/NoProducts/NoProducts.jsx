import { Link } from "react-router-dom";
import "./NoProducts.css";

const NoProducts = () => {
  return (
    <section className="containerCardi">
      <div className="emptyCartCard">
        <h2>Tu carrito está vacío</h2>
        <p>
          Agregá productos del catálogo para consentir a tu michi antes de
          finalizar la compra.
        </p>
        <Link to="/" className="emptyCartBtn">
          Explorar catálogo
        </Link>
      </div>
    </section>
  );
};

export default NoProducts;
