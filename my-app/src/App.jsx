import "./App.css";
import { NavBar } from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowseMovies } from "./pages/BrowseMovies";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { CreateAcc } from "./pages/CreateAcc";
import { ConfirmAccount } from "./pages/ConfirmAccount";

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowseMovies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAcc />} />
          <Route path="/confirmAccount/:key" element={<ConfirmAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
