import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./forgot.css";

function Forgot() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://hashimovtabriz.com.tr/api/Auth/resetPasswordSendOtp?email=${encodeURIComponent(email)}`);
        setIsEmailSent(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data.errors?.email || 'Failed to send OTP.');
    }
  }

  const otpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://hashimovtabriz.com.tr/api/Auth/verifyOtp?email=${encodeURIComponent(email)}&otpCode=${encodeURIComponent(otp)}`);
        setIsOtpVerified(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data.errors?.otpCode || 'Invalid OTP.');
    }
  }

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(`https://hashimovtabriz.com.tr/api/Auth/resetPasswordWithOtp?email=${encodeURIComponent(email)}&otpCode=${encodeURIComponent(otp)}`, {
        password,
        repassword
      });
    alert('Password reset successful.');
    navigate("/login");
  } catch (error) {
    setErrorMessage(error.response?.data.errors?.otpCode || 'Failed to reset password.');
  }
}

return (
  <div>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    {!isEmailSent && (
      <div className='forgot'>
        <div className="forgot-in">
          <div className="forgot-box">
            <h2>Şifrəni bərpa et</h2>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Email</p>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <button className='forgot-btn'>Göndər</button>
            </form>
          </div>
        </div>
      </div>
    )}

    {isEmailSent && !isOtpVerified && (
      <div className="otp">
        <div className="otp-in">
          <div className="otp-box">
            <h2>Birdəfəlik parol</h2>
            <form onSubmit={otpSubmit}>
              <label>
                <input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </label>
              <button className='otp-btn'>Göndər</button>
            </form>
          </div>
        </div>
      </div>
    )}

    {isOtpVerified && (
      <div className='resetpass'>
        <div className="resetpass-in">
          <div className="resetpass-box">
            <h2>Şifrəni Yenilə</h2>
            <form onSubmit={resetPasswordSubmit}>
              <label>
                <p>Şifrə</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label>
                <p>Yenidən-Şifrə</p>
                <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} required />
              </label>
              <button className='reset-pass'>Yenilə</button>
            </form>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default Forgot;