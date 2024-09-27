import React from "react";

const Skeleton: React.FC<{ height: string; width: string }> = ({ height, width }) => {
  return (
    <div
      className="animate-pulse bg-gray-300 rounded"
      style={{ height, width }}
    />
  );
};

export default Skeleton;
