import clases from "./ItemListContainer.module.css";
import { Link, useParams } from "react-router-dom";
import { getProductos } from "../../services/firebase/firestore/productos";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";
import { useAsync } from "../../hooks/useAsync";
import logoMichi from "../Navbar/assets/logo-michistore.png";

const CATEGORY_LABELS = {
  alimentos: "Alimentos y Snacks",
  juguetes: "Juguetes",
  camas: "Camas y Descanso",
  accesorios: "Accesorios",
};

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();

  const {
    data: productos,
    loader,
    error,
  } = useAsync(() => getProductos(categoryId), [categoryId]);

  const categoryTitle = categoryId
    ? CATEGORY_LABELS[categoryId] || categoryId
    : "Catálogo completo";

  if (loader) {
    return <Loader message="Cargando productos..." />;
  }

  if (error) {
    return (
      <section className={clases.feedbackBox}>
        <h2>No pudimos cargar los productos</h2>
        <p>
          Ocurrió un problema al consultar el catálogo en Firestore. Intentá
          recargar la página en unos segundos.
        </p>
      </section>
    );
  }

  return (
    <main className={clases.contenedor}>
      {!categoryId ? (
        <section className={clases.hero}>
          <div className={clases.heroTexto}>
            <span className={clases.heroBadge}>Para gatos felices</span>
            <h1>{greeting}</h1>
            <p>
              Descubrí alimentos naturales, juguetes interactivos, camas
              acogedoras y accesorios pensados para el bienestar de tu michi.
            </p>
            <a href="#catalogo" className={clases.heroBtn}>
              Explorar productos
            </a>
          </div>
          <div className={clases.heroImgWrap}>
            <img
              src={logoMichi}
              alt="Michi Store"
              className={clases.heroImg}
            />
          </div>
        </section>
      ) : (
        <section className={clases.categoryHeader}>
          <h1>{categoryTitle}</h1>
          <Link to="/" className={clases.verTodosLink}>
            Ver todo el catálogo
          </Link>
        </section>
      )}

      <section id="catalogo" className={clases.catalogoSection}>
        {!categoryId && <h2 className={clases.sectionTitle}>{categoryTitle}</h2>}

        {!productos || productos.length === 0 ? (
          <div className={clases.feedbackBox}>
            <h3>No hay productos en esta categoría</h3>
            <p>
              Por el momento no encontramos productos disponibles en{" "}
              <strong>{categoryTitle}</strong>.
            </p>
            <Link to="/" className={clases.heroBtn}>
              Volver al catálogo general
            </Link>
          </div>
        ) : (
          <ItemList productos={productos} />
        )}
      </section>
    </main>
  );
};

export default ItemListContainer;
