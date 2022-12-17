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
import CategoriesPage from "./pages/CategoriesPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import Profile from "./pages/Profile";
import UpdateCategoryPage from "./pages/UpdateCategoryPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import UsersPage from "./pages/UsersPage";

function ProtectedComponent({ children }) {
  const { userInfo } = useAuth();
  if (!userInfo) {
    return <Navigate to="/sign-in"></Navigate>;
  }
  return children;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/:slug" element={<DetailPage />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedComponent>
              <DashboardLayout />
            </ProtectedComponent>
          }
        >
          <Route index element={<Dashboard />}></Route>
          {/* Posts */}
          <Route path="posts" element={<PostsPage />}></Route>
          <Route path="add-post" element={<AddPostPage />}></Route>
          <Route path="update-post" element={<UpdatePostPage />}></Route>
          {/* Categories */}
          <Route path="categories" element={<CategoriesPage />}></Route>
          <Route path="add-category" element={<AddCategoryPage />}></Route>
          <Route path="update-category" element={<UpdateCategoryPage />} />
          {/* Users */}
          <Route path="users" element={<UsersPage />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
