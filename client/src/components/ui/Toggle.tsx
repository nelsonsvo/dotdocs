import React, { useState } from "react";

interface ToggleProps {
  className?: string;
  defaultChecked: boolean;
  name: string;
  onChange: () => void;
  icon?: any;
}

const Toggle: React.FC<ToggleProps> = ({ className, defaultChecked, name, onChange, icon }) => {
  const [checked, setChecked] = useState(false);
  let finalClass = `${className} relative w-12 h-6 flex select-none cursor-pointer my-auto`;
  let togglerClass =
    "h-6 w-6 border-2 absolute z-10 rounded-full bg-white transition-transform duration-300 ease-in-out flex justify-center items-center";
  let backgroundClass =
    "absolute left-0 top-0 h-full w-full bg-gray-200 rounded-full transition-transform duration-300 ease-in-out";
  if (checked) {
    backgroundClass += " bg-green-400";
    togglerClass += " transform translate-x-full border-green-400";
  } else {
    backgroundClass += " bg-gray-200";
    togglerClass += " border-gray-300";
  }
  return (
    <div className="flex items-center h-full ">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} onChange={onChange} className="hidden" />
      <label
        className={finalClass}
        htmlFor={name}
        onClick={() => {
          setChecked(!checked);
          onChange();
        }}
      >
        <span className={backgroundClass} />
        <span className={togglerClass}>
          {icon &&
            React.cloneElement(icon, {
              className: "text-xs text-gray-800",
            })}
        </span>
      </label>
    </div>
  );
};

export default Toggle;
