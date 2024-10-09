import { useLocation, Link } from "react-router-dom";

export function Payment() {
  return (
    <div className="flex flex-row justify-center">
      <button className="btn mt-5 p-2 m-2">Confirm</button>
      <button className="btn mt-5 p-2 m-2">Cancel</button>
    </div>
  );
}
