import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import "./index.css";
import App from "./App.jsx";
import store from "./store/store"; // Ensure correct path
import { Toaster } from "react-hot-toast";




createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* ✅ BrowserRouter should be only here */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
