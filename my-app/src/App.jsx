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

function App() {
  return (
    <div className="relative h-full w-full bg-slate-950">
      {/* Background with linear gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="relative z-10">
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
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
