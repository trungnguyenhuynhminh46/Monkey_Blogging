import React from "react";
import { useController } from "react-hook-form";
// Components
import Icons from "./Icons";

const Radio = ({ name, control, checked, children, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        {...field}
        {...props}
        onChange={() => {}}
        type="radio"
        checked={checked}
        className="hidden-input"
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`flex justify-center items-center w-7 h-7 rounded-full ${
            checked ? "bg-green-400 text-white" : "bg-gray-200 text-gray-200"
          }`}
        >
          <Icons.IconCheck iconClassName="w-4 h-4" />
        </div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
