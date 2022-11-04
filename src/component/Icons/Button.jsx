import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../LoadingSpinner";

const StyledButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 8px;

  text-align: center;
  font-size: 20px;
  font-weight: 600;
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
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  isLoading = false,
  ...props
}) => {
  return (
    <StyledButton type={type} onClick={onClick} {...props}>
      {isLoading ? <LoadingSpinner /> : children}
    </StyledButton>
  );
};

export default Button;
