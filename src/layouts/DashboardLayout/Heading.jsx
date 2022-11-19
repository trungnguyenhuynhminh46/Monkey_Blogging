import React from "react";
import styled from "styled-components";

const StyledDashboardHeading = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 40px;
  color: black;
  letter-spacing: 1px;
`;

const Heading = ({ children }) => {
  return <StyledDashboardHeading>{children}</StyledDashboardHeading>;
};

export default Heading;
