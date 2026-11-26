import clases from "./Item.module.css";
import { Link } from "react-router-dom";

const Item = ({ id, name, price, img, category, stock }) => {
  const sinStock = typeof stock === "number" && stock <= 0;

  return (
    <article className={clases.card}>
      <picture className={clases.contenedorImagen}>
        <img className={clases.imagen} src={img} alt={name} />
      </picture>

      <div className={clases.body}>
        <div className={clases.meta}>
          {category && <span className={clases.categoryTag}>{category}</span>}
          <span className={sinStock ? clases.sinStock : clases.stockTag}>
            {sinStock ? "Sin stock" : `Stock: ${stock ?? 0}`}
          </span>
        </div>

        <h3 className={clases.nombre}>{name}</h3>
        <p className={clases.precio}>${price}</p>

        <div className={clases.boton}>
          <Link to={`/detail/${id}`}>Ver detalle</Link>
        </div>
      </div>
    </article>
  );
};

export default Item;
