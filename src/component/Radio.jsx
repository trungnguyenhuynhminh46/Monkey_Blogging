import React from "react";
import { useController } from "react-hook-form";

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
          className={`w-7 h-7 rounded-full ${
            checked ? "bg-green-400" : "bg-gray-200"
          }`}
        ></div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
