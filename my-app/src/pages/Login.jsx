export function Login() {
  return (
    <div className="flex justify-center align-center h-full">
      <div className="bg-monkey-green p-4 flex flex-col justify-between rounded-md m-12">
        <h1 className="text-lg mb-2 text-white font-semibold ">Login</h1>
        <div className="border"></div>
        <div className="text-white flex flex-col my-2">
          <label className="text-sm">Username</label>
          <input className="userName text-black"></input>
        </div>
        <div className=" text-white flex flex-col my-2">
          <label className="text-sm">Password</label>
          <input className="password text-black"></input>
          <a className="text-xs py-1" href="/forgotPassword">
            Forgot Password
          </a>
        </div>
        <button className="bg-monkey-white mt-4 mb-1 rounded-md">Submit</button>
        <a className="text-xs text-white underline" href="/createAccount">
          Don&apos;t have an account? Create one!
        </a>
      </div>
    </div>
  );
}
