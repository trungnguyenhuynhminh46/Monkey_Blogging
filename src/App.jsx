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
import NotFoundPage from "./pages/NotFoundPage";
import DetailPage from "./pages/DetailPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AddPostPage from "./pages/AddPostPage";
import PostsPage from "./pages/PostsPage";

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
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/:slug" element={<DetailPage />}></Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="post" element={<PostsPage></PostsPage>}></Route>
          <Route path="add-post" element={<AddPostPage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
