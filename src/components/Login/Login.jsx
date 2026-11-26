import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../services/firebase/authErrors";
import { notify, notifyError } from "../../notification/notify";
import Loader from "../Loader/Loader";
import clases from "../Auth/Auth.module.css";

const Login = ({ embedded = false }) => {
  const { user, authLoading, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (authLoading && !embedded) {
    return <Loader message="Validando sesión..." />;
  }

  if (user && !embedded) {
    return (
      <section className={clases.authSection}>
        <div className={`${clases.authCard} ${clases.alreadyLogged}`}>
          <h2>Sesión iniciada</h2>
          <p>
            Ya estás conectado como <strong>{user.email}</strong>.
          </p>
          <Link to="/" className={clases.secondaryBtn}>
            Ir al catálogo
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMsg("Completá tu correo electrónico y contraseña.");
      return;
    }

    setSubmitting(true);
    try {
      await login(trimmedEmail, password);
      notify("¡Bienvenido/a de nuevo a Michi Store!");
      if (!embedded) {
        navigate(redirectTo);
      }
    } catch (error) {
      const msg = getAuthErrorMessage(error);
      setErrorMsg(msg);
      notifyError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className={embedded ? clases.authSectionEmbedded : clases.authSection}
    >
      <div className={clases.authCard}>
        <h1 className={clases.authTitle}>Iniciar sesión</h1>
        <p className={clases.authSubtitle}>
          {embedded
            ? "Iniciá sesión con tu cuenta para continuar con la compra sin perder tu carrito."
            : "Ingresá con tu correo y contraseña para comprar en Michi Store."}
        </p>

        <form onSubmit={handleSubmit} className={clases.authForm} noValidate>
          <div className={clases.fieldGroup}>
            <label htmlFor="login-email">Correo electrónico</label>
            <input
              id="login-email"
              type="email"
              className={clases.input}
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className={clases.fieldGroup}>
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              className={clases.input}
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {errorMsg && (
            <div className={clases.errorBox} role="alert">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className={clases.submitBtn}
            disabled={submitting}
          >
            {submitting ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className={clases.switchText}>
          ¿Todavía no tenés cuenta?{" "}
          <Link
            to="/register"
            state={{ from: embedded ? "/checkout" : redirectTo }}
            className={clases.switchLink}
          >
            Registrate acá
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
