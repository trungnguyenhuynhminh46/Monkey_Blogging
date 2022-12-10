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
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Assets
import { postStatus } from "../utils/constants";
import { db } from "../firebase/firebase-config";
import { uid } from "uid";
import { useAuth } from "../contexts/auth-context";
import { getAllCategories } from "../services/categories";

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
import Error from "../component/Error";

const AddPostPage = () => {
  const { userInfo } = useAuth();
  const schema = yup
    .object({
      title: yup.string().required("Please enter post's title"),
      category: yup.object().required("Please choose a category"),
      slug: yup.string().required("Please enter post's slug"),
      image: yup.string().required("Please enter post's image"),
    })
    .required();
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      status: postStatus.PENDING,
      category: undefined,
      hot: false,
      slug: "",
      author: "",
      image: undefined,
      image_name: "",
    },
    resolver: yupResolver(schema),
  });
  const watchTitle = watch("title");
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
  ] = useImageInput(null, undefined, setValue, getValues, "images", "");

  // States
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Effect
  useEffect(() => {
    const getData = async () => {
      let catsList = await getAllCategories(1);
      setCategories(catsList);
    };
    getData();
  }, []);
  useEffect(() => {
    setValue("slug", slugify(watchTitle, { lower: true }));
  }, [watchTitle]);
  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);
  // Handlers
  const onSubmit = async (data) => {
    setIsLoading(true);
    // Variables
    const title = data.title;
    const slug = data.slug;
    const image = imageDownloadURL;
    const image_name = watchImage.name;
    const category_id = data.category?.id;
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
    // Reset loading
    setIsLoading(false);
    toast.success("Successfully add post!!!", {
      autoClose: 5000,
      pauseOnHover: false,
    });
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
              placeholder="Enter post's title"
              control={control}
            />
            {errors.title?.message && <Error>{errors.title?.message}</Error>}
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
            {errors.image?.message && <Error>{errors.image?.message}</Error>}
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
              placeholder="Enter post's slug"
              control={control}
            />
            {errors.slug?.message && <Error>{errors.slug?.message}</Error>}
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
            {errors.category?.message && <Error>{errors.slug?.message}</Error>}
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
        <Button type="submit" style={{ width: 300 }} isLoading={isLoading}>
          Add post
        </Button>
      </div>
    </form>
  );
};

export default AddPostPage;
