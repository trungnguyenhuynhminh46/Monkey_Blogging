import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledBadge = styled.div`
  width: max-content;
  padding: 4px 10px;
  border-radius: 10px;

  letter-spacing: 0.005em;

  background: #f3edff;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
`;

const Badge = ({ children, bg = "#f3edff", to = "", href = "", style }) => {
  const finalStyle = {
    ...style,
    background: bg,
  };
  const Wrapper = !!to ? Link : !!href ? "a" : "div";
  return (
    <StyledBadge style={finalStyle}>
      <Wrapper to={to} href={href} target={href && "_blank"}>
        {children}
      </Wrapper>
    </StyledBadge>
  );
};

export default Badge;
