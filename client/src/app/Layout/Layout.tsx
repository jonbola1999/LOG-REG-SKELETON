import { Outlet } from "react-router-dom";
import Nav from "../App/Nav";

function Layout(): JSX.Element {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default Layout;
