import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getAuthErrorMessage } from "../../services/firebase/authErrors";
import { notify, notifyError } from "../../notification/notify";
import Loader from "../Loader/Loader";
import clases from "../Auth/Auth.module.css";

const Register = () => {
  const { user, authLoading, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (authLoading) {
    return <Loader message="Validando sesión..." />;
  }

  if (user) {
    return (
      <section className={clases.authSection}>
        <div className={`${clases.authCard} ${clases.alreadyLogged}`}>
          <h2>Sesión iniciada</h2>
          <p>
            Ya estás registrado y conectado como <strong>{user.email}</strong>.
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
    if (!trimmedEmail || !password || !confirmPassword) {
      setErrorMsg("Completá todos los campos para crear tu cuenta.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    setSubmitting(true);
    try {
      await register(trimmedEmail, password);
      notify("¡Cuenta creada con éxito!");
      navigate(redirectTo);
    } catch (error) {
      const msg = getAuthErrorMessage(error);
      setErrorMsg(msg);
      notifyError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={clases.authSection}>
      <div className={clases.authCard}>
        <h1 className={clases.authTitle}>Crear cuenta</h1>
        <p className={clases.authSubtitle}>
          Registrate con tu correo y una contraseña para realizar tus compras en
          Michi Store.
        </p>

        <form onSubmit={handleSubmit} className={clases.authForm} noValidate>
          <div className={clases.fieldGroup}>
            <label htmlFor="register-email">Correo electrónico</label>
            <input
              id="register-email"
              type="email"
              className={clases.input}
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className={clases.fieldGroup}>
            <label htmlFor="register-password">Contraseña</label>
            <input
              id="register-password"
              type="password"
              className={clases.input}
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className={clases.fieldGroup}>
            <label htmlFor="register-confirm">Repetir contraseña</label>
            <input
              id="register-confirm"
              type="password"
              className={clases.input}
              placeholder="Repetí tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
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
            {submitting ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className={clases.switchText}>
          ¿Ya tenés una cuenta?{" "}
          <Link
            to="/login"
            state={{ from: redirectTo }}
            className={clases.switchLink}
          >
            Iniciá sesión acá
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
