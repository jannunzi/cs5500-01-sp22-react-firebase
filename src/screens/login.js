import React, {useRef, useState} from 'react';
import {useAuth} from "../contexts/auth-context";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async () => {
    try {
      setError("")
      await login(emailRef.current.value,
        passwordRef.current.value)
      navigate("/home")
    } catch(error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {
        error &&
        <div className="alert-danger p-2 mb-2">
          {error}
        </div>
      }

      <input type="email" ref={emailRef}/>
      <input type="password" ref={passwordRef}/>
      <button onClick={handleLogin}>
        Login</button>
      <Link to="/signup">Sign Up</Link>

    </div>
  );
}

export default Login;