import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

function Home() {
  const navigation = useNavigate()
  const token = Cookies.get("token")

  const api = axios.create({
    baseURL: 'https://api.example.com',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  api.interceptors.response.use(
    response => response, 
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        Cookies.remove('token');
          navigation("/login")
        alert('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
      }
      return Promise.reject(error); 
    }
  );

return (
  <div>Home component</div>
)
}

export default Home