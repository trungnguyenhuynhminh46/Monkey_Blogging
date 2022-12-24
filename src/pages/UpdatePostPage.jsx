// Libraries
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// Assets
import { getPostByID } from "../services/posts";
import { getAllCategories, getCategoryByID } from "../services/categories";
import { useAuth } from "../contexts/auth-context";
import { postStatus } from "../utils/constants";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import slugify from "slugify";
import { db } from "../firebase/firebase-config";
import { toast } from "react-toastify";
// Components
import ImageInput, { useImageInput } from "../component/ImageInput";
import Heading from "../layouts/DashboardLayout/Heading";
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Input from "../component/Input";
import { Dropdown } from "../component/Dropdown";
import Button from "../component/Button";
import Toggle from "../component/Toggle";
import Radio from "../component/Radio";
import Error from "../component/Error";
import TextEditor from "../component/TextEditor";
import BeatLoader from "react-spinners/BeatLoader";

const UpdatePostPage = () => {
  const [params] = useSearchParams();
  const post_id = params.get("id");
  // States, variables
  const [postIsLoading, setPostIsLoading] = useState(true);
  const [post, setPost] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const { userInfo } = useAuth();
  const schema = yup
    .object({
      title: yup.string().required("Please enter post's title"),
      category: yup.object().required("Please choose a category"),
      slug: yup.string().required("Please enter post's slug"),
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
      status: "",
      category: undefined,
      hot: false,
      slug: "",
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
  ] = useImageInput(
    null,
    watchImage,
    setValue,
    getValues,
    "images",
    "",
    post_id
  );
  // Effect
  useEffect(() => {
    setPostIsLoading(true);
    setTimeout(() => {
      setPostIsLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    (async () => {
      const post = await getPostByID(post_id);
      setPost(post);
    })();
  }, [post_id]);
  useEffect(() => {
    (async () => {
      if (post) {
        const category = await getCategoryByID(post.category_id);
        setCategory(category);
      }
    })();
  }, [post]);
  useEffect(() => {
    if (post && category) {
      let defaultValues = {};
      defaultValues.title = post.title;
      defaultValues.status = post.status;
      defaultValues.category = category;
      defaultValues.hot = post.hot;
      defaultValues.slug = post.slug;
      defaultValues.image = post.image;
      defaultValues.image_name = post.image_name;
      // console.log(defaultValues);
      reset({ ...defaultValues });
      setContent(post.content || "");
    }
  }, [post, category]);
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
  useEffect(() => {
    setValue("image_name", watchImage?.name || "");
  }, [watchImage]);
  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);
  // Handlers, functions
  const onSubmit = async (data) => {
    setIsLoading(true);
    // Variables
    const title = data?.title;
    const slug = data?.slug;
    const image = imageDownloadURL || "";
    const image_name = data?.image_name;
    const category_id = data?.category?.id;
    const status = data?.status;
    const hot = data?.hot;
    const updated_at = serverTimestamp();
    const update_user_id = userInfo.uid;
    const post_uid = post_id;
    // Update Doc
    await updateDoc(doc(db, "posts", post_id), {
      category_id,
      updated_at,
      update_user_id,
      hot,
      image,
      image_name,
      post_uid,
      slug,
      status,
      title,
      content,
    });
    // Reset loading
    setIsLoading(false);
    toast.success("Successfully update post!!!", {
      autoClose: 5000,
      pauseOnHover: false,
    });
  };

  return (
    <>
      {postIsLoading ? (
        <div className="w-full h-[540px] flex justify-center items-center">
          <BeatLoader color="#36d7b7" loading={postIsLoading} size={14} />
        </div>
      ) : (
        <form
          action="#"
          className="flex-1 mb-[40px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {post ? (
            <>
              <Heading>Update post with id: {post_id}</Heading>
              <div className="flex flex-col sm:flex-row sm:gap-10">
                <InputGroup>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter post's title"
                    control={control}
                  />
                  {errors.title?.message && (
                    <Error>{errors.title?.message}</Error>
                  )}
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    type="text"
                    name="slug"
                    id="slug"
                    placeholder="Enter post's slug"
                    control={control}
                  />
                  {errors.slug?.message && (
                    <Error>{errors.slug?.message}</Error>
                  )}
                </InputGroup>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-10">
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
                  {errors.category?.message && (
                    <Error>{errors.slug?.message}</Error>
                  )}
                </InputGroup>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-10">
                <InputGroup>
                  <Label>Is Feature Post</Label>
                  <Toggle
                    on={watchHot === true}
                    onClick={() => {
                      setValue("hot", !watchHot);
                    }}
                  ></Toggle>
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
              <div className="flex flex-col sm:flex-row sm:gap-10">
                <InputGroup>
                  <Label>Content</Label>
                  <TextEditor
                    content={content}
                    setContent={setContent}
                  ></TextEditor>
                </InputGroup>
              </div>
              <div className="flex justify-center mt-10">
                <Button
                  type="submit"
                  style={{ width: 300 }}
                  isLoading={isLoading}
                >
                  Update post
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Heading>
                Sorry but the post with ID {post_id} does not exist
              </Heading>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default UpdatePostPage;
