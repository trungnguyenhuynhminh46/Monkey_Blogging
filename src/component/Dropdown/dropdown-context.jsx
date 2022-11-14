import React, { createContext, useContext } from "react";

const DropdownContext = createContext();

const DropdownProvider = ({ children, value }) => {
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
};

function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined") {
    throw new Error("useDropdown must be used within DropdownProvider");
  }
  return context;
}

export { useDropdown, DropdownProvider };
