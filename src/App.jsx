// Library
import { Routes, Route, Link } from "react-router-dom";
// Assets
import { AuthProvider } from "./contexts/auth-context";
import "./styles/index.scss";

// Pages
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
