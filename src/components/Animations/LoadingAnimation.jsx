import React from "react";

const LoadingAnimation = ({message}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 border-4 border-dashed rounded-full animate-spin dark:border-primary"></div>
      <h1 className="text-[12px] text-green-500">{message}</h1>
    </div>
  );
};

export default LoadingAnimation;
