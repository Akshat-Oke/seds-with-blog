import { useState } from "react";
import { getStorage, ref as firef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from "./Loader";
import style from "./image.module.css";
import { auth } from "../lib/firebase";

export default function ImageUploader({ }) {
  const user = auth.currentUser;
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const uploadFile = async (e) => {
    const storage = getStorage();
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split('/')[1];
    const ref = firef(storage, `uploads/${user.uid}/${Date.now()}.${extension}`);
    setUploading(true);
    const task = uploadBytesResumable(ref, file);
    task.on('state_changed', (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(pct);
    }, (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
      setUploading(false);
      console.log(error);
    }, () => {
      getDownloadURL(task.snapshot.ref).then((url) => {
        setDownloadURL(url);
        setUploading(false);
      })
    });
  }
  return (
    <div>
      <Loader show={uploading} />
      {uploading && <h3>{progress}</h3>}
      {!uploading && (
        <>
          <label className={style.button}>Upload image
            <input className={style.file} type="file" accept="image/x-png,image/gif,image/jpeg" onChange={uploadFile} />
          </label>
        </>
      )}
      <code className={style.code}>{`![alt](download-url-here-copy-this)`}</code>
      {downloadURL && <code className={style.code}>{`![alt](${downloadURL})`}</code>}
    </div>
  )
}