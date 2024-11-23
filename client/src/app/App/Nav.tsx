import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import AuthApi from "../../features/Auth/api/AuthApi";

function Nav(): JSX.Element {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await AuthApi.logout();
      setUser(null);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Link className="nav-link active" to={"/homepage"}>
            SKELETON-LOG-REG
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to={"/log"}>
                    Войти
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to={"/reg"}>
                    Зарегистрироваться
                  </Link>
                </li>
              </>
            )}
            {user && <p>Привет! {user.email}</p>}
            {user && (
              <button
                className="btn btn-outline-danger ms-2"
                onClick={onLogout}
              >
                Выйти
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
