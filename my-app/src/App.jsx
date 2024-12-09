import "./App.css";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieDetails } from "./pages/MovieDetails";
import { Checkout } from "./pages/Checkout";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Admin } from "./pages/Admin";
import { UserProfile } from "./pages/UserProfile";
import { OrderConfirmation } from "./pages/CheckoutSubPages/OrderConfirmation";
import { OrderSummary } from "./pages/CheckoutSubPages/OrderSummary";
import { ResetPassword } from "./pages/ResetPassword";
import { ResetConfirm } from "./pages/ResetConfirm";
import { SearchMovies } from "./pages/SearchMovies";

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
          <Route path="/register" element={<Register />} />
          <Route path="/admin/" element={<Admin />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/summary" element={<OrderSummary />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/search" element={<SearchMovies />} />
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
