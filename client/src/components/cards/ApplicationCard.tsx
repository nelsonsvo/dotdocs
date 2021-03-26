import React, { MouseEventHandler } from "react";

interface ApplicationCardProps {
  name: string;
  mt?: number;
  onEdit: () => void;
  onDelete: () => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ name, onDelete, onEdit, mt }) => {
  return (
    <div className={`bg-gray-100 py-5 px-5 rounded-md shadow ${mt ? `mt-${mt}` : ""}`}>
      <div className="flex flex-row justify-between text-gray-800">
        <div>
          <h1 className="text-sm md:text-lg">{name}</h1>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div onClick={onDelete}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div onClick={onEdit}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
