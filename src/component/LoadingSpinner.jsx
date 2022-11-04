import React from "react";
import styled from "styled-components";

const StyledLoadingSpinner = styled.div`
  display: inline-block;
  height: ${(props) => props.size};
  width: ${(props) => props.size};

  margin: -10px 0;

  border-radius: 50%;
  border: ${(props) => props.borderWidth} solid white;
  border-top: ${(props) => props.borderWidth} solid transparent;
  border-bottom: ${(props) => props.borderWidth} solid transparent;

  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({ size = "40px", borderWidth = "5px" }) => {
  return (
    <StyledLoadingSpinner
      size={size}
      borderWidth={borderWidth}
    ></StyledLoadingSpinner>
  );
};

export default LoadingSpinner;
