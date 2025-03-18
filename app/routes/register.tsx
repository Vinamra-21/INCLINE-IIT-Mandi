import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  const { googleLogin } = useAuth();

  const handleSuccess = async (response) => {
    try {
      await googleLogin(response.code);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleSuccess(codeResponse.code),
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => login()}
      className="w-full mt-4 bg-white border border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <span className="text-gray-700 font-medium">Sign up with Google</span>
    </button>
  );
};

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    if (userData.password1 !== userData.password2) {
      setErrors({ password2: ["Passwords do not match"] });
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(userData);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrors(result.errors || { detail: "Registration failed" });
      }
    } catch (error) {
      setErrors({ detail: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to check if field has errors
  const hasError = (fieldName) =>
    errors[fieldName] && errors[fieldName].length > 0;

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className=" mt-14 max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-300 to-green-600 py-6">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Incline
          </h2>
          <p className="mt-2 text-center text-blue-200">Create your account</p>
        </div>

        <div className="p-8">
          {errors.detail && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errors.detail}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="first_name">
                  First Name
                </label>
                <input
                  className={`appearance-none block w-full px-3 py-3 border ${
                    hasError("first_name")
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="John"
                  value={userData.first_name}
                  onChange={handleChange}
                />
                {hasError("first_name") && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.first_name[0]}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="last_name">
                  Last Name
                </label>
                <input
                  className={`appearance-none block w-full px-3 py-3 border ${
                    hasError("last_name") ? "border-red-500" : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Doe"
                  value={userData.last_name}
                  onChange={handleChange}
                />
                {hasError("last_name") && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.last_name[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="username">
                Username
              </label>
              <input
                className={`appearance-none block w-full px-3 py-3 border ${
                  hasError("username") ? "border-red-500" : "border-gray-300"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                id="username"
                name="username"
                type="text"
                required
                placeholder="johndoe"
                value={userData.username}
                onChange={handleChange}
              />
              {hasError("username") && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username[0]}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email">
                Email Address
              </label>
              <input
                className={`appearance-none block w-full px-3 py-3 border ${
                  hasError("email") ? "border-red-500" : "border-gray-300"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                value={userData.email}
                onChange={handleChange}
              />
              {hasError("email") && (
                <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password1">
                Password
              </label>
              <input
                className={`appearance-none block w-full px-3 py-3 border ${
                  hasError("password1") ? "border-red-500" : "border-gray-300"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                id="password1"
                name="password1"
                type="password"
                required
                placeholder="••••••••"
                value={userData.password1}
                onChange={handleChange}
              />
              {hasError("password1") && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password1[0]}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password2">
                Confirm Password
              </label>
              <input
                className={`appearance-none block w-full px-3 py-3 border ${
                  hasError("password2") ? "border-red-500" : "border-gray-300"
                } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                id="password2"
                name="password2"
                type="password"
                required
                placeholder="••••••••"
                value={userData.password2}
                onChange={handleChange}
              />
              {hasError("password2") && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password2[0]}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  isLoading
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}>
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleOAuthProvider clientId="953292062664-05fqrdrqsqphqfgbhnavr5f4n06e25lr.apps.googleusercontent.com">
              <GoogleAuth />
            </GoogleOAuthProvider>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
