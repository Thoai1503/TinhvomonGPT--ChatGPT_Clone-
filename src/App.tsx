import { useState } from "react";

import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { clientRouter } from "./router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={clientRouter} />
    </>
  );
}

export default App;
