import React from "react";
import { useController } from "react-hook-form";

const CheckBox = ({ checked, children, control, name, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <label>
      <input
        {...field}
        {...props}
        type="checkbox"
        checked={checked}
        className="hidden-input"
        // Overwrite default onChange
        onChange={() => {}}
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

export default CheckBox;
