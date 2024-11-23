import { FormEvent, useContext, useState } from "react";
import AuthApi from "../api/AuthApi";
import { setAccessToken } from "../../../shared/lib/axiosInstance";
import { UserContext } from "../../../app/Context/UserContext";
import { useNavigate } from "react-router-dom";

function LogForm(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await AuthApi.log({ email, password });
      console.log(response);

      if (response) {
        const { user, accessToken } = response;
        setAccessToken(accessToken);
        setUser(user);
        navigate("/homepage");
      } else {
        setError("Вы ввели неправильные данные");
      }
    } catch (error) {
      setError("error");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 rounded">
            <h2 className="text-center mb-4">Вход</h2>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Адрес электронной почты
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block w-100">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogForm;
