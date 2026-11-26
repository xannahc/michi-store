import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import clases from "./Navbar.module.css";
import logoMichi from "./assets/logo-michistore.png";
import CartWidget from "../CartWidget/CartWidget";
import { AuthContext } from "../../context/AuthContext";
import { notifyInfo, notifyError } from "../../notification/notify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, authLoading, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      notifyInfo("Sesión cerrada correctamente");
      navigate("/");
    } catch {
      notifyError("No se pudo cerrar la sesión. Intentá nuevamente.");
    }
  };

  return (
    <header className={clases.header}>
      <nav className={clases.navb}>
        <Link to="/" className={clases.logo}>
          <img src={logoMichi} alt="Logo Michi Store" />
          <span className={clases.titulo}>Michi Store</span>
        </Link>

        <div className={clases.categorias}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${clases.navLink} ${clases.active}` : clases.navLink
            }
          >
            Catálogo
          </NavLink>
          <NavLink
            to="/category/alimentos"
            className={({ isActive }) =>
              isActive ? `${clases.navLink} ${clases.active}` : clases.navLink
            }
          >
            Alimentos
          </NavLink>
          <NavLink
            to="/category/juguetes"
            className={({ isActive }) =>
              isActive ? `${clases.navLink} ${clases.active}` : clases.navLink
            }
          >
            Juguetes
          </NavLink>
          <NavLink
            to="/category/camas"
            className={({ isActive }) =>
              isActive ? `${clases.navLink} ${clases.active}` : clases.navLink
            }
          >
            Camas
          </NavLink>
          <NavLink
            to="/category/accesorios"
            className={({ isActive }) =>
              isActive ? `${clases.navLink} ${clases.active}` : clases.navLink
            }
          >
            Accesorios
          </NavLink>
        </div>

        <div className={clases.acciones}>
          <CartWidget />

          {authLoading ? (
            <span className={clases.authChecking}>Verificando sesión...</span>
          ) : user ? (
            <div className={clases.userMenu}>
              <span className={clases.userEmail} title={user.email}>
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className={clases.logoutBtn}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className={clases.authLinks}>
              <Link to="/login" className={clases.loginLink}>
                Iniciar sesión
              </Link>
              <Link to="/register" className={clases.registerLink}>
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
