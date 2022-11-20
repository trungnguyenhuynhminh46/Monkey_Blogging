import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// Assets
import { useAuth } from "../contexts/auth-context";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import ImageInput, { useImageInput } from "../component/ImageInput";
import Input from "../component/Input";
import Button from "../component/Button";
const Profile = () => {
  // States, variables
  const { userInfo } = useAuth();

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    mode: "onChange",
    defaultValue: {
      displayName: userInfo.displayName,
      email: userInfo.email,
      fullName: "",
      password: "",
      retyped_password: "",
      image: "",
      phone_num: "",
      date_of_birth: Date.now(),
    },
  });

  const watchImage = watch("image");

  const [
    currentProgress,
    imageDownloadURL,
    setCurrentProgress,
    setImageDownloadURL,
    handleUploadImage,
    handleDeleteImage,
    handleSelectImage,
  ] = useImageInput(watchImage, setValue, "avatars");
  // Effect
  useEffect(() => {
    let defaultValues = {};
    defaultValues.displayName = userInfo.displayName;
    defaultValues.email = userInfo.email;
    reset({ ...defaultValues });
  }, [userInfo]);
  // Handlers, Functions
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <form
      action="#"
      className="flex-1 mb-[40px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Profile</Heading>
      <InputGroup>
        <Label>Avatar</Label>
        <ImageInput
          name="image"
          className="w-full max-w-[50%]"
          onChange={handleSelectImage}
          onDeleteImage={handleDeleteImage}
          progress={currentProgress}
          image={imageDownloadURL}
        />
      </InputGroup>
      <div className="flex gap-10">
        <InputGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Enter your fullname"
            control={control}
          />
        </InputGroup>
        <InputGroup>
          <Label>Displayname</Label>
          <Input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Enter your displayname"
            defaultValue={userInfo.displayName}
            control={control}
          />
        </InputGroup>
      </div>
      <div className="flex gap-10">
        <InputGroup>
          <Label>Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            control={control}
          />
        </InputGroup>
        <InputGroup>
          <Label>Phone Number</Label>
          <Input
            type="number"
            name="phone_num"
            id="phone_num"
            placeholder="Enter your phone number"
            control={control}
          />
        </InputGroup>
      </div>
      <div className="flex gap-10">
        <InputGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            control={control}
          />
        </InputGroup>
        <InputGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="retyped_password"
            id="retyped_password"
            placeholder="Confirm your password"
            control={control}
          />
        </InputGroup>
      </div>
      <div className="flex justify-center mt-10">
        <Button type="submit" style={{ width: 300 }}>
          Add post
        </Button>
      </div>
    </form>
  );
};

export default Profile;
