import {db} from "../firebase-app"
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,

} from "firebase/firestore"

const tuitsCollection = collection(db, 'tuits')

export const addTuit = (tuit) => {
  return addDoc(tuitsCollection, tuit)
}
export const getAllTuits = async () => {
  const data = await getDocs(tuitsCollection)
  return docsToTuits(data.docs)
}
const docsToTuits = (docs) =>
  docs.map(doc => ({ ...doc.data(), id: doc.id }))

export const getMyTuits = async (email) => {
  const q = query(tuitsCollection,
    where("author", "==", email));
  const data = await getDocs(q)
  return docsToTuits(data.docs)
}

export const updateTuit = (id, updatedTuit) => {
  const tuitDoc = doc(db, 'tuits', id)
  return updateDoc(tuitDoc, updatedTuit)
}

export const deleteTuit = (id) => {
  const tuitDoc = doc(db, 'tuits', id)
  return deleteDoc(tuitDoc)
}
