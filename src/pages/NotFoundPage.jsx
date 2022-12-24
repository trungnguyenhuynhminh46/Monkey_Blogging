import React from "react";
import styled from "styled-components";
// Components
import Button from "../component/Button";

const StyledPageNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;

  min-height: 100vh;
  .heading {
    font-size: 50px;
    font-weight: 700;
  }
  @media screen and (max-width: 1024px) {
    .heading {
      font-size: 28px;
    }
  }
`;

const NotFoundPage = () => {
  return (
    <StyledPageNotFound>
      <img srcSet="/404.png 2x" alt="" className="image" />
      <h1 className="heading">Oops ! Page not found</h1>
      <Button to="/" style={{ width: 300 }}>
        Back Home
      </Button>
    </StyledPageNotFound>
  );
};

export default NotFoundPage;
