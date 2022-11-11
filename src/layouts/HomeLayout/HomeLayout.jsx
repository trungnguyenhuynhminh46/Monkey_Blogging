import React from "react";
import styled from "styled-components";
// Components
import Header from "./Header";

const StyledHomeLayout = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 56px 0;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .navigation {
    display: flex;
  }
  .navigation_item {
    padding: 12px 24px;
    a {
      font-style: normal;
      font-weight: 500;
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
