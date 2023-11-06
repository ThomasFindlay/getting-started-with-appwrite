import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const config = {
  login: {
    header: "Login",
    submitButtonText: "Log In",
    toggleAuthModeLink: {
      to: "/auth/register",
      text: "Create a new account",
    },
  },
  register: {
    header: "Create Account",
    submitButtonText: "Register",
    toggleAuthModeLink: {
      to: "/auth/login",
      text: "Already have an account?",
    },
  },
};

const Auth = props => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const location = useLocation();
  const isLoginPage = location.pathname.includes("login");
  const { header, submitButtonText, toggleAuthModeLink } =
    config[isLoginPage ? "login" : "register"];

  const onFormChange = key => event => {
    setForm(state => ({
      ...state,
      [key]: event.target.value,
    }));
  };

  const onFormSubmit = async event => {
    event.preventDefault();
    const { email, password } = form;
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    if (isLoginPage) {
      // login
    } else {
      // create account
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 min-h-screen flex flex-col items-center justify-center">
      <div className="w-3/4 md:w-1/2 md:min-h-screen md:ml-auto flex justify-center items-center bg-white mx-8 md:mx-0">
        <form
          className="w-full md:w-96 p-8 md:p-4 rounded-xl"
          onSubmit={onFormSubmit}
        >
          <h1 className="text-2xl font-semibold mb-8">{header}</h1>

          <div className="flex flex-col gap-3 items-start">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email-field">Email</label>
              <input
                id="email-field"
                className="shadow px-4 py-2 rounded-md"
                type="email"
                value={form.email}
                onChange={onFormChange("email")}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="password-field">Password</label>
              <input
                id="password-field"
                className="shadow px-4 py-2 rounded-md"
                type="password"
                value={form.password}
                onChange={onFormChange("password")}
              />
            </div>
          </div>
          <button
            className="block w-full h-12 bg-indigo-800 text-indigo-50 rounded-md mt-6"
            type="submit"
          >
            {submitButtonText}
          </button>

          <Link
            className="text-center mt-6 block hover:text-indigo-600 transition-colors duration-150"
            to={toggleAuthModeLink.to}
          >
            {toggleAuthModeLink.text}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Auth;
