import clases from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className={clases.conteiner}>
      <div className={clases.card}>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Parece que la página a la que intentás acceder no existe.</p>
        <Link to="/" className={clases.btn}>
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
