import React from "react";
import styled from "styled-components";
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
    background: linear-gradient(
      to bottom right,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
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
              Go to dashboard
            </Button>
          </Link>
        </div>
        <img src="/img-banner.png" alt="" />
      </div>
    </StyledHomeBanner>
  );
};

export default HomeBanner;
