// Library
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Assets
import { useAuth } from "./contexts/auth-context";
import "./styles/index.scss";

// Pages
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
function ProtectedComponent({ children }) {
  const { userInfo } = useAuth();
  if (!userInfo?.uid) {
    return <Navigate to="/sign-in"></Navigate>;
  }
  return children;
}
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedComponent>
              <HomePage></HomePage>
            </ProtectedComponent>
          }
        ></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
