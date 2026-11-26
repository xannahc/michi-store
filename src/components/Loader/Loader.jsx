import "./Loader.css";

const Loader = ({ message = "Cargando..." }) => {
  return (
    <div className="spinnerContainer" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p className="loaderText">{message}</p>
    </div>
  );
};

export default Loader;
