import React from "react";
import Sidebar from "./components/ui/Sidebar";
import Layout from "./components/ui/Layout";
import Routes from "./components/routes/Routes";

function App() {
  return (
    <div className="md:flex">
      <Sidebar />
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}

export default App;
