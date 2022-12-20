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
        {/* <form action="#" className="search">
          <input
            type="text"
            placeholder="Search posts..."
            className="search_input"
          />
          <button className="search_button">
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="7.66669"
                cy="7.05161"
                rx="6.66669"
                ry="6.05161"
                stroke="#999999"
                strokeWidth="1.5"
              />
              <path
                d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form> */}
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
