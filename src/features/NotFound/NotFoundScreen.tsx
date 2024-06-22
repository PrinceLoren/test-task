import React from "react";
import { Link } from "react-router-dom";

const NotFoundScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl">Page Not Found</h1>
      <p className="mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundScreen;
