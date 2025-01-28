import React from "react";

const Spinner = () => {
  return (
    <div className="flex gap-1 justify-center items-center">
      <div className="w-2 h-2 bg-cyan-500  animate-[bounce_.5s_ease-in-out_infinite]"></div>
      <div className="w-2 h-2 bg-blue-500  animate-[bounce_.5s_ease-in-out_infinite_0.1s]"></div>
      <div className="w-2 h-2 bg-indigo-500  animate-[bounce_.5s_ease-in-out_infinite_0.2s]"></div>
      <div className="w-2 h-2 bg-purple-500  animate-[bounce_.5s_ease-in-out_infinite_0.3s]"></div>
    </div>
  );
};

export default Spinner;
