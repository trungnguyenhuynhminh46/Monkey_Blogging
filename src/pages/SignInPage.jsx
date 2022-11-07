// Library
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
// Assets
import { useAuth } from "../contexts/auth-context";
import { auth } from "../firebase/firebase-config";
// Components
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Input from "../component/Input";
import Button from "../component/Icons/Button";
import Error from "../component/Error";
import AuthenticationLayout from "../layouts/AuthenticationLayout";

const StyledSignInPage = styled.div`
  min-height: 100vh;
  padding: 20px;
  /* Prevent select */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 24px;
  }
  .button {
    display: flex;
    justify-content: center;
    padding: 32px 0;
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
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  })
  .required();

const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    register,
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
      // Variables
      const email = data.email;
      const password = data.password;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setErr("Somthing went wrong please try again!");
    }
  };
  return (
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
        <Button type="submit" isLoading={false} style={{ maxWidth: 350 }}>
          Sign Up
        </Button>
      </form>
    </AuthenticationLayout>
  );
};

export default SignInPage;
