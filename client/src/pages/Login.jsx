import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UsernameIcon, PasswordIcon, EyeIcon,EyeOffIcon } from '../components/svg'; 

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    document.title = 'Login';

    // Auto-fill from localStorage if remembered
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setFormData((prev) => ({ ...prev, username: rememberedUsername, remember: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username: formData.username,
        password: formData.password,
      }, { withCredentials: true }); // Important: allow refresh token cookie

      // ✅ Always save correct username
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email); 

      // ✅ Only remember it if checkbox is checked
      if (formData.remember) {
        localStorage.setItem('rememberedUsername', response.data.user.username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      // ✅ Save access token to localStorage
      localStorage.setItem('accessToken', response.data.accessToken);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-center bg-cover z-0" />

      {/* Overlay Image */}
      <div className="absolute z-10 hidden sm:block bg-[url('/login_image.png')] bg-cover bg-center opacity-75"
        style={{ width: '50vw', height: '50vw', top: '40vh', left: '50vw' }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full px-4 sm:px-8 justify-start pt-[20vh]">
        <h1 className="text-[#212427] font-montserrat text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Sign In
        </h1>

        <div className="flex flex-col gap-6 mt-6 items-center sm:items-start w-full max-w-xl">
          {/* Username */}
          <div className="relative w-full px-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full h-14 pl-14 pr-4 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
            />
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <UsernameIcon/>
            </div>
          </div>

          {/* Password */}
          <div className="relative w-full px-4">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <PasswordIcon/>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full h-14 pl-14 pr-14 rounded-md border border-[#565454] font-montserrat text-base font-medium placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#FF9090] hover:border-[#FF9090] transition-colors duration-300"
            />
            <div
              className="absolute inset-y-0 right-6 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                // Eye off icon
                <EyeOffIcon/>
              ) : (
                // Eye icon
                <EyeIcon/>
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
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="peer w-5 h-5 appearance-none border border-[#565454] rounded-sm bg-white checked:bg-[#FF6767] transition-all duration-200 grid place-content-center"
            />
            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 left-[3px] top-[5px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.285 6.709a1 1 0 00-1.414-1.418l-9.192 9.192-4.243-4.243a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l9.849-9.945z" />
            </svg>
            <span className="ml-2 text-[#212427] font-montserrat text-base font-medium">Remember me</span>
          </label>
        </div>

        {/* Login Button */}
        <div className="mt-6 px-4">
          <button
            onClick={handleLogin}
            className="text-white bg-[#FF9090] text-base w-full sm:w-60 h-14 font-medium rounded transition-all duration-300 ease-in-out hover:bg-[#FF6F6F] hover:shadow-lg active:scale-95"
          >
            Login
          </button>
        </div>

        {/* Create Account Link */}
        <div className="mt-4 px-4 text-center sm:text-left">
          <p className="text-[#212427] font-montserrat text-base font-medium">
            Don’t have an account?{' '}
            <span
              className="text-[#008BD9] hover:underline cursor-pointer"
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
