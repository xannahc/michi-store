import { useContext, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  documentId,
  getDocs,
  where,
  writeBatch,
  query,
} from "firebase/firestore";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebase/firebaseConfig";
import { notify, notifyError } from "../../notification/notify";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Bill from "../Bill/Bill";
import Loader from "../Loader/Loader";
import Login from "../Login/Login";
import NoProducts from "../NoProducts/NoProducts";

const Checkout = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, authLoading } = useContext(AuthContext);

  const [loader, setLoader] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [dataClient, setDataClient] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const createOrder = async ({ name, phone, email, address }) => {
    if (!user || cart.length === 0) {
      return;
    }

    setLoader(true);
    setErrorMessage("");

    try {
      const objOrder = {
        userId: user.uid,
        userEmail: user.email,
        buyer: {
          name,
          phone,
          email,
          address,
        },
        items: cart.map((prod) => ({
          id: prod.id,
          name: prod.name,
          price: prod.price,
          quantity: prod.quantity,
        })),
        total: total,
        date: Timestamp.fromDate(new Date()),
      };

      const batch = writeBatch(db);
      const outOfStock = [];
      const ids = cart.map((prod) => prod.id);
      const productsRef = collection(db, "productos");

      const productsAddedFromFirestore = await getDocs(
        query(productsRef, where(documentId(), "in", ids))
      );

      const { docs } = productsAddedFromFirestore;

      cart.forEach((cartItem) => {
        const docSnap = docs.find((d) => d.id === cartItem.id);
        if (!docSnap) {
          outOfStock.push(cartItem.name);
          return;
        }

        const dataDoc = docSnap.data();
        const stockDb = dataDoc.stock ?? 0;

        if (stockDb >= cartItem.quantity) {
          batch.update(docSnap.ref, { stock: stockDb - cartItem.quantity });
        } else {
          outOfStock.push(dataDoc.name || cartItem.name);
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();

        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);

        setOrderId(orderAdded.id);
        setDataClient(objOrder);
        clearCart(true);
        notify("¡Orden generada con éxito!");
      } else {
        const msg = `Sin stock suficiente para: ${outOfStock.join(", ")}.`;
        setErrorMessage(msg);
        notifyError(msg);
      }
    } catch {
      const msg =
        "Ocurrió un error al registrar tu orden. Tu carrito se mantuvo intacto.";
      setErrorMessage(msg);
      notifyError(msg);
    } finally {
      setLoader(false);
    }
  };

  if (authLoading) {
    return <Loader message="Validando sesión..." />;
  }

  if (loader) {
    return <Loader message="Generando tu orden..." />;
  }

  if (orderId && dataClient) {
    return <Bill orderId={orderId} dataClient={dataClient} />;
  }

  if (!user) {
    return (
      <main className="checkoutAuthGate">
        <div className="checkoutAuthNotice">
          <h2>Autenticación requerida para finalizar tu compra</h2>
          <p>
            Iniciá sesión o creá una cuenta para completar tu pedido en Michi
            Store. Tus productos siguen guardados en el carrito.
          </p>
        </div>
        <Login embedded />
      </main>
    );
  }

  if (cart.length === 0) {
    return <NoProducts />;
  }

  return (
    <CheckoutForm
      onConfirm={createOrder}
      userEmail={user.email}
      cart={cart}
      total={total}
      errorMessage={errorMessage}
    />
  );
};

export default Checkout;
