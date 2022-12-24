import React, { useState } from "react";
import styled, { css } from "styled-components";
// Components
import Header from "./Header";

const StyledHomeLayout = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .toggle-btn {
    cursor: pointer;
    padding: 12px;
    display: none;
  }
  /* .toggle-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    display: flex;
    padding: 20px 16px;
    width: 300px;
    flex-direction: column;
    background: white;

    transform: translateX(-200%);
    transition: all 0.5s linear;
    ${(props) =>
    props.show === true &&
    css`
      transform: translateX(0);
    `}
  }
  .toggle-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    span {
      font-weight: 600;
    }
    .back {
      display: inline-block;
      padding: 12px;
      cursor: pointer;
    }
  }
  .responsive-item {
    a {
      display: flex;
      align-items: center;
      gap: 20px;
      line-height: 1.5em;
      padding: 1em 2em;
      font-weight: 600;
      color: rgb(128, 129, 145);
      margin-bottom: 20px;
      cursor: pointer;
      &:hover {
        background: rgb(241, 251, 247);
        color: rgb(29, 192, 113);
      }
    }
  } */
  .navigation {
    display: flex;
  }
  .navigation_item {
    a {
      display: inline-block;
      padding: 12px 24px;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
  }
  .search {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    max-width: 320px;

    padding: 18px 0;
    border: 1px solid #eeeeee;
    border-radius: 8px;
    &_input {
      outline: none;
      border: none;
      flex: 1;
      margin-left: 24px;

      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
    &_button {
      padding: 24px;
      margin: -24px 0;
    }
  }
  .welcome {
    font-weight: 500;
    .name {
      font-weight: 700;
      color: ${(props) => props.theme.primary};
    }
  }

  @media screen and (max-width: 950px) {
    .toggle-btn {
      display: inline-block;
    }
    .left {
      display: none;
    }
  }
  @media screen and (max-width: 415px) {
    .welcome {
      display: none;
    }
  }
`;

const HomeLayout = ({ children }) => {
  return (
    <StyledHomeLayout>
      <div className="container">
        <Header></Header>
        {children}
      </div>
    </StyledHomeLayout>
  );
};

export default HomeLayout;
