import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  cursor: pointer;
  margin-bottom: 18px;
  color: ${(props) => props.theme.gray_label};
  font-weight: 600;
  font-size: 18px;
`;

const Label = ({ htmlFor, children }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
