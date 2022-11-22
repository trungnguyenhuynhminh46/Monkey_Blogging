import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
// Components
import Button from "../../component/Button";
import CompoundLink from "../../component/CompoundLink";
import { useEffect } from "react";

const StyledHeaderPost = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #f0ebeb;
`;

const Header = () => {
  // States
  const { userInfo } = useAuth();
  return (
    <StyledHeaderPost>
      <div className="flex items-center gap-6 mr-6">
        <Button
          style={{ width: 192 }}
          fontSize={"18px"}
          fontWeight={600}
          padding={"18px 0"}
          to="/dashboard/add-post"
        >
          Write new post
        </Button>
        <CompoundLink to="/dashboard/profile">
          <img
            src={userInfo?.photoURL || "/image-placeholder.png"}
            alt=""
            className="w-14 h-14 rounded-full"
          />
        </CompoundLink>
      </div>
    </StyledHeaderPost>
  );
};

export default Header;
