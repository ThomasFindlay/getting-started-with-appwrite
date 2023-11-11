import { Outlet } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/UserContextProvider";

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
