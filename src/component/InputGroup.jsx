import React from "react";
import styled, { css } from "styled-components";

const StyledInputGroup = styled.div`
  width: 100%;
  ${(props) =>
    props.maxWidth &&
    css`
      max-width: ${(props) => props.maxWidth};
    `};
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
  gap: 18px;
`;

const InputGroup = ({ children, minHeight = 0, maxWidth }) => {
  return (
    <StyledInputGroup minHeight={minHeight} maxWidth={maxWidth}>
      {children}
    </StyledInputGroup>
  );
};

export default InputGroup;
