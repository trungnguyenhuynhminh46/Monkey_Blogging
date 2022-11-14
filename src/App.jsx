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
function ProtectedComponent({ children }) {
  const { userInfo } = useAuth();
  if (!userInfo?.uid) {
    return <Navigate to="/sign-in"></Navigate>;
  }
  return children;
}

// Test here
import { useForm } from "react-hook-form";
import Radio from "./component/Radio";
import CheckBox from "./component/CheckBox";
import { Dropdown } from "./component/Dropdown";

function App() {
  const { control, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      status: "",
      items: [],
    },
  });
  const watchStatus = watch("status");
  const watchItems = watch("items");
  const handleSetValueCheckBox = (item) => {
    if (watchItems.includes(item)) {
      let i = watchItems.indexOf(item);
      if (i !== -1) {
        watchItems.splice(i, 1);
        setValue("items", watchItems);
      }
    } else {
      watchItems.push(item);
      setValue("items", watchItems);
    }
  };
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/post/*" element={<DetailPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <ToastContainer /> */}
      {/* Radio */}
      <div className="flex items-center gap-x-5">
        <Radio
          name="status"
          control={control}
          checked={watchStatus === "approved"}
          onClick={() => setValue("status", "approved")}
          value="approved"
        >
          Approved
        </Radio>
        <Radio
          name="status"
          control={control}
          checked={watchStatus === "pending"}
          onClick={() => setValue("status", "pending")}
          value="pending"
        >
          Pending
        </Radio>
        <Radio
          name="status"
          control={control}
          checked={watchStatus === "reject"}
          onClick={() => setValue("status", "reject")}
          value="reject"
        >
          Reject
        </Radio>
      </div>
      {/* Checkbox */}
      <div className="flex items-center gap-x-5">
        <CheckBox
          name="items"
          control={control}
          value="book"
          checked={watchItems.includes("book")}
          onClick={() => {
            handleSetValueCheckBox("book");
          }}
        >
          A book
        </CheckBox>
        <CheckBox
          name="items"
          control={control}
          value="car"
          checked={watchItems.includes("car")}
          onClick={() => {
            handleSetValueCheckBox("car");
          }}
        >
          A car
        </CheckBox>
        <CheckBox
          name="items"
          control={control}
          value="pen"
          checked={watchItems.includes("pen")}
          onClick={() => {
            handleSetValueCheckBox("pen");
          }}
        >
          A pen
        </CheckBox>
      </div>
      {/* Dropdown */}
      <Dropdown>
        <Dropdown.Option>Knowledge</Dropdown.Option>
        <Dropdown.Option>Blockchain</Dropdown.Option>
        <Dropdown.Option>Setup</Dropdown.Option>
        <Dropdown.Option>Nature</Dropdown.Option>
        <Dropdown.Option>Developer</Dropdown.Option>
      </Dropdown>
    </div>
  );
}

export default App;
