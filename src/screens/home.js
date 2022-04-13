import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/auth-context";
import TuitsList from "./tuits-list";
import Media from "./media";
// import TuitsList from "../components/tuits-list";

const Home = () => {
  const {currentUser, signout} = useAuth()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const handleSignout = async () => {
    try {
      await signout()
      navigate("/")
    } catch (e) {
      setError(e.message)
    }
  }
  return (
    <div>
      <h1>Home</h1>
      {error && <h2>{error}</h2>}
      Welcome {currentUser.email}
      <br/>
      <Link to="/profile">Profile</Link>
      <br/>
      <button onClick={handleSignout}>
        Signout
      </button>

      <Media/>

      <TuitsList/>

      <pre>
      {JSON.stringify(currentUser, null, 2)}
      </pre>
    </div>
  );
}

export default Home;