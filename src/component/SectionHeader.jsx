import React from "react";
import styled from "styled-components";

const StyledSectionHeader = styled.div`
  position: relative;
  margin-top: 60px;
  margin-bottom: 30px;

  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;

  color: ${(props) => props.theme.purple};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);

    height: 3px;
    width: 35px;

    background: ${(props) => props.theme.blue};
  }
`;

const SectionHeader = ({ children }) => {
  return <StyledSectionHeader>{children}</StyledSectionHeader>;
};

export default SectionHeader;
