import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div class="flex flex-col">
        <div class="text-lg">New</div>
        <div class="text-sm">Testing</div>
        <div>Tailwind</div>
      </div>
    </>
  );
}

export default App;
