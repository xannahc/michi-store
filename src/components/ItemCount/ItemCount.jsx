import { useState } from "react";

const ItemCount = ({ initial = 1, modifyBy = 1, onAdd, stock }) => {
  const [count, setCount] = useState(initial);

  const incrementar = () => {
    setCount((prev) => (prev + modifyBy <= stock ? prev + modifyBy : prev));
  };

  const decrementar = () => {
    setCount((prev) => (prev - modifyBy >= 1 ? prev - modifyBy : prev));
  };

  return (
    <div className="card__counter">
      <div className="counterStepper">
        <button
          type="button"
          className="counterBtn"
          onClick={decrementar}
          disabled={count <= 1}
          aria-label="Disminuir cantidad"
        >
          -
        </button>
        <p className="counterValue">{count}</p>
        <button
          type="button"
          className="counterBtn"
          onClick={incrementar}
          disabled={count >= stock}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="btnPrimary"
        onClick={() => onAdd(count)}
        disabled={stock <= 0 || count > stock}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
