import React, { useState, useEffect, useRef } from "react";

const useClickOutSide = (validDOMs = ["button", "a"]) => {
  const elementIsValid = (element) => {
    validDOMs.forEach((item) => {
      if (element.matches(item)) {
        return true;
      }
    });
    return false;
  };
  const nodeRef = useRef(false);
  // States
  const [show, setShow] = useState(false);
  // Effects
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !elementIsValid(e.target)
      ) {
        setShow(false);
      }
    };
    window.addEventListener("click", handleClickOutSide);
    // Clean up
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  return [show, setShow, nodeRef];
};

export default useClickOutSide;
