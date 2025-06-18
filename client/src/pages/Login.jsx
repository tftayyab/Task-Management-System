import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">

      {/* Background Image Layer 1 */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-center bg-cover z-0" />

      {/* Overlay Image on Top */}
      <div
        className="absolute z-10 hidden sm:block bg-[url('/login_image.png')] bg-cover bg-center opacity-75"
        style={{
          width: '50vw',      // 20% of viewport width
          height: '50vw',     // same height for a circle
          top: '40vh',        // position from top
          left: '50vw',       // position from left
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-4 sm:px-8 justify-start pt-[20vh]">

        {/* Sign In Heading */}
        <h1 className="text-[#212427] font-montserrat text-3xl sm:text-4xl font-bold leading-tight text-center sm:text-left">
          Sign In
        </h1>

        {/* Input Fields */}
        <div className="flex flex-col gap-6 mt-6 items-center sm:items-start w-full max-w-xl">

          {/* Username Input */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4999 4.5C15.7818 4.5 17.0112 4.97411 17.9176 5.81802C18.824 6.66193 19.3333 7.80653 19.3333 9C19.3333 10.1935 18.824 11.3381 17.9176 12.182C17.0112 13.0259 15.7818 13.5 14.4999 13.5C13.218 13.5 11.9887 13.0259 11.0822 12.182C10.1758 11.3381 9.66659 10.1935 9.66659 9C9.66659 7.80653 10.1758 6.66193 11.0822 5.81802C11.9887 4.97411 13.218 4.5 14.4999 4.5ZM14.4999 15.75C19.8408 15.75 24.1666 17.7637 24.1666 20.25V22.5H4.83325V20.25C4.83325 17.7637 9.15909 15.75 14.4999 15.75Z" fill="#212427"/>
              </svg>
            </div>
            <input
              type="email"
              placeholder="Enter Username"
              className="w-full h-14 pl-14 pr-4 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999]"
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6 text-[#212427]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1a5 5 0 00-5 5v4H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 5a3 3 0 116 0v4H9V6zm3 7a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0112 13z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full h-14 pl-14 pr-14 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999]"
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


        {/* Remember Me */}
        <div className="flex items-center gap-2 mt-6 px-4">
          <input
            type="checkbox"
            name="Remember-me"
            id="remember"
            className="w-5 h-5 border border-[#565454] appearance-none checked:bg-[#212427]"
          />
          <label
            htmlFor="remember"
            className="text-[#212427] font-montserrat text-base font-medium"
          >
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <div className="mt-6 px-4">
          <button
            className="text-white bg-[#FF9090] text-base w-full sm:w-60 h-14 font-medium rounded"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>

        {/* Create Account Link */}
        <div className="mt-4 px-4">
          <p className="text-[#212427] font-montserrat text-base font-medium leading-none">
            Don’t have an account?{' '}
            <span className="text-[#008BD9] font-montserrat text-base font-medium leading-none">
              Create One
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;