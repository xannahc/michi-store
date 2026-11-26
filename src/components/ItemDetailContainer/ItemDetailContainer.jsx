import { Link, useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader";
import { getProductosById } from "../../services/firebase/firestore/productos";
import { useAsync } from "../../hooks/useAsync";

const ItemDetailContainer = () => {
  const { productoId } = useParams();
  const {
    data: producto,
    loader,
    error,
  } = useAsync(() => getProductosById(productoId), [productoId]);

  if (loader) {
    return <Loader message="Cargando detalle del producto..." />;
  }

  if (error) {
    return (
      <section className="detailFallback">
        <h2>Error al cargar el producto</h2>
        <p>No pudimos obtener la información del producto desde Firestore.</p>
        <Link to="/" className="detailFallbackLink">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (!producto) {
    return (
      <section className="detailFallback">
        <h2>Producto no encontrado</h2>
        <p>El producto solicitado no existe o ya no está disponible.</p>
        <Link to="/" className="detailFallbackLink">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return <ItemDetail {...producto} />;
};

export default ItemDetailContainer;
