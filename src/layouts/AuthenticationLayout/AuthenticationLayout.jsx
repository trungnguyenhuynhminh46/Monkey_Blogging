import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledAuthenticationLayout = styled.div`
  min-height: 100vh;
  padding: 20px;
  /* Prevent select */
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 24px;
  }
`;

const AuthenticationLayout = ({ children }) => {
  return (
    <StyledAuthenticationLayout>
      <div className="container">
        <Link to="/" className="logo">
          <img srcSet="/logo.png 3x" alt="monkey image" />
        </Link>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </StyledAuthenticationLayout>
  );
};

export default AuthenticationLayout;
