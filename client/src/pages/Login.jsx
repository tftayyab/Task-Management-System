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

      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-center bg-cover z-0" />

      {/* Overlay Image */}
      <div
        className="absolute z-10 hidden sm:block bg-[url('/login_image.png')] bg-cover bg-center opacity-75"
        style={{
          width: '50vw',
          height: '50vw',
          top: '40vh',
          left: '50vw',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-4 sm:px-8 justify-start pt-[20vh]">

        <h1 className="text-[#212427] font-montserrat text-3xl sm:text-4xl font-bold leading-tight text-center sm:text-left">
          Sign In
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-6 mt-6 items-center sm:items-start w-full max-w-xl">

          {/* Username */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              {/* Username Icon */}
              <svg className="w-6 h-6" viewBox="0 0 29 27" fill="none">
                <path d="M14.5 4.5c1.3 0 2.53.47 3.42 1.32C18.82 6.66 19.33 7.81 19.33 9s-.51 2.34-1.41 3.18C16.53 13.03 15.3 13.5 14.5 13.5c-.8 0-2.03-.47-2.92-1.32-.89-.84-1.42-1.99-1.42-3.18s.53-2.34 1.42-3.18C11.98 4.97 13.2 4.5 14.5 4.5ZM14.5 15.75c5.34 0 9.67 2.01 9.67 4.5v2.25H4.83V20.25c0-2.49 4.33-4.5 9.67-4.5Z" fill="#212427"/>
              </svg>
            </div>
            <input
              type="email"
              placeholder="Enter Username"
              className="w-full h-14 pl-14 pr-4 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] 
              focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-6 h-6 text-[#212427]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a5 5 0 00-5 5v4H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V12a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 5a3 3 0 116 0v4H9V6zm3 7a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0112 13z" />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full h-14 pl-14 pr-14 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999]
              focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
            />
            <div
              className="absolute inset-y-0 right-6 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>
          </div>
        </div>


        {/* Remember Me */}
        <div className="flex items-center gap-2 mt-6 px-4">
          <label htmlFor="remember" className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              className="peer w-5 h-5 appearance-none border border-[#565454] rounded-sm bg-white 
                        checked:bg-[#FF6767] transition-all duration-200 grid place-content-center"
            />
            {/* Centered Tick using grid */}
            <svg
              className="absolute w-3.5 h-3.5 right text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-[3px] top-[5px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.285 6.709a1 1 0 00-1.414-1.418l-9.192 9.192-4.243-4.243a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9.849-9.945z" />
            </svg>
            <span className="ml-2 text-[#212427] font-montserrat text-base font-medium">
              Remember me
            </span>
          </label>
        </div>

        {/* Login Button */}
        <div className="mt-6 px-4">
          <button
            className="text-white bg-[#FF9090] text-base w-full sm:w-60 h-14 font-medium rounded 
              transition-all duration-300 ease-in-out hover:bg-[#FF6F6F] hover:shadow-lg active:scale-95"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>

        {/* Create Account Link */}
        <div className="mt-4 px-4">
          <p className="text-[#212427] font-montserrat text-base font-medium leading-none text-center sm:text-left">
            Don’t have an account?{' '}
            <span
              className="text-[#008BD9] font-montserrat text-base font-medium leading-none hover:underline hover:text-[#005f99] transition-colors duration-300 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Create One
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
