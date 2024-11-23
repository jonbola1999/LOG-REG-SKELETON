import { FormEvent, useContext, useState } from "react";
import AuthApi from "../api/AuthApi";
import { setAccessToken } from "../../../shared/lib/axiosInstance";
import { UserContext } from "../../../app/Context/UserContext";
import { useNavigate } from "react-router-dom";
import EmailValidator from "email-validator";

function RegForm(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [role] = useState<string>("User");
  const [password, setPassword] = useState<string>("");
  const [rpassword, setRPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(
      newEmail && !EmailValidator.validate(newEmail)
        ? "Некорректный email"
        : null
    );
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== rpassword) {
      setError("Пароли не совпадают!");
      return;
    }

    try {
      const response = await AuthApi.reg({ email, password, name, role });
      if (response) {
        const { user, accessToken } = response;
        setAccessToken(accessToken);
        setUser(user);
        navigate("/homepage");
      } else {
        setError("Данный email уже занят");
      }
    } catch (error) {
      setError("Ошибка");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 rounded">
            <h2 className="text-center mb-4">Регистрация</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  autoFocus
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && (
                  <div className="alert alert-danger mt-2" role="alert">
                    {emailError}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Имя
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Введите имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rpassword" className="form-label">
                  Повторите пароль
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="rpassword"
                  placeholder="Повторите пароль"
                  value={rpassword}
                  onChange={(e) => setRPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block w-100">
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegForm;
