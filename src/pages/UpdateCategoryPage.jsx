// Libraries
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import slugify from "slugify";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
// Assets
import { getCategoryByID } from "../services/categories";
import { categoryStatus } from "../utils/constants";
import { db } from "../firebase/firebase-config";
// Components
import Input from "../component/Input";
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Heading from "../layouts/DashboardLayout/Heading";
import Radio from "../component/Radio";
import Button from "../component/Button";
import Error from "../component/Error";
import BeatLoader from "react-spinners/BeatLoader";

const UpdateCategoryPage = () => {
  const [params] = useSearchParams();
  const cat_id = params.get("id");
  // States
  const [categoryIsLoading, setCategoryIsLoading] = useState(true);
  const [category, setCategory] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup
    .object({
      name: yup.string().required("Please enter category's name"),
      slug: yup.string().required("Please enter category's slug"),
    })
    .required();
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: categoryStatus.UNAPPROVED,
    },
    resolver: yupResolver(schema),
  });

  const watchName = watch("name");
  const watchStatus = watch("status");
  // Effect
  useEffect(() => {
    setCategoryIsLoading(true);
    setTimeout(() => {
      setCategoryIsLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    (async () => {
      const cat = await getCategoryByID(cat_id);
      setCategory(cat);
    })();
  }, [cat_id]);
  useEffect(() => {
    if (category) {
      let defaultValues = {};
      defaultValues.name = category.name;
      defaultValues.slug = category.slug;
      defaultValues.status = category.status;
      // console.log(defaultValues);
      reset({ ...defaultValues });
    }
  }, [category]);
  useEffect(() => {
    if (watchName) {
      setValue("slug", slugify(watchName, { lower: true }));
    }
  }, [watchName]);
  // Handlers, functions
  const onSubmit = async (data) => {
    setIsLoading(true);
    // Variables
    const name = data.name;
    const slug = data.slug;
    const status = data.status;
    console.log({ name, slug, status });
    // Update doc
    await updateDoc(doc(db, "categories", cat_id), {
      name,
      slug,
      status,
    });
    setIsLoading(false);
    setIsLoading(false);
    toast.success("Successfully update category!!!", {
      autoClose: 5000,
      pauseOnHover: false,
    });
  };
  return (
    <>
      {categoryIsLoading ? (
        <div className="w-full h-[540px] flex justify-center items-center">
          <BeatLoader color="#36d7b7" loading={categoryIsLoading} size={14} />
        </div>
      ) : (
        <form
          action="#"
          className="flex-1 mb-[40px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {category ? (
            <>
              <Heading>Add new category</Heading>
              <div className="flex gap-10">
                <InputGroup>
                  <Label htmlFor="name">Category's name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter category's name"
                    control={control}
                  />
                  {errors.name?.message && (
                    <Error>{errors.name?.message}</Error>
                  )}
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="slug">Category's slug</Label>
                  <Input
                    type="text"
                    name="slug"
                    id="slug"
                    placeholder="Enter category's slug"
                    control={control}
                  />
                  {errors.slug?.message && (
                    <Error>{errors.slug?.message}</Error>
                  )}
                </InputGroup>
              </div>
              <div className="flex gap-10">
                <InputGroup>
                  <Label>Status</Label>
                  <div className="flex items-center gap-x-5">
                    <Radio
                      name="status"
                      control={control}
                      checked={watchStatus === categoryStatus.APPROVED}
                      onClick={() =>
                        setValue("status", categoryStatus.APPROVED)
                      }
                      value="approved"
                    >
                      Approved
                    </Radio>
                    <Radio
                      name="status"
                      control={control}
                      checked={watchStatus === categoryStatus.UNAPPROVED}
                      onClick={() =>
                        setValue("status", categoryStatus.UNAPPROVED)
                      }
                      value="unapproved"
                    >
                      Unapproved
                    </Radio>
                  </div>
                </InputGroup>
              </div>
              <div className="flex justify-center mt-10">
                <Button
                  type="submit"
                  style={{ width: 300 }}
                  isLoading={isLoading}
                >
                  Update category
                </Button>
              </div>
            </>
          ) : (
            <Heading>
              Sorry but the category with ID {cat_id} does not exist
            </Heading>
          )}
        </form>
      )}
    </>
  );
};

export default UpdateCategoryPage;
