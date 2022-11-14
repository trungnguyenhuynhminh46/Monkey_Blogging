import React, { useState } from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({
  placeholder = "Please select an option",
  children,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const handleToggleShow = () => {
    setShow((prev) => setShow(!prev));
  };
  return (
    <DropdownProvider value={props}>
      <div className="relative inline-block w-full">
        <div
          className="flex items-center justify-between p-5 bg-[#E7ECF3] rounded cursor-pointer font-medium"
          onClick={handleToggleShow}
        >
          <span>{placeholder}</span>
          <span>
            {show ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </span>
        </div>
        {show && (
          <div className="absolute top-full left-0 w-full bg-white shadow-sm">
            {children}
          </div>
        )}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
