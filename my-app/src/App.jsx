import "./App.css";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";
import { Checkout } from "./pages/Checkout";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { CreateAcc } from "./pages/CreateAcc";
import { Admin } from "./pages/Admin";
import { UserProfile } from "./pages/UserProfile";
import { OrderSummary } from "./pages/CheckoutSubPages/OrderSummary";
import { ResetPassword } from "./pages/ResetPassword";
import { ResetConfirm } from "./pages/ResetConfirm";

function App() {
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:key" element={<Login />} />
          <Route path="/createAccount" element={<CreateAcc />} />
          <Route path="/admin/" element={<Admin />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/summary" element={<OrderSummary />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/password-reset/confirm/:uid/:token"
            element={<ResetConfirm />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
