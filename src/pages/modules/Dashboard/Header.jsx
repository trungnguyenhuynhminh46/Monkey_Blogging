import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Components
import Button from "../../../component/Button";
import CompoundLink from "../../../component/CompoundLink";

const StyledHeaderPost = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #f0ebeb;
`;

const Header = () => {
  return (
    <StyledHeaderPost>
      <div className="flex items-center gap-6 mr-6">
        <Button
          style={{ width: 192 }}
          fontSize={"18px"}
          fontWeight={600}
          padding={"18px 0"}
        >
          <Link to="/manage/add-post">Write new post</Link>
        </Button>
        <CompoundLink to="/admin">
          <img
            src="https://plus.unsplash.com/premium_photo-1666264200746-51580f36334e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="w-14 h-14 rounded-full"
          />
        </CompoundLink>
      </div>
    </StyledHeaderPost>
  );
};

export default Header;
