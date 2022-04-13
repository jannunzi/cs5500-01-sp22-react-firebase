import React, {useEffect, useState}
  from 'react';
import * as storageService
  from '../services/storage-service'

const Media = () => {
  const [src, setSrc] = useState('')
  const image = 'nasa.jpg'
  const getImageSrc = async () => {
    const url = await storageService
      .getImageSrc(image)
    setSrc(url)
  }
  useEffect(() => {
    getImageSrc()
  }, [])
  return (
    <img src={src} height={100}/>
  );
}
export default Media