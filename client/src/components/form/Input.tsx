import React, { ChangeEventHandler } from "react";

interface InputProps {
  name?: string;
  id?: string;
  className?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  text?: string;
}

const Input: React.FC<InputProps> = ({ name, id, className, type, onChange, text }) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {text}
      </label>
      <input type="text" onChange={onChange} name={name} id={id} className={!className ? `mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md` : className} />
    </>
  );
};

export default Input;
