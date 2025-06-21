import axios from 'axios';

const refreshToken = async () => {
  try {
    const res = await axios.get('http://localhost:3000/auth/refresh-token', {
      withCredentials: true,
    });
    localStorage.setItem('accessToken', res.data.accessToken);
    return res.data.accessToken;
  } catch (err) {
    console.error("Refresh token failed:", err);
    return null;
  }
};

export default refreshToken;
