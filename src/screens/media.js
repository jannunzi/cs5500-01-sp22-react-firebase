import React, {useEffect, useRef, useState}
  from 'react';
import * as storageService
  from '../services/storage-service'
import Preformatted from "../components/preformatted";

const Media = () => {
  const [src, setSrc] = useState('')
  const [srcs, setSrcs] = useState([])
  const getAllImages = async () => {
    const urls = await storageService.listAllImages()
    setSrcs(urls)
  }
  const image = 'tesla.png'
  const getImageSrc = async () => {
    const url = await storageService
      .getImageSrc(image)
    setSrc(url)
  }
  useEffect(() => {
    getImageSrc()
    getAllImages()
  }, [])
  const filesRef = useRef()
  const handleUpload = () => {
    Object
      .entries(filesRef.current.files)
      .forEach(([key, file]) => {
        storageService.uploadImage(file)
      })
  }

  const handleDelete = async (src) => {
    await storageService.deleteImage(src)
  }
  return (
    <div>
      <button
        onClick={handleUpload}
        className="float-end btn btn-primary">
        Upload
      </button>
      <input
        multiple
        ref={filesRef}
        type="file"
        className="form-control w-75"/>
        <hr/>
      <img src={src} height={100}/>
      <ul className="list-group">
        {
          srcs.map(src =>
            <li className="list-group-item">

              <button
                onClick={() => handleDelete(src)}
                className="float-end btn btn-danger">
                &times;
              </button>

              <img src={src} height={100}/>
            </li>
          )
        }
      </ul>
      <Preformatted data={srcs}/>
    </div>
  );
}
export default Media