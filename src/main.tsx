import React from "react";
import ReactDOM from "react-dom/client";

import { UIProvider } from "@yamada-ui/react";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </React.StrictMode>
);
