import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./page/auth/AuthPage";
import { DashboardPage } from "./page/dashboard/DashboardPage";
import {
  addNew,
  dashboard,
  login,
  resetPassword,
  signup,
} from "./constants/path";
import ResetPassword from "./page/dashboard/ResetPassword";
import Create from "./page/dashboard/add new/Create";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path={login} element={<Auth />} />
        <Route path={signup} element={<Auth />} />

        <Route path={dashboard} element={<DashboardPage />}>
          <Route path={resetPassword} element={<ResetPassword />} />
          {/* <Route path="give-rating" element={<GiveRating />} /> */}
          <Route path={addNew} element={<Create />} />
          {/* Default nested route */}
          {/* <Route index element={<div>Welcome to Dashboard</div>} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
