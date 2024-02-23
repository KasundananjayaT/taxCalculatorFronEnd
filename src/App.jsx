import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/common/Layout";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Changepw from "./components/Changepw";
import AddNew from "./components/AddNew";
import PaymentHistory from "./components/PaymentHistory";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/changepassword" element={<Changepw />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add" element={<AddNew />} />
            <Route path="/dashboard/payment" element={<PaymentHistory />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
