import { Link } from "react-router-dom";
import "./Bill.css";

const Bill = ({ orderId, dataClient }) => {
  const { buyer, items = [], total, userEmail } = dataClient;

  return (
    <section className="billContainer">
      <div className="billCard">
        <span className="billBadge">¡Compra confirmada!</span>
        <h1 className="billTitle">Gracias por tu compra en Michi Store</h1>

        <div className="orderIdBox">
          <span>ID de tu orden:</span>
          <strong>{orderId}</strong>
        </div>

        <div className="billSection">
          <h2>Datos del comprador y entrega</h2>
          <p>
            <strong>Cuenta:</strong> {userEmail}
          </p>
          <p>
            <strong>Nombre:</strong> {buyer.name}
          </p>
          <p>
            <strong>Teléfono:</strong> {buyer.phone}
          </p>
          <p>
            <strong>Email:</strong> {buyer.email}
          </p>
          <p>
            <strong>Dirección:</strong> {buyer.address}
          </p>
        </div>

        <div className="billSection">
          <h2>Detalle de productos</h2>
          <ul className="billItems">
            {items.map((item) => (
              <li key={item.id} className="billItemRow">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <strong>${item.price * item.quantity}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className="billFooter">
          <div className="billTotal">
            <span>Total pagado:</span>
            <strong>${total}</strong>
          </div>
          <Link to="/" className="billHomeBtn">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bill;
