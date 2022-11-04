import React from "react";
import styled from "styled-components";

const StyledError = styled.div`
  width: 100%;
  max-width: 800px;

  margin: 0 auto;
  padding: 0 20px;

  color: #c0392b;
  font-size: 16px;
  font-style: italic;
`;

const Error = ({ children }) => {
  return <StyledError>{children}</StyledError>;
};

export default Error;
