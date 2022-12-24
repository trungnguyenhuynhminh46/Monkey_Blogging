import React from "react";
import styled from "styled-components";
// Assets
import { auth } from "../../../firebase/firebase-config";
// Components
import Button from "../../../component/Button";
import { Link } from "react-router-dom";

const StyledHomeBanner = styled.div`
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;

    min-height: 520px;
    padding: 48px 32px;
    background-image: url("https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  }
  .content {
    color: white;
    max-width: 450px;
    &__title {
      font-style: normal;
      font-weight: 700;
      font-size: 48px;
      line-height: 59px;
    }
    &__body {
      margin: 30px 0;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 28px;
    }
  }
  @media screen and (max-width: 415px) {
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .content__title {
      text-align: center;
    }
  }
`;

const HomeBanner = () => {
  return (
    <StyledHomeBanner>
      <div className="banner">
        <div className="content">
          <h1 className="content__title">Monkey Blogging</h1>
          <p className="content__body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            sit dolorum eveniet laudantium dolor quo optio facilis aspernatur
            illo architecto neque accusantium beatae soluta quis provident sint
            odit voluptas in?
          </p>
          <Link to="/dashboard">
            <Button style={{ maxWidth: 230 }} bg_white>
              {auth?.currentUser?.uid ? (
                <span>Go to dashboard</span>
              ) : (
                <span>Get stated</span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </StyledHomeBanner>
  );
};

export default HomeBanner;
