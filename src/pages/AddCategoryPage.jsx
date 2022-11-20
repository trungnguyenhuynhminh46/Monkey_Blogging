// Library
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
// Assets
import { categoryStatus } from "../utils/constants";
import { db } from "../firebase/firebase-config";

// Components
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import Input from "../component/Input";
import Heading from "../layouts/DashboardLayout/Heading";
import Radio from "../component/Radio";
import Button from "../component/Button";
import { toast } from "react-toastify";

const AddCategoryPage = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: categoryStatus.UNAPPROVED,
    },
  });

  const watchName = watch("name");
  const watchStatus = watch("status");
  // Effect
  useEffect(() => {
    setValue("slug", slugify(watchName, { lower: true }));
  }, [watchName]);
  // Handlers, Funcitons
  const onSubmit = async (data) => {
    setIsLoading(true);
    // Variables
    const name = data.name;
    const slug = data.slug;
    const status = data.status;
    // Add category
    const docRef = await addDoc(collection(db, "categories"), {
      name,
      slug,
      status,
    });
    // Reset
    reset({
      name: "",
      slug: "",
      status: categoryStatus.UNAPPROVED,
    });
    // UI
    setIsLoading(false);
    toast.success("Successfully add category!!!", {
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
              onClick={() => setValue("status", categoryStatus.APPROVED)}
              value="approved"
            >
              Approved
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={watchStatus === categoryStatus.UNAPPROVED}
              onClick={() => setValue("status", categoryStatus.UNAPPROVED)}
              value="unapproved"
            >
              Unapproved
            </Radio>
          </div>
        </InputGroup>
      </div>
      <div className="flex justify-center mt-10">
        <Button type="submit" style={{ width: 300 }} isLoading={isLoading}>
          Add category
        </Button>
      </div>
    </form>
  );
};

export default AddCategoryPage;
