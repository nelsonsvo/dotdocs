import React from "react";
import { useForm } from "react-hook-form";

interface ProfileSectionProps {}

const MyProfileSection: React.FC<ProfileSectionProps> = () => {
  const { register, errors, handleSubmit } = useForm();
  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          ref={register({
            required: "Username is required",
          })}
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default MyProfileSection;
