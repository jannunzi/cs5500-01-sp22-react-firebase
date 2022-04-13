import * as tuitsService
  from "../services/tuits-service"
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../contexts/auth-context";
const TuitsList = () => {
  const textAreaRef = useRef()
  const [tuits, setTuits] = useState([])
  const {currentUser} = useAuth()
  const getAllTuits = async () => {
    const tuits = await tuitsService.getAllTuits()
    setTuits(tuits)
  }
  const getMyTuits = async () => {
    const tuits = await tuitsService.getMyTuits(currentUser.email)
    setTuits(tuits)
  }
  useEffect(() => {
    // getAllTuits()
    getMyTuits()
  }, [])

  const handleTuitBtn = async () => {
    let tuit = {
      tuit: textAreaRef.current.value,
      author: currentUser.email
    }
    try {
      const addedTuitRef = await tuitsService.addTuit(tuit)
      tuit.id = addedTuitRef.id
      setTuits([...tuits, tuit])
    } catch (e) {
      alert(e)
    }
  }

  const handleDeleteTuit = async (tuit) => {
    try{
      await tuitsService.deleteTuit(tuit.id)
      setTuits(tuits.filter(t => t.id !== tuit.id))
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      <button onClick={handleTuitBtn} className="btn btn-primary">Tuit</button>
      <textarea ref={textAreaRef} className="form-control"></textarea>
    <ul className="mt-5 list-group">
      {tuits.map(tuit =>
        <li key={tuit.id}
            className="list-group-item">

          <span onClick={() => handleDeleteTuit(tuit)}
                className="float-end">&times;</span>

          {tuit.author} {tuit.id} {tuit.tuit}
        </li>)}
    </ul>
    </div>
  )

}

export default TuitsList;