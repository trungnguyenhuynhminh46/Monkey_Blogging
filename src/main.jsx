import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./utils/constants";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyles></GlobalStyles>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
