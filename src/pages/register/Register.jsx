import React, { useState } from 'react'
import "./register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Register() {
    const [fullname, setFullname] = useState("") 
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("") 
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repassword,setRepassword] = useState("")
    const navigator = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const payload ={
            fullname: fullname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            repassword: repassword

        }
        try {
           const response = await axios.post('https://hashimovtabriz.com.tr/api/auth/register', payload) 
           console.log("Registration successful", response.data)
           navigator("/login")
        } catch (error) {
            console.log("Registration failed", error.response.data);          
        }
    }
    
    


  return (
    <div className='register'>
        <div className='register-in'>
        <div className="register-box">
        <h2 >Hesab yaradın</h2>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Adınız</p>
                <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required/>
            </label>
            <label>
                <p>Soyadınız</p>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
            </label>
            <label>
                <p>İstifadəçi-adı</p>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </label>
            <label>
                <p>Email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <label>
                <p>Şifrə</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <label>
                <p>Yenidən-şifrə</p>
                <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} required/>
            </label>
            <button type='submit' className='sign-up'>Hesab yarat</button>
        </form>
        </div>
        <p className="register-footer">Artıq hesabınız var? <Link  to="/login"><span>Daxil ol</span></Link></p>

        </div>
    </div>
  )
}

export default Register