import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./page/auth/AuthPage";
import { DashboardPage } from "./page/dashboard/DashboardPage";
import {
  addNew,
  dashboard,
  giveRating,
  login,
  management,
  resetPassword,
  seeRatings,
  signup,
} from "./constants/path";
import ResetPassword from "./page/dashboard/ResetPassword";
import Create from "./page/dashboard/add new/Create";
import Management from "./page/dashboard/management/Management";
import GiveRating from "./page/dashboard/give rating/GiveRating";
import SeeRatings from "./page/dashboard/see ratings/SeeRatings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path={login} element={<Auth />} />
        <Route path={signup} element={<Auth />} />

        <Route path={dashboard} element={<DashboardPage />}>
          <Route path={resetPassword} element={<ResetPassword />} />
          <Route path={giveRating} element={<GiveRating />} />
          <Route path={addNew} element={<Create />} />
          <Route path={management} element={<Management />} />
          <Route path={seeRatings} element={<SeeRatings />} />
          {/* Default nested route */}
          {/* <Route index element={<div>Welcome to Dashboard</div>} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
