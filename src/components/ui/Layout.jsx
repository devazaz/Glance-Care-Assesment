import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full md:ml-64 min-h-screen p-4 bg-white">{children}</div>
  );
};

export default Layout;
