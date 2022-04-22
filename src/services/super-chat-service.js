import {db} from "../firebase-app"

import {
  collection,
  addDoc, serverTimestamp, query, deleteDoc, where, doc, getDocs, orderBy
} from "firebase/firestore"

const superChatCollection
  = collection(db, 'super-chat')

export const postMessage = (message) => {
  return addDoc(superChatCollection, {
    ...message,
    createdOn : serverTimestamp()
  })
}

export const getAllMessages = async () => {
  const data = await getDocs(superChatCollection)
  return mergeId(data.docs)
  // console.log()
  // return getDocs(superChatCollection)
  //   .then(data => {
  //     const merged = mergeId(data.docs)
  //     return merged
  //   })
}

const mergeId = (docs) => {
  const messages = docs.map(doc => ({
    ...doc.data(), id: doc.id
  }))
  return messages
}

export const deleteMessage = (id) => {
  const messageDoc
    = doc(db, 'super-chat', id)
  return deleteDoc(messageDoc)
}

export const messagesQuery =
  query(superChatCollection,
    orderBy("createdOn"))