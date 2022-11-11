import React from "react";
import styled from "styled-components";

const StyledBadge = styled.div`
  padding: 4px 10px;
  border-radius: 10px;

  letter-spacing: 0.005em;

  background: #f3edff;
  color: #6b6b6b;
  font-size: 14px;
`;

const Badge = ({ children, bg = "#f3edff", style }) => {
  const finalStyle = {
    ...style,
    background: bg,
  };
  return <StyledBadge style={finalStyle}>{children}</StyledBadge>;
};

export default Badge;
