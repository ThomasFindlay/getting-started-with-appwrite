import { Outlet } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./context/user.context.jsx";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <UserContextProvider>
      <Suspense loading={<div />}>
        <Outlet />
      </Suspense>
      <Toaster />
    </UserContextProvider>
  );
}

export default App;
