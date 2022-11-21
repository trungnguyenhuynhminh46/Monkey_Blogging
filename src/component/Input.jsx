import React, { useState } from "react";
import { useEffect } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
// Components
import Icons from "./Icons";

const StyledInput = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: 20px;
    font-weight: 500;
    font-size: 16px;
    color: ${(props) => props.theme.gray_placeholder};
    outline: none;
    border: 1px solid transparent;
    border-radius: 8px;
    background: ${(props) => props.theme.gray_light};
    transition: all linear 0.25s;
    &:focus {
      background: white;
      border: 1px solid ${(props) => props.theme.primary};
    }
  }
  .icon {
    cursor: pointer;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Input = ({
  type,
  name,
  id,
  autoComplete = "off",
  placeholder,
  defaultValue,
  control,
  props,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };
  return (
    <StyledInput>
      <input
        {...field}
        {...props}
        type={showPassword ? "text" : type}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {type === "password" && (
        <div className="icon" onClick={toggleShowPassword}>
          {showPassword ? (
            <Icons.IconEye iconClassName="w-6 h-6" />
          ) : (
            <Icons.IconEyeSlash iconClassName="w-6 h-6" />
          )}
        </div>
      )}
    </StyledInput>
  );
};

export default Input;
