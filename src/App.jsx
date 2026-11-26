import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notification from "./notification/Notification.jsx";
import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import CartView from "./components/CartView/CartView";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Notification />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <ItemListContainer
                    greeting={"¡Todo lo que tu Michi merece!"}
                  />
                }
              />
              <Route
                path="/category/:categoryId"
                element={
                  <ItemListContainer
                    greeting={"¡Todo lo que tu Michi merece!"}
                  />
                }
              />
              <Route
                path="/detail/:productoId"
                element={<ItemDetailContainer />}
              />
              <Route path="/cart" element={<CartView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
