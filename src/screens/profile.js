import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";

const Profile = () => {
  const [error, setError] = useState()
  const {currentUser, signout} = useAuth()
  const navigate = useNavigate()

  const handleSignout = () => {
    try {
      signout()
      navigate("/")
    } catch(e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <h1>Profile</h1>
      { error &&
      <div className="alert-danger mb-2 p-2">
        {error}
      </div>
      }

      <button onClick={handleSignout}>
        Signout</button>
      <Link to="/admin">Admin</Link>
      <pre>
       {JSON.stringify(currentUser, null, 2)}
      </pre>

    </div>
  );
}

export default Profile;