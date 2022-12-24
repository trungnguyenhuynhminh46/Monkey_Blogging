import React from "react";
import styled, { css } from "styled-components";
// Components
import { Link } from "react-router-dom";
import Icons from "../component/Icons";

const StyledResposiveMenu = styled.div`
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
  }
`;

const ResponsiveMenu = ({ show, setShow, data = [] }) => {
  return (
    <StyledResposiveMenu show={show}>
      <div className="toggle-header">
        <Link to="/">
          <img srcSet="/logo.png 6x" alt="monkey image" className="logo" />
        </Link>
        <span>Monkey Blogging</span>
        <span
          className="back"
          onClick={() => {
            setShow(false);
          }}
        >
          <Icons.IconChevonLeft />
        </span>
      </div>
      <div className="resposive-menu">
        {data.map((item, index) => {
          return (
            <div className="responsive-item" key={index}>
              <Link to={item.to} onClick={item.onClick}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="info"></div>
    </StyledResposiveMenu>
  );
};

export default ResponsiveMenu;
