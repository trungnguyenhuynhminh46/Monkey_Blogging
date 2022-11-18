import React from "react";
import styled, { css } from "styled-components";

const StyledInputGroup = styled.div`
  width: 100%;
  max-width: 800px;
  ${(props) =>
    props.minHeight &&
    css`
      min-height: ${(props) => props.minHeight};
    `};

  margin: 0 auto;
  padding: 18px 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InputGroup = ({ children, minHeight = 0 }) => {
  return <StyledInputGroup minHeight={minHeight}>{children}</StyledInputGroup>;
};

export default InputGroup;
