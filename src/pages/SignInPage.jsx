// Library
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
// Assets
import { useAuth } from "../contexts/auth-context";
import { auth } from "../firebase/firebase-config";
// Components
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Input from "../component/Input";
import Button from "../component/Button";
import Error from "../component/Error";
import AuthenticationLayout from "../layouts/AuthenticationLayout";

const StyledSignInPage = styled.div`
  .button {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
  }
  .to_register {
    font-style: italic;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    a {
      font-weight: 500;
      color: ${(props) => props.theme.primary};
    }
  }
`;

const schema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your email")
      .email("The email you enter in a wrong format!"),
    password: yup
      .string()
      .required("Please enter your password")
      // .matches(
      //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      //   "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      // ),
      .min(9, "Password must have at least 9 characters"),
  })
  .required();

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  // States
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.uid) {
      navigate("/");
    }
  }, [userInfo]);
  // Effect
  useEffect(() => {
    const arr = Object.values(errors);
    if (!!err) {
      arr.push({ message: err });
    }
    if (arr.length > 0) {
      toast.error(arr[0]?.message, {
        autoClose: 5000,
        pauseOnHover: false,
      });
    }
  }, [errors, err]);
  // Handlers
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setErr("");
      // Variables
      const email = data.email;
      const password = data.password;
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      toast.success("Sign in successfully!!!", {
        autoClose: 5000,
        pauseOnHover: false,
      });
    } catch (err) {
      setErr("Something went wrong please try again!");
      setIsLoading(false);
    }
  };
  return (
    <StyledSignInPage>
      <AuthenticationLayout>
        <form action="#" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="email">Email address</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Please enter your email"
              control={control}
            />
          </InputGroup>
          {/* <Error>{errors.email?.message}</Error> */}
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Please enter your password"
              control={control}
            />
          </InputGroup>
          {/* <Error>{errors.password?.message}</Error> */}
          <p className="to_register">
            You don't have any account? <Link to="/sign-up">Make one!</Link>
          </p>
          <div className="button">
            <Button type="submit" isLoading={isLoading} style={{ width: 350 }}>
              Sign In
            </Button>
          </div>
        </form>
      </AuthenticationLayout>
    </StyledSignInPage>
  );
};

export default SignInPage;
