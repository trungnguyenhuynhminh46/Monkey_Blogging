import React from "react";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";

const HomePage = () => {
  return (
    <div>
      This is Home Page
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default HomePage;
