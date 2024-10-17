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
    <div className="absolute top-0 -z-10 min-h-screen w-full bg-white">
      {/* Main centered dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[rgba(0,100,0,0.7)] opacity-70 blur-[80px]" />
      </div>

      {/* Random green dots */}
      <div className="absolute top-10 left-20 h-[200px] w-[200px] rounded-full bg-[rgba(0,100,0,0.7)] opacity-50 blur-[50px]" />
      <div className="absolute bottom-20 right-10 h-[150px] w-[150px] rounded-full bg-[rgba(0,100,0,0.7)] opacity-50 blur-[40px]" />
      <div className="absolute top-1/2 left-1/4 h-[100px] w-[100px] rounded-full bg-[rgba(0,100,0,0.7)] opacity-50 blur-[30px]" />
      <div className="absolute bottom-1/3 right-1/3 h-[120px] w-[120px] rounded-full bg-[rgba(0,100,0,0.7)] opacity-50 blur-[35px]" />

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
  );
}

export default App;
