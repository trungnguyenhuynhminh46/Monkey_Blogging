import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { Fragment, useState, useEffect } from "react";
import { storage } from "../firebase/firebase-config";

const useImageInput = (
  user_uid,
  defaultImage,
  setValue,
  getValues,
  root = "images",
  name = "",
  post_id
) => {
  // States
  const [currentProgress, setCurrentProgress] = useState(0);
  const [imageDownloadURL, setImageDownloadURL] = useState(defaultImage);
  // Effects
  useEffect(() => {
    setImageDownloadURL(defaultImage);
  }, [defaultImage]);
  // Handlers
  const handleUploadImage = (file) => {
    const img_dir = name ? `${root}/${name}` : `${root}/${file.name}`;
    const storageRef = ref(storage, img_dir);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setCurrentProgress(progress);
      },
      (error) => {
        setImageDownloadURL("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageDownloadURL(downloadURL);
        });
      }
    );
  };
  const handleDeleteImage = async () => {
    try {
      if (!!getValues("image_name") || !!name) {
        const img_dir = name
          ? `${root}/${name}`
          : `${root}/${getValues("image_name")}`;
        // Create a reference to the file to delete
        const imageRef = ref(storage, img_dir);

        // Delete the file
        await deleteObject(imageRef);
      }
    } catch (error) {
    } finally {
      setValue("image", "");
      if (user_uid) {
        await updateDoc(doc(db, "users", user_uid), {
          image: "",
        });
      }
      if (!!post_id) {
        await updateDoc(doc(db, "posts", post_id), {
          image: "",
          image_name: "",
        });
      }
      setImageDownloadURL("");
      setCurrentProgress(0);
    }
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    handleUploadImage(file);
    e.target.value = "";
  };

  return [
    currentProgress,
    imageDownloadURL,
    setCurrentProgress,
    setImageDownloadURL,
    handleUploadImage,
    handleDeleteImage,
    handleSelectImage,
  ];
};

const ImageInput = ({
  name,
  control,
  className = "",
  progress = 0,
  image = "",
  onDeleteImage = () => {},
  ...props
}) => {
  return (
    <label
      className={`flex justify-center items-center cursor-pointer w-full min-h-[200px] rounded-lg border border-dashed bg-gray-100 ${className} relative overflow-hidden group`}
    >
      <input type="file" name={name} className="hidden-input" {...props} />
      {/* Display */}
      {progress !== 0 && !image && (
        <div className="absolute z-10 w-16 h-16 rounded-full border-8 border-solid border-green-500 border-t-transparent animate-spin"></div>
      )}

      {progress === 0 && !image && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img src="/img-upload.png" alt="" className="max-w-[80px] mb-5" />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {!image && (
        <div
          className={`absolute left-0 bottom-0 h-1 bg-green-500`}
          style={{ width: `${Math.ceil(progress)}%` }}
        ></div>
      )}
      {image && (
        <Fragment>
          <img src={image} className="object-cover w-full h-full" alt="" />
          <button
            type="button"
            className="absolute left-0 top-0 w-full h-full flex justify-center items-center"
            onClick={onDeleteImage}
          >
            <div className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </button>
        </Fragment>
      )}
    </label>
  );
};

export default ImageInput;
export { useImageInput };
