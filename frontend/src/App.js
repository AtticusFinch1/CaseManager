import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterPage from "./containers/auth/RegisterPage";
import LoginPage from "./containers/auth/LoginPage";
import HomePage from "./containers/pages/HomePage";
import SuitDetail from "./containers/pages/SuitDetail";

const App = () => {
  const dispatch = useDispatch();
  return (
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/suit/:suitId" element={<SuitDetail />} />
        </Routes>
      </Router>
  );
}

export default App;
