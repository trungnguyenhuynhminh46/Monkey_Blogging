import React from "react";
import styled from "styled-components";

const StyledInfoDetail = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  .post__dot {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background: ${(props) => props.color};
    opacity: 0.4;
  }
`;

const InfoDetail = ({
  date = "Mar 23",
  name = "Andiez Le",
  color = "white",
  style,
}) => {
  const finalStyle = {
    ...style,
    color: color,
  };
  return (
    <StyledInfoDetail style={finalStyle} color={color}>
      <div className="post__date">{date}</div>
      <div className="post__dot"></div>
      <div className="post__author">{name}</div>
    </StyledInfoDetail>
  );
};

export default InfoDetail;
