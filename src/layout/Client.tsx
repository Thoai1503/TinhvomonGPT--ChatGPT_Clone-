import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

const Client = () => {
  return (
    <div>
      <main className="d-flex">
        <Sidebar /> <Outlet />
      </main>
    </div>
  );
};

export default Client;
