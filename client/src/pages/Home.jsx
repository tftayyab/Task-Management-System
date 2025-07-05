import '../App.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper'

function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="relative w-full h-screen bg-gray-100 overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-center bg-cover z-0" />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-0">

          {/* Logo */}
          <img
            src="/icon.png"
            alt="Logo"
            className="w-24 h-24 sm:w-40 sm:h-40 mb-8 transition-transform duration-500 hover:rotate-6"
          />

          {/* Heading */}
          <h1 className="text-[#FF6767] text-4xl sm:text-7xl font-semibold text-center mb-4">
            Task <span className="text-black">Manager</span>
          </h1>

          {/* Subtitle */}
          <p className="text-black text-base sm:text-lg text-center font-medium mb-10">
            Organize your tasks. Boost your productivity.
          </p>

          {/* Buttons */}
          <div className="flex gap-6">
            <button
              className="homeBtn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="homeBtn"
              onClick={() => navigate('/register')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;
