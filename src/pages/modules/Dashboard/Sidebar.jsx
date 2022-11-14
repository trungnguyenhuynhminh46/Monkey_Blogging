import React from "react";
import styled from "styled-components";
// Assets
import Icons from "../../../component/Icons";

const StyledOption = styled.a`
  cursor: pointer;
  padding: 14px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 32px;
  span {
    font-weight: 500;
  }
  &:hover,
  &.active {
    background: #f1fbf7;
    color: #2ebac1;
  }
`;

const Sidebar = () => {
  return (
    <div className="w-full max-w-[300px] rounded-xl overflow-hidden shadow-lg">
      <div className="p-7 flex items-center gap-x-7">
        <img srcSet="/logo.png" alt="" className="w-10 h-auto" />
        <span className="font-semibold">Monkey Blogging</span>
      </div>
      <StyledOption className="active">
        <Icons.IconCube></Icons.IconCube>
        <span>Dashboard</span>
      </StyledOption>
      <StyledOption>
        <Icons.IconBook></Icons.IconBook>
        <span>Post</span>
      </StyledOption>
      <StyledOption>
        <Icons.IconBox></Icons.IconBox>
        <span>Category</span>
      </StyledOption>
      <StyledOption>
        <Icons.IconUsers></Icons.IconUsers>
        <span>User</span>
      </StyledOption>
      <StyledOption>
        <Icons.IconLogOut></Icons.IconLogOut>
        <span>Logout</span>
      </StyledOption>
    </div>
  );
};

export default Sidebar;
