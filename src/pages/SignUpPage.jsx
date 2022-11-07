// Library
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// Assets
import { app, auth, db, storage } from "../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
// Components
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Input from "../component/Input";
import Button from "../component/Icons/Button";
import Error from "../component/Error";
import AuthenticationLayout from "../layouts/AuthenticationLayout";

const StyledSignUpPage = styled.div``;

const schema = yup
  .object({
    displayName: yup
      .string()
      .required("Please enter your display name")
      .min(10, "Your display name must have at least 10 characters"),
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

const SignUpPage = () => {
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
  const navigate = useNavigate();
  // States
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Effects
  useEffect(() => {
    const errorsArr = Object.values(errors);
    if (!!err) {
      errorsArr.push({ message: err });
    }
    if (errorsArr.length > 0) {
      toast.error(errorsArr[0]?.message, {
        autoClose: 5000,
        pauseOnHover: false,
      });
    }
  }, [errors, err]);
  const onSubmit = async (data) => {
    try {
      if (displayName && email && password) {
        setIsLoading(true);
        // Get variables
        const { displayName, email, password } = data;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Update displayName
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
        // Add doc to collection
        await setDoc(doc(db, "users", userCredential.user.uid), {
          displayName,
          email,
          password,
        });
        setIsLoading(false);
        toast.success("Register successfully!!!", {
          autoClose: 5000,
          pauseOnHover: false,
        });
        // Chuyễn hướng sang trang home
        navigate("/");
      }
    } catch (err) {
      setErr("Something goes wrong please try again");
      setIsLoading(false);
    }
  };
  return (
    <AuthenticationLayout>
      <form action="#" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label htmlFor="displayName">Display name</Label>
          <Input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Please enter your display name"
            control={control}
          />
        </InputGroup>
        {/* <Error>{errors.displayName?.message}</Error> */}
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
        <Button type="submit" isLoading={isLoading} style={{ maxWidth: 350 }}>
          Sign Up
        </Button>
        <div className="form_error">{/* <Error>{err}</Error> */}</div>
      </form>
    </AuthenticationLayout>
  );
};

export default SignUpPage;
