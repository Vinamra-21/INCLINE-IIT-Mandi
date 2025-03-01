import React from "react";

type ProtectedPageProps = {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
};

const JalShakti: React.FC<ProtectedPageProps> = ({
  isLoginOpen,
  setIsLoginOpen,
}) => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Welcome, User!</h1>
      <p>
        This is a protected page. You can only see this if you're logged in.
      </p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        onClick={() => setIsLoginOpen(!isLoginOpen)}>
        {isLoginOpen ? "Close Login" : "Open Login"}
      </button>
    </div>
  );
};

export default JalShakti;
