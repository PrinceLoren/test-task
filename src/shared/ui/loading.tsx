import React from "react";

export const FullSizeSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-4 border-slate-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};
