import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
// import ReCAPTCHA from "react-google-recaptcha";
import {
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

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

// List of countries for the dropdown
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

// User types
const userTypes = [
  "Academic Researcher",
  "Industry Professional",
  "Student",
  "Educator",
  "Government Agency",
  "Non-profit Organization",
  "Independent Researcher",
  "Other",
];

// Research interests
const researchInterests = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Computational Biology",
  "Environmental Science",
  "Social Sciences",
  "Physics",
  "Chemistry",
  "Engineering",
  "Medicine",
  "Economics",
  "Business",
  "Education",
  "Humanities",
  "Other",
];

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    organization: "",
    country: "",
    user_type: "",
    research_interest: "",
    terms_accepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  };

  // const handleCaptchaChange = (value) => {
  //   setCaptchaVerified(!!value);
  // };

  const validateStep1 = () => {
    const newErrors = {};

    if (!userData.first_name.trim())
      newErrors.first_name = ["First name is required"];
    if (!userData.last_name.trim())
      newErrors.last_name = ["Last name is required"];
    if (!userData.username.trim())
      newErrors.username = ["Username is required"];
    if (!userData.email.trim()) newErrors.email = ["Email is required"];
    else if (!/\S+@\S+\.\S+/.test(userData.email))
      newErrors.email = ["Invalid email address"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!userData.organization.trim())
      newErrors.organization = ["Organization is required"];
    if (!userData.country) newErrors.country = ["Please select your country"];
    if (!userData.user_type)
      newErrors.user_type = ["Please select your user type"];
    if (!userData.research_interest)
      newErrors.research_interest = ["Please select your research interest"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const goToPrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const newErrors = {};

    if (userData.password1 !== userData.password2) {
      newErrors.password2 = ["Passwords do not match"];
    }

    if (userData.password1.length < 8) {
      newErrors.password1 = ["Password must be at least 8 characters long"];
    }

    // if (!captchaVerified) {
    //   newErrors.captcha = ["Please verify you are not a robot"];
    // }

    if (!userData.terms_accepted) {
      newErrors.terms = ["You must accept the terms and conditions"];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

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

  // Progress indicator
  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {["Account Details", "Professional Info", "Security"].map(
            (label, i) => (
              <div
                key={i}
                className={`text-xs font-medium ${
                  i + 1 === step
                    ? "text-green-600 dark:text-green-400"
                    : i + 1 < step
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-400"
                }`}>
                {label}
              </div>
            )
          )}
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mt-16 mb-8 max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-600 py-8">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Incline
          </h2>
          <p className="mt-2 text-center text-green-100">Create your account</p>
        </div>

        <div className="p-8">
          {renderProgressBar()}

          {errors.detail && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 mb-6 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-400">
                    {errors.detail}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Account Details */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                      htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      className={`appearance-none block w-full px-3 py-3 border ${
                        hasError("first_name")
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                      sm:text-sm transition-all duration-200`}
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="John"
                      value={userData.first_name}
                      onChange={handleChange}
                      required
                    />
                    {hasError("first_name") && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.first_name[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                      htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      className={`appearance-none block w-full px-3 py-3 border ${
                        hasError("last_name")
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                      sm:text-sm transition-all duration-200`}
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Doe"
                      value={userData.last_name}
                      onChange={handleChange}
                      required
                    />
                    {hasError("last_name") && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.last_name[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="username">
                    Username
                  </label>
                  <input
                    className={`appearance-none block w-full px-3 py-3 border ${
                      hasError("username")
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                    sm:text-sm transition-all duration-200`}
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="johndoe"
                    value={userData.username}
                    onChange={handleChange}
                  />
                  {hasError("username") && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.username[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className={`appearance-none block w-full px-3 py-3 border ${
                      hasError("email")
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                    sm:text-sm transition-all duration-200`}
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={userData.email}
                    onChange={handleChange}
                  />
                  {hasError("email") && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors duration-200">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="organization">
                    Organization / Institute
                  </label>
                  <input
                    className={`appearance-none block w-full px-3 py-3 border ${
                      hasError("organization")
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                    sm:text-sm transition-all duration-200`}
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="University of Example"
                    value={userData.organization}
                    onChange={handleChange}
                    required
                  />
                  {hasError("organization") && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.organization[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="country">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      className={`appearance-none block w-full px-3 py-3 border ${
                        hasError("country")
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                      sm:text-sm transition-all duration-200`}
                      id="country"
                      name="country"
                      value={userData.country}
                      onChange={handleChange}
                      required>
                      <option value="">Select your country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                  {hasError("country") && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.country[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="user_type">
                    User Type
                  </label>
                  <div className="relative">
                    <select
                      className={`appearance-none block w-full px-3 py-3 border ${
                        hasError("user_type")
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                      sm:text-sm transition-all duration-200`}
                      id="user_type"
                      name="user_type"
                      value={userData.user_type}
                      onChange={handleChange}
                      required>
                      <option value="">Select your user type</option>
                      {userTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                  {hasError("user_type") && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.user_type[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="research_interest">
                    Research Interest
                  </label>
                  <div className="relative">
                    <select
                      className={`appearance-none block w-full px-3 py-3 border ${
                        hasError("research_interest")
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                      sm:text-sm transition-all duration-200`}
                      id="research_interest"
                      name="research_interest"
                      value={userData.research_interest}
                      onChange={handleChange}
                      required>
                      <option value="">Select your research interest</option>
                      {researchInterests.map((interest) => (
                        <option key={interest} value={interest}>
                          {interest}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
                  </div>
                  {hasError("research_interest") && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.research_interest[0]}
                    </p>
                  )}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm transition-colors duration-200">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors duration-200">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Password and Agreements */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="password1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className={`appearance-none block w-full px-3 py-3 border ${
                        hasError("password1")
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                      sm:text-sm transition-all duration-200 pr-10`}
                      id="password1"
                      name="password1"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={userData.password1}
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
                  {hasError("password1") ? (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.password1[0]}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Password must be at least 8 characters long
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
                    htmlFor="password2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      className={`appearance-none block w-full px-3 py-3 border ${
                        hasError("password2")
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700
                      sm:text-sm transition-all duration-200 pr-10`}
                      id="password2"
                      name="password2"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={userData.password2}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {hasError("password2") && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.password2[0]}
                    </p>
                  )}
                </div>

                {/* <div className="flex justify-center mt-6">
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleCaptchaChange}
                    theme="light"
                  />
                </div>
                {hasError("captcha") && (
                  <p className="text-center text-sm text-red-600 dark:text-red-400">
                    {errors.captcha[0]}
                  </p>
                )} */}

                <div className="flex items-start bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-800">
                  <div className="flex items-center h-5">
                    <input
                      id="terms_accepted"
                      name="terms_accepted"
                      type="checkbox"
                      checked={userData.terms_accepted}
                      onChange={handleChange}
                      className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
                        hasError("terms") ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms_accepted"
                      className="font-medium text-gray-700 dark:text-gray-300">
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-green-600 hover:text-green-500 underline"
                        target="_blank"
                        rel="noopener noreferrer">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-green-600 hover:text-green-500 underline"
                        target="_blank"
                        rel="noopener noreferrer">
                        Privacy Policy
                      </a>
                    </label>
                    {hasError("terms") && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.terms[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm transition-colors duration-200">
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative flex items-center justify-center py-3 px-8 border border-transparent text-sm font-medium rounded-lg text-white ${
                      isLoading
                        ? "bg-green-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200`}>
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        Creating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {step === 1 && (
            <>
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
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                  Sign in
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
