import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
});

const [errors, setErrors] = useState([]);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const handleRegister = async () => {
  setErrors([]); // clear previous errors

  if (!formData.termsAccepted) {
    setErrors(["You must agree to the terms."]);
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setErrors(["Passwords do not match."]);
    return;
  }

  try {
    setLoading(true);
    const response = await axios.post("http://localhost:3000/register", {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    navigate("/login");
  } catch (err) {
    if (err.response?.data?.errors) {
      setErrors(err.response.data.errors); // Joi validation errors from backend
    } else if (err.response?.data?.message) {
      setErrors([err.response.data.message]); // like "email already exists"
    } else {
      setErrors(["Something went wrong. Please try again."]);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">

      {/* Background Image Layer 1 */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-center bg-cover z-0" />

      {/* Overlay Image on Top */}
      <div
        className="absolute z-10 hidden sm:block bg-[url('/register_image.png')] bg-cover bg-center opacity-75"
        style={{
          width: '50vw',      // 20% of viewport width
          height: '90vw',     // same height for a circle
          top: '10vh',        // position from top
          right: '50vw',       // position from left
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 h-full flex justify-center sm:justify-end items-start pt-[5vh] pr-0 sm:pr-[8vw]">
        <div className="w-full sm:w-[420px] flex flex-col items-center sm:items-start">
        {/* Sign In Heading */}
        <h1 className="text-[#212427] mt-18 sm:mt-1 font-montserrat text-3xl sm:text-4xl font-bold leading-tight text-center sm:text-left ml-3">
          Sign Up
        </h1>

        {/* Input Fields */}
        <div  className="flex flex-col gap-5 mt-15 sm:gap-2.5 sm:mt-5 items-center sm:items-start w-85 sm:w-full max-w-xl">

          {/* First Name Input */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 9.375C17.4162 9.375 19.375 7.74271 19.375 5.72917C19.375 3.71563 17.4162 2.08334 15 2.08334C12.5838 2.08334 10.625 3.71563 10.625 5.72917C10.625 7.74271 12.5838 9.375 15 9.375Z" fill="black" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.5 21.3542C2.5 16.7516 7.53688 13.0208 13.75 13.0208" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.375 21.875L25.625 16.6667L23.125 14.5833L16.875 19.7917V21.875H19.375Z" fill="black" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter First Name"
              className="w-full h-14 sm:h-12 pl-12 pr-12 sm:pl-10 sm:pr-10 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

            {/* Last Name Input */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 9.75001C17.4162 9.75001 19.375 8.05242 19.375 5.95834C19.375 3.86426 17.4162 2.16667 15 2.16667C12.5838 2.16667 10.625 3.86426 10.625 5.95834C10.625 8.05242 12.5838 9.75001 15 9.75001Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.5 22.2083C2.5 17.4216 7.53688 13.5417 13.75 13.5417M19.375 22.75L25.625 17.3333L23.125 15.1667L16.875 20.5833V22.75H19.375Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="w-full h-14 sm:h-12 pl-12 pr-12 sm:pl-10 sm:pr-10 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        
          {/* Username Input */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4999 4.5C15.7818 4.5 17.0112 4.97411 17.9176 5.81802C18.824 6.66193 19.3333 7.80653 19.3333 9C19.3333 10.1935 18.824 11.3381 17.9176 12.182C17.0112 13.0259 15.7818 13.5 14.4999 13.5C13.218 13.5 11.9887 13.0259 11.0822 12.182C10.1758 11.3381 9.66659 10.1935 9.66659 9C9.66659 7.80653 10.1758 6.66193 11.0822 5.81802C11.9887 4.97411 13.218 4.5 14.4999 4.5ZM14.4999 15.75C19.8408 15.75 24.1666 17.7637 24.1666 20.25V22.5H4.83325V20.25C4.83325 17.7637 9.15909 15.75 14.4999 15.75Z" fill="#212427"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full h-14 sm:h-12 pl-12 pr-12 sm:pl-10 sm:pr-10 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6666 4.5H4.33329C3.14163 4.5 2.17746 5.5125 2.17746 6.75L2.16663 20.25C2.16663 21.4875 3.14163 22.5 4.33329 22.5H21.6666C22.8583 22.5 23.8333 21.4875 23.8333 20.25V6.75C23.8333 5.5125 22.8583 4.5 21.6666 4.5ZM21.6666 9L13 14.625L4.33329 9V6.75L13 12.375L21.6666 6.75V9Z" fill="black"/>
              </svg>
            </div>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full h-14 sm:h-12 pl-12 pr-12 sm:pl-10 sm:pr-10 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-5.5 h-5.5 text-[#212427]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1a5 5 0 00-5 5v4H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 5a3 3 0 116 0v4H9V6zm3 7a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0112 13z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full h-14 sm:h-12 pl-12 pr-12 sm:pl-10 sm:pr-10 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div
              className="absolute inset-y-0 right-6 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                // Eye off icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.176.203-2.3.575-3.325m4.045 1.575A3.978 3.978 0 0112 7c2.21 0 4 1.79 4 4a3.978 3.978 0 01-1.825 3.375M15 15l6 6" />
                </svg>
              ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.062.204-.128.406-.2.606" />
                </svg>
              )}
            </div>
          </div>

        {/* Conform Password Input */}
        <div className="relative w-full px-4">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="white" stroke="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1a5 5 0 00-5 5v4H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 5a3 3 0 116 0v4H9V6zm3 7a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0112 13z" />
          </svg>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full h-14 sm:h-12 pl-12 pr-12 sm:pl-10 sm:pr-10 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          <div
            className="absolute inset-y-0 right-6 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              // Eye off icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.176.203-2.3.575-3.325m4.045 1.575A3.978 3.978 0 0112 7c2.21 0 4 1.79 4 4a3.978 3.978 0 01-1.825 3.375M15 15l6 6" />
              </svg>
            ) : (
              // Eye icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.062.204-.128.406-.2.606" />
              </svg>
            )}
          </div>
        </div>
      </div>

        {/* I agree to all terms */}
        <div className="flex items-center gap-2 mt-6 sm:mt-3 px-4">
          <label htmlFor="terms" className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={(e) =>
                setFormData({ ...formData, termsAccepted: e.target.checked })
              }
              className="peer w-5 h-5 appearance-none border border-[#565454] rounded-sm bg-white
                        checked:bg-[#FF6767] transition-all duration-200 grid place-content-center"
            />
            {/* Centered White Tick */}
            <svg
              className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-[2.5px] top-[5.5px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.285 6.709a1 1 0 00-1.414-1.418l-9.192 9.192-4.243-4.243a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9.849-9.945z" />
            </svg>

            <span className="ml-2 text-[#212427] font-montserrat text-base font-medium">
              I agree to all terms
            </span>
          </label>
        </div>

          {errors.length > 0 && (
          <div className="px-4 text-red-600">
            <ul className="list-disc ml-4 text-sm">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}


        {/* Register Button*/}
        <div className="mt-6 sm:mt-4 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <button
            className="text-[#F8F9FB] bg-[#FF9090] text-sm sm:text-base font-medium px-6 py-3 sm:px-10 sm:py-4 rounded transition-all duration-300 ease-in-out hover:bg-[#FF6F6F] hover:shadow-lg active:scale-95"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Already Have an Account */}
          <p className="text-[#212427] font-montserrat text-base font-medium text-center sm:text-left sm:ml-12">
            <span className="whitespace-nowrap">
               Already have an account?
            </span>
            <span
              className="text-[#008BD9] font-montserrat text-base font-medium leading-none hover:underline hover:text-[#005f99] transition-colors duration-300 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </div>
          </div>
        </div>
      </div>
  );
}

export default Register;