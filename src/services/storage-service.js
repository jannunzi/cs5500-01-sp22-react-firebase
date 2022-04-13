import {getStorage, ref, getDownloadURL}
  from "firebase/storage"

const storage = getStorage()
const storageRef = ref(storage)

export const getImageSrc = (image) => {
  const imageRef = ref(storage, image)
  return getDownloadURL(imageRef)
}