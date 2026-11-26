import { useEffect, useState } from "react";
import { notifyError } from "../../notification/notify";
import "./CheckoutForm.css";

const CheckoutForm = ({
  onConfirm,
  userEmail = "",
  cart = [],
  total = 0,
  errorMessage = "",
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(userEmail);
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (userEmail && !email) {
      setEmail(userEmail);
    }
  }, [userEmail, email]);

  const handleConfirm = (event) => {
    event.preventDefault();
    setFormError("");

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail || !trimmedAddress) {
      const msg = "Completá todos los campos obligatorios para continuar.";
      setFormError(msg);
      notifyError(msg);
      return;
    }

    onConfirm({
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      address: trimmedAddress,
    });
  };

  return (
    <section className="containerForm">
      <div className="checkoutGrid">
        <form onSubmit={handleConfirm} className="form" noValidate>
          <div className="title">
            Finalizar compra
            <span>Completá tus datos de contacto y entrega</span>
          </div>

          <div className="fieldWrap">
            <label htmlFor="checkout-name">Nombre completo</label>
            <input
              id="checkout-name"
              className="input"
              name="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
              placeholder="Ej: Ana García"
              type="text"
            />
          </div>

          <div className="fieldWrap">
            <label htmlFor="checkout-phone">Teléfono</label>
            <input
              id="checkout-phone"
              className="input"
              name="phone"
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
              placeholder="Ej: 11 5555-1234"
              type="tel"
            />
          </div>

          <div className="fieldWrap">
            <label htmlFor="checkout-email">Correo electrónico</label>
            <input
              id="checkout-email"
              className="input"
              name="mail"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="ejemplo@correo.com"
              type="email"
            />
          </div>

          <div className="fieldWrap">
            <label htmlFor="checkout-address">Dirección de entrega</label>
            <input
              id="checkout-address"
              className="input"
              name="address"
              value={address}
              onChange={({ target }) => setAddress(target.value)}
              placeholder="Calle, número y localidad"
              type="text"
            />
          </div>

          {(formError || errorMessage) && (
            <div className="checkoutError" role="alert">
              {formError || errorMessage}
            </div>
          )}

          <button className="button-confirm" type="submit">
            Confirmar orden
          </button>
        </form>

        <aside className="orderSummaryCard">
          <h2>Resumen de compra</h2>
          <ul className="summaryList">
            {cart.map((item) => (
              <li key={item.id} className="summaryItem">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <strong>${item.price * item.quantity}</strong>
              </li>
            ))}
          </ul>
          <div className="summaryTotal">
            <span>Total</span>
            <strong>${total}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutForm;
