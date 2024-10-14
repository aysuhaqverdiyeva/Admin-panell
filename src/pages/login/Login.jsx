import React, { useState } from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const navigation = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const payload = {
      username:username,
      password: password
    }

    try {
      const response = await axios.post('https://hashimovtabriz.com.tr/api/auth/login', payload);
      const { token } = response.data;
      document.cookie = `token=${token}; max-age=${13 * 60 * 60};`;
      navigation('/')
      console.log("Login successful", response.data);
    } catch (error) {
      console.error("Login failed", error.response.data)
    }
  }
  
  return (
    <div className='login'>
        <div className="login-in">
        <div className="login-box">
        <h2>Hesaba giriş</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <p>İstifadəçi-adı və ya Email</p>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </label>
              
            <label>
                <p>Şifrə</p>
                <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <button className='sign-in'>Daxil ol</button>
        </form>
        </div>
        <Link to={"/forgot-password"}><p className="login-footer">Şifrəni unutmusunuz?</p></Link>
        </div>
    </div>
  )
}

export default Login