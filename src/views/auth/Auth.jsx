import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import { useUserActionsContext } from "../../context/user.context";

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

const Auth = () => {
  const { login, createAccount, setUser } = useUserActionsContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const location = useLocation();
  const isCreateAccountPage = location.pathname.includes("register");
  const { header, submitButtonText, toggleAuthModeLink } =
    config[isCreateAccountPage ? "register" : "login"];

  const onFormChange = key => value => {
    setForm(state => ({
      ...state,
      [key]: value,
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

    try {
      if (isCreateAccountPage) {
        await createAccount(email, password);
      }

      const loginSession = await login(email, password);
      setUser(loginSession);

      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.messsage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="flex items-center justify-center w-3/4 mx-8 bg-white md:w-1/2 md:min-h-screen md:ml-auto md:mx-0 max-md:rounded-2xl">
        <form className="w-full p-8 md:w-96 md:p-4" onSubmit={onFormSubmit}>
          <h1 className="mb-8 text-2xl font-semibold text-center">{header}</h1>

          <div className="flex flex-col items-start gap-3">
            <Input
              label="Email"
              id="email-field"
              className="px-4 py-2 rounded-md shadow"
              type="email"
              value={form.email}
              onChange={onFormChange("email")}
            />
            <Input
              label="Password"
              id="password-field"
              className="px-4 py-2 rounded-md shadow"
              type="password"
              value={form.password}
              onChange={onFormChange("password")}
            />
          </div>

          {error ? <p className="block mt-2 text-red-600">{error}</p> : null}
          <button
            className="block w-full h-12 mt-6 text-indigo-100 transition-colors duration-150 bg-indigo-600 rounded-md hover:bg-indigo-800"
            type="submit"
          >
            {submitButtonText}
          </button>

          <Link
            className="block mt-6 text-center text-indigo-900 transition-colors duration-150 hover:text-indigo-600"
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
