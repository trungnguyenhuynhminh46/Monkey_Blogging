import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import slugify from "slugify";

// Assets
import { postStatus } from "../utils/constants";
import { db } from "../firebase/firebase-config";
import { uid } from "uid";
import { useAuth } from "../contexts/auth-context";

// Components
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Heading from "../layouts/DashboardLayout/Heading";
import Input from "../component/Input";
import Radio from "../component/Radio";
import { Dropdown } from "../component/Dropdown";
import Button from "../component/Button";
import ImageInput, { useImageInput } from "../component/ImageInput";
import Toggle from "../component/Toggle";

const AddPostPage = () => {
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      status: 2,
      category: undefined,
      hot: false,
      slug: "",
      author: "",
      image: undefined,
    },
  });
  const watchTitle = watch("title");
  const watchSlug = watch("slug");
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  const watchImage = watch("image");
  const watchHot = watch("hot");

  const [
    currentProgress,
    imageDownloadURL,
    setCurrentProgress,
    setImageDownloadURL,
    handleUploadImage,
    handleDeleteImage,
    handleSelectImage,
  ] = useImageInput(watchImage, setValue);

  // States
  const [categories, setCategories] = useState([]);
  // Effect
  useEffect(() => {
    const getData = async () => {
      let catList = [];
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", "1"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        catList.push({ id: doc.id, ...doc.data() });
      });
      // console.log(catList);
      setCategories(catList);
    };
    getData();
  }, []);
  useEffect(() => {
    setValue("slug", slugify(watchTitle));
  }, [watchTitle]);
  // Handlers
  const onSubmit = async (data) => {
    // Variables
    const title = data.title;
    const slug = data.slug;
    const image = imageDownloadURL;
    const image_name = watchImage.name;
    const category_id = data.category.id;
    const status = data.status;
    const hot = data.hot;
    const createdAt = serverTimestamp();
    const user_id = userInfo.uid;
    const post_uid = uid();
    // Set Doc
    await setDoc(doc(db, "posts", post_uid), {
      title,
      slug,
      image,
      image_name,
      category_id,
      status,
      hot,
      createdAt,
      user_id,
      post_uid,
    });
    // Reset Values
    reset({
      title: "",
      status: 2,
      category: undefined,
      hot: false,
      slug: "",
      author: "",
      image: undefined,
    });
    // Reset UI
    setImageDownloadURL("");
    setCurrentProgress(0);
    setCategories([]);
  };
  return (
    <form
      action="#"
      className="flex-1 mb-[40px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Add new post</Heading>
      <div className="flex gap-10">
        <div className="flex-1 flex flex-col gap-y-10">
          <InputGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter your title"
              control={control}
            />
          </InputGroup>
          <InputGroup>
            <Label>Image</Label>
            <ImageInput
              name="image"
              onChange={handleSelectImage}
              onDeleteImage={handleDeleteImage}
              progress={currentProgress}
              image={imageDownloadURL}
            />
          </InputGroup>
          <InputGroup>
            <Label>Is Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            ></Toggle>
          </InputGroup>
        </div>
        <div className="flex-1 flex flex-col gap-y-10">
          <InputGroup>
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              name="slug"
              id="slug"
              placeholder="Enter your slug"
              control={control}
            />
          </InputGroup>
          <InputGroup minHeight={"270px"}>
            <Label>Category</Label>
            <Dropdown>
              {categories &&
                categories.map((category) => {
                  return (
                    <Dropdown.Option
                      key={category.id}
                      onClick={() => {
                        setValue("category", category);
                      }}
                    >
                      {category.name}
                    </Dropdown.Option>
                  );
                })}
            </Dropdown>
            {watchCategory?.slug && (
              <div className="mt-6 w-max rounded px-2 py-3 bg-green-50 text-green-600">
                {watchCategory?.slug}
              </div>
            )}
          </InputGroup>
          <InputGroup>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.APPROVED}
                onClick={() => setValue("status", postStatus.APPROVED)}
                value="approved"
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.PENDING}
                onClick={() => setValue("status", postStatus.PENDING)}
                value="pending"
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === postStatus.REJECTED}
                onClick={() => setValue("status", postStatus.REJECTED)}
                value="reject"
              >
                Reject
              </Radio>
            </div>
          </InputGroup>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button type="submit" style={{ width: 300 }}>
          Add post
        </Button>
      </div>
    </form>
  );
};

export default AddPostPage;
