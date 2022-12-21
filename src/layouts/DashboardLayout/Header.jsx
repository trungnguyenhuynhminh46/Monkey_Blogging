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

const StyledHeaderPost = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #f0ebeb;
`;

const Header = () => {
  // States
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
