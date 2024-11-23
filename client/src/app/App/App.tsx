import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { UserType } from "../../features/Auth/type/UserType";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { router } from "../Router/Router";
import AuthApi from "../../features/Auth/api/AuthApi";

function App(): JSX.Element {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    AuthApi.refresh().then((data) => {
      if (data) {
        setUser(data.user);
        setAccessToken(data.accessToken);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
