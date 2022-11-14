import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const StyledButton = styled.button`
  cursor: pointer;

  width: 100%;
  padding: ${(props) => props.padding};
  margin: 20px 0;
  border-radius: 8px;

  text-align: center;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: white;

  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  transition: all linear 0.25s;
  &:hover {
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &.bg_white {
    background: white;
    color: ${(props) => props.theme.primary};
  }
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  isLoading = false,
  to,
  bg_white = false,
  style,
  fontWeight = "600",
  fontSize = "20px",
  padding = "20px",
  ...props
}) => {
  let Redirect = "div";
  if (!!to) {
    Redirect = Link;
  }
  return (
    <Redirect to={to} style={style}>
      <StyledButton
        className={bg_white && "bg_white"}
        type={type}
        onClick={onClick}
        fontSize={fontSize}
        fontWeight={fontWeight}
        padding={padding}
        {...props}
      >
        {isLoading ? <LoadingSpinner /> : children}
      </StyledButton>
    </Redirect>
  );
};

export default Button;
