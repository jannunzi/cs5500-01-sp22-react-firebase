import React, {useRef, useState} from "react";
import {useAuth} from "../contexts/auth-context";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const {signup} = useAuth()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    if (passwordRef.current.value !==
      passwordConfirmRef.current.value) {
      return setError("Passwords don't match")
    }
    try {
      setError("")
      await signup(emailRef.current.value,
        passwordRef.current.value)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h1>Signup</h1>

      {
        error &&
        <div className="alert-danger mt-2 p-2">
          {error}
        </div>
      }

      <input placeholder="email"
             type="email" ref={emailRef}/>
      <input placeholder="password"
             type="password" ref={passwordRef}/>
      <input placeholder="confirm password"
             type="password" ref={passwordConfirmRef}/>
      <button onClick={handleSignup}>Sign Up</button>
      <Link to="/">Login</Link>

    </div>
  );
}

export default Signup;