import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
// Assets
import { auth } from "../../firebase/firebase-config";
import Icons from "../../component/Icons";

const StyledOption = styled.div`
  .inner {
    cursor: pointer;
    padding: 14px 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 32px;
  }
  span {
    font-weight: 500;
  }
  &:hover,
  &.active {
    background: #f1fbf7;
    color: #2ebac1;
  }
`;

const dashboardSidebarData = [
  {
    title: "Dashboard",
    icon: <Icons.IconCube />,
    to: "/dashboard",
  },
  {
    title: "Post",
    icon: <Icons.IconBook />,
    to: "/dashboard/posts",
  },
  {
    title: "Category",
    icon: <Icons.IconBox />,
    to: "/dashboard/categories",
  },
  {
    title: "Users",
    icon: <Icons.IconUsers />,
    to: "/dashboard/users",
  },
  {
    title: "Logout",
    icon: <Icons.IconLogOut />,
    to: "/",
    onClick: () => {
      signOut(auth);
    },
  },
];

const Sidebar = () => {
  return (
    <div className="w-full max-w-[300px] rounded-xl overflow-hidden shadow-lg">
      <div className="p-7 flex items-center gap-x-7">
        <Link to="/">
          <img srcSet="/logo.png" alt="" className="w-10 h-auto" />
        </Link>
        <span className="font-semibold">Monkey Blogging</span>
      </div>
      {dashboardSidebarData &&
        dashboardSidebarData.map(({ title, icon, to, onClick }, index) => {
          return (
            <StyledOption key={index} onClick={onClick}>
              <Link to={to} className="inner w-full h-full cursor-pointer">
                {icon}
                <span>{title}</span>
              </Link>
            </StyledOption>
          );
        })}
    </div>
  );
};

export default Sidebar;
