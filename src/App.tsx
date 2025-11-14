import { useState } from "react";

import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import { clientRouter } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        {" "}
        <RouterProvider router={clientRouter} />
      </Provider>
    </>
  );
}

export default App;
