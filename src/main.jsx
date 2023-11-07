import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
const ViewInvoices = lazy(() => import("./views/invoice/ViewInvoices.jsx"));
const Invoice = lazy(() => import("./views/invoice/Invoice.jsx"));
const Auth = lazy(() => import("./views/auth/Auth.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        // path: "/invoices",
        element: <ViewInvoices />,
      },
      {
        path: "/invoice/create",
        element: <Invoice />,
      },
      {
        path: "/invoice/:id",
        element: <Invoice />,
      },
      {
        path: "/auth/login",
        element: <Auth />,
      },
      {
        path: "/auth/register",
        element: <Auth />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
