import React from "react";
import { DropdownProvider } from "./dropdown-context";
import useClickOutSide from "../../hooks/useClickOutSide";

const Dropdown = ({
  placeholder = "Please select an option",
  children,
  style,
  selectionBG = "#E7ECF3",
  ...props
}) => {
  const [show, setShow, nodeRef] = useClickOutSide();
  const handleToggleShow = () => {
    setShow(!show);
  };
  const value = { ...props, show, setShow };
  return (
    <DropdownProvider value={value}>
      <div
        className="relative inline-block w-full rounded border border-solid border-gray-100 space-y-2"
        ref={nodeRef}
        style={style}
      >
        <div
          className={`flex items-center justify-between p-5 bg-[${selectionBG}] rounded cursor-pointer font-medium`}
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
          <div className="absolute top-full left-0 w-full bg-white shadow-sm z-50">
            {children}
          </div>
        )}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
