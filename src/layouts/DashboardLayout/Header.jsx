import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth-context";
import { auth, db } from "../../firebase/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
// Components
import Button from "../../component/Button";
import CompoundLink from "../../component/CompoundLink";
import { useEffect } from "react";
import Icons from "../../component/Icons";
import ResponsiveMenu from "../../component/ResponsiveMenu";

const StyledHeaderPost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0ebeb;
  @media screen and (min-width: 1280px) {
    justify-content: end;
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

const Header = () => {
  // States
  const [showResposiveMenu, setShowResponsiveMenu] = useState(false);
  const { userInfo } = useAuth();
  const [user, setUser] = useState(undefined);
  // Effects
  useEffect(() => {
    const getUser = () => {
      let unsub;
      if (auth.currentUser) {
        const docRef = doc(db, "users", auth.currentUser?.uid);
        unsub = onSnapshot(docRef, (doc) => {
          setUser({ uid: doc.id, ...doc.data() });
        });
      }
      return unsub;
    };
    const unsub = getUser();
    // Clean up
    return () => {
      if (typeof unsub === "function") {
        unsub();
      }
    };
  }, [auth?.currentUser]);
  return (
    <StyledHeaderPost>
      <span
        className="inline-block xl:hidden p-8 cursor-pointer"
        onClick={() => {
          setShowResponsiveMenu(true);
        }}
      >
        <Icons.IconBar />
      </span>
      <ResponsiveMenu
        show={showResposiveMenu}
        setShow={setShowResponsiveMenu}
        data={dashboardSidebarData}
      />
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
            src={user?.image || "/image-placeholder.png"}
            alt=""
            className="w-14 h-14 rounded-full"
            title={user?.displayName}
          />
        </CompoundLink>
      </div>
    </StyledHeaderPost>
  );
};

export default Header;
