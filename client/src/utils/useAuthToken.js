import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function useAuthToken() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      let token = localStorage.getItem('token');

      // 🔁 No token? Try refreshing
      if (!token) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
            method: "GET",
            credentials: "include",
          });

          if (!res.ok) {
            const msg = await res.text();
            console.error("❌ Refresh failed:", msg);
            throw new Error(msg);
          }

          const data = await res.json();
          token = data.accessToken;
          localStorage.setItem('token', token);
        } catch (err) {
          console.error("❌ Token invalid or refresh failed", err.message);
          localStorage.clear();
          navigate('/login');
          return;
        }
      }

      try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp * 1000;
        const now = Date.now();

        if (exp < now) {

          localStorage.removeItem("token");

          // 🛑 Don't call `checkToken()` recursively — re-run the refresh logic here
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
              method: "GET",
              credentials: "include",
            });

            if (!res.ok) {
              const msg = await res.text();
              console.error("❌ Second refresh failed:", msg);
              throw new Error(msg);
            }

            const data = await res.json();
            localStorage.setItem('token', data.accessToken);
          } catch (err) {
            console.error("❌ Refresh failed after expiry", err.message);
            localStorage.clear();
            navigate('/login');
          }
        }
      } catch (err) {
        console.error("❌ Invalid token decode", err.message);
        localStorage.clear();
        navigate('/login');
      }
    };

    checkToken();
  }, [navigate]);
}

export default useAuthToken;
