import React from "react";
// Assets
import { useAuth } from "../../contexts/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Link } from "react-router-dom";
// Components
import Button from "../../component/Button";
import CompoundLink from "../../component/CompoundLink";

const Header = () => {
  const { userInfo } = useAuth();
  // Functions
  const getLastWord = (string) => {
    if (!string) return "";
    const wordsBag = string.split(" ");
    return wordsBag[wordsBag.length - 1];
  };
  return (
    <div className="header">
      <div className="left">
        <Link to="/">
          <img srcSet="/logo.png 5x" alt="monkey image" className="logo" />
        </Link>
        <ul className="navigation">
          <li className="navigation_item">
            <Link to="/">Home</Link>
          </li>
          <li className="navigation_item">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="navigation_item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        {!userInfo ? (
          <Button to="/sign-in" style={{ width: 190, margin: 0 }}>
            Sign in
          </Button>
        ) : (
          <div className="welcome">
            <span>Welcome back, </span>
            <CompoundLink to="/dashboard" className="name">
              {getLastWord(userInfo?.displayName)}
            </CompoundLink>
            <button
              onClick={() => {
                signOut(auth);
              }}
              className="p-2 ml-4 rounded-md text-white bg-[#A4D96C]"
            >
              sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
