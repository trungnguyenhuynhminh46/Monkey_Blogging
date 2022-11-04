import React from "react";
import styled from "styled-components";

const StyledInputGroup = styled.div`
  width: 100%;
  max-width: 800px;

  margin: 0 auto;
  padding: 18px 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputGroup = ({ children }) => {
  return <StyledInputGroup>{children}</StyledInputGroup>;
};

export default InputGroup;
