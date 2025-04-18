import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, AlertCircle, LogIn } from "lucide-react";

const GoogleAuth = () => {
  const { googleLogin } = useAuth();

  const handleSuccess = async (response: any) => {
    try {
      await googleLogin(response);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => handleSuccess(codeResponse.code),
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => login()}
      className="w-full group relative bg-white border border-gray-200 dark:border-gray-700 rounded-xl py-3.5 px-4 flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200 group-hover:scale-110">
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
      <span className="text-gray-700 dark:text-gray-200 font-medium">
        Sign in with Google
      </span>
    </button>
  );
};

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        remember: credentials.remember,
      });

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid login credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mt-8 max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-600 py-8">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Incline
          </h2>
          <p className="mt-2 text-center text-green-100">
            Sign in to your account
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                htmlFor="username">
                Username
              </label>
              <input
                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                bg-white dark:bg-gray-700 sm:text-sm transition-all duration-200"
                id="username"
                name="username"
                type="text"
                required
                placeholder="johndoe"
                value={credentials.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                bg-white dark:bg-gray-700 sm:text-sm transition-all duration-200"
                id="email"
                name="email"
                type="email"
                required
                placeholder="john.doe@example.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-medium"
                  htmlFor="password">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <input
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                  placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
                  bg-white dark:bg-gray-700 sm:text-sm transition-all duration-200 pr-10"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={credentials.remember}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  isLoading
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200`}>
                {isLoading ? (
                  <>
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
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4">
              <GoogleOAuthProvider clientId="953292062664-05fqrdrqsqphqfgbhnavr5f4n06e25lr.apps.googleusercontent.com">
                <GoogleAuth />
              </GoogleOAuthProvider>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200">
              Create one now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
