// Library
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Assets
// Components
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Input from "../component/Input";
import Button from "../component/Icons/Button";
import Error from "../component/Error";

const StyledSignUpPage = styled.div`
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
    fullname: yup.string().required("Please enter your full name"),
    email: yup
      .string()
      .email("The email you enter in a wrong format!")
      .required("Please enter your email"),
    password: yup
      .string()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .required("Please enter your password"),
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
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <StyledSignUpPage>
      <div className="container">
        <div className="logo">
          <img srcSet="/logo.png 3x" alt="mokey image" />
        </div>
        <h1 className="heading">Monkey Blogging</h1>
        <form action="#" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Please enter your fullname"
              control={control}
            />
          </InputGroup>
          <Error>{errors.fullname?.message}</Error>
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
          <Error>{errors.email?.message}</Error>
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
          <Error>{errors.password?.message}</Error>
          <div className="button">
            <Button type="submit" isLoading={false}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </StyledSignUpPage>
  );
};

export default SignUpPage;
