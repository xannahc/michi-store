import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { notify } from "../../notification/notify";

const ItemDetail = ({ id, img, name, price, description, stock, category }) => {
  const { addItem, isInCart } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    const objProductToAdd = {
      id,
      name,
      price,
      img,
      stock,
      quantity,
    };
    addItem(objProductToAdd);
    notify("Producto agregado al carrito");
  };

  const sinStock = typeof stock !== "number" || stock <= 0;

  return (
    <section className="detailContainer">
      <div className="detailBreadcrumb">
        <Link to="/">← Volver al catálogo</Link>
        {category && (
          <>
            <span>/</span>
            <Link to={`/category/${category}`}>{category}</Link>
          </>
        )}
      </div>

      <article className="cardi">
        <div className="card__img">
          <img src={img} alt={name} />
        </div>

        <div className="card__info">
          {category && <span className="card__category">{category}</span>}
          <h1 className="card__title">{name}</h1>
          <p className="card__price">${price}</p>
          <p className="card__subtitle">{description}</p>

          <p className={`card__stock ${sinStock ? "card__stock--empty" : ""}`}>
            {sinStock
              ? "Sin stock disponible"
              : `Stock disponible: ${stock} unidades`}
          </p>

          <div className="card__actions">
            {isInCart(id) ? (
              <div className="card__inCart">
                <span className="card__inCartMsg">
                  Este producto ya está en tu carrito
                </span>
                <div className="card__inCartBtns">
                  <Link to="/cart" className="btnPrimary">
                    Ir al carrito
                  </Link>
                  <Link to="/" className="btnSecondary">
                    Seguir comprando
                  </Link>
                </div>
              </div>
            ) : sinStock ? (
              <Link to="/" className="btnSecondary">
                Ver otros productos
              </Link>
            ) : (
              <ItemCount
                initial={1}
                modifyBy={1}
                stock={stock}
                onAdd={handleOnAdd}
              />
            )}
          </div>
        </div>
      </article>
    </section>
  );
};

export default ItemDetail;
