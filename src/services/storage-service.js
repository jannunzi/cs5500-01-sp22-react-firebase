import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  uploadBytes,
  deleteObject
} from "firebase/storage"

const storage = getStorage()
const storageRef = ref(storage)

export const getImageSrc = (image) => {
  const imageRef = ref(storage, image)
  return getDownloadURL(imageRef)
}

export const listAllImages = async () => {
  const rootRef = ref(storage)
  return listAll(rootRef)
    .then((res) => {
      const urlPromises = res.items
        .map((itemRef) => {
          return getDownloadURL(itemRef)
        });
      return Promise.all(urlPromises)
    })
}

export const uploadImage = (file) => {
  const imageRef = ref(storage, file.name)
  return uploadBytes(imageRef, file)
}

export const deleteImage = (src) => {
  const imageRef = ref(storage, src)
  return deleteObject(imageRef)
}