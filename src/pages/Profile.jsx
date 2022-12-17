import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import format from "date-fns/format";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { db, auth } from "../firebase/firebase-config";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Assets
import { useAuth } from "../contexts/auth-context";
// Components
import Heading from "../layouts/DashboardLayout/Heading";
import InputGroup from "../component/InputGroup";
import Label from "../component/Label";
import ImageInput, { useImageInput } from "../component/ImageInput";
import Input from "../component/Input";
import DatetimePicker from "../component/DateTimePicker";
import Button from "../component/Button";
import Error from "../component/Error";
const Profile = () => {
  // States, variables
  const { userInfo } = useAuth();
  const [user, setUser] = useState(undefined);
  const [date, setDate] = useState(new Date());

  const schema = yup
    .object({
      displayName: yup.string().required("Please enter your display name"),
      email: yup
        .string()
        .required("Please enter your email")
        .email("The email you enter in a wrong format!"),
      password: yup
        .string()
        .test(
          "len",
          "Password must have at least 9 characters",
          (val) => !val || val.length >= 9
        ),
      retyped_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValue: {
      displayName: userInfo.displayName,
      email: userInfo.email,
      fullName: user?.fullName || "",
      password: "",
      retyped_password: "",
      image: undefined,
      phone_num: user?.phone_num || "",
      dob: user?.dob || format(new Date(), "dd/MM/yyyy"),
    },
    resolver: yupResolver(schema),
  });

  const watchImage = watch("image");

  var [
    currentProgress,
    imageDownloadURL,
    setCurrentProgress,
    setImageDownloadURL,
    handleUploadImage,
    handleDeleteImage,
    handleSelectImage,
  ] = useImageInput(
    user?.uid,
    watchImage,
    setValue,
    getValues,
    "avatars",
    userInfo.displayName
  );
  // Effect
  // Get user
  useEffect(() => {
    const getUser = async () => {
      if (auth.currentUser) {
        const docSnap = await getDoc(doc(db, "users", auth.currentUser?.uid));
        // console.log({ uid: docSnap.id, ...docSnap.data() });
        setUser({ uid: docSnap.id, ...docSnap.data() });
      }
    };
    getUser();
  }, [auth?.currentUser]);
  useEffect(() => {
    if (user) {
      let defaultValues = {};
      defaultValues.displayName = user?.displayName;
      defaultValues.fullName = user?.fullName || "";
      defaultValues.email = user?.email;
      defaultValues.phone_num = user?.phone_num || "";
      defaultValues.dob = user?.dob || format(new Date(), "dd/MM/yyyy");
      defaultValues.image = user?.image || "";
      reset({ ...defaultValues });
    }
  }, [user]);
  useEffect(() => {
    if (!!user?.dob) {
      let date = new Date(user.dob.seconds * 1000);
      setDate(date);
    }
  }, [user?.dob]);
  // Handlers, Functions
  const onSubmit = async (data) => {
    // Variables
    const displayName = data.displayName;
    const fullName = data.fullName;
    const email = data.email;
    const image = imageDownloadURL || user.image;
    const password = data.password;
    const retyped_password = data.retyped_password;
    const phone_num = data.phone_num.toString();
    let [day, month, year] = data.dob.split("/");
    let date = new Date(year, month - 1, day);
    const dob = Timestamp.fromDate(date);
    try {
      const user = auth.currentUser;
      if (!!image) {
        updateProfile(user, {
          photoURL: image,
        });
      }
      if (!!displayName) {
        updateProfile(user, {
          displayName,
        });
      }
      if (!!password && password === retyped_password) {
        updatePassword(user, password)
          .then(() => {
            updateDoc(doc(db, "users", auth.currentUser?.uid), {
              password,
            });
          })
          .catch((err) => {
            alert(err);
          });
      }
      if (!!email) {
        updateEmail(user, email)
          .then(() => {
            updateDoc(doc(db, "users", auth.currentUser?.uid), {
              email,
            });
          })
          .catch((err) => {
            alert(err);
          });
      }

      // Profile updated
    } catch (error) {
      // An error occured
    }
    // Update Document
    try {
      await updateDoc(doc(db, "users", user?.uid), {
        displayName,
        fullName,
        email,
        image: image || "",
        phone_num,
        dob,
      });
      // Document updated
    } catch (error) {
      // An error occured
      alert(error);
    }
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
        <div className="w-full flex justify-center">
          <ImageInput
            name="image"
            className="h-[200px] w-[200px] rounded-[50%]"
            onChange={handleSelectImage}
            onDeleteImage={handleDeleteImage}
            progress={currentProgress}
            image={imageDownloadURL}
          />
        </div>
      </InputGroup>
      <div className="flex gap-10">
        <InputGroup>
          <Label>Full Name</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter your fullName"
            defaultValue={user?.fullName}
            control={control}
          />
          {errors.fullName?.message && (
            <Error>{errors.fullName?.message}</Error>
          )}
        </InputGroup>
        <InputGroup>
          <Label>Displayname</Label>
          <Input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Enter your displayname"
            defaultValue={user?.displayName}
            control={control}
          />
          {errors.displayName?.message && (
            <Error>{errors.displayName?.message}</Error>
          )}
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
            defaultValue={user?.email}
            control={control}
          />
          {errors.email?.message && <Error>{errors.email?.message}</Error>}
        </InputGroup>
        <InputGroup>
          <Label>Phone Number</Label>
          <Input
            type="number"
            name="phone_num"
            id="phone_num"
            placeholder="Enter your phone number"
            defaultValue={user?.phone_num?.toString()}
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
          {errors.password?.message && (
            <Error>{errors.password?.message}</Error>
          )}
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
          {errors.retyped_password?.message && (
            <Error>{errors.retyped_password?.message}</Error>
          )}
        </InputGroup>
      </div>
      <div className="flex gap-10">
        <div className="w-1/2 pr-5">
          <InputGroup>
            <Label>Date of birth</Label>
            <DatetimePicker
              name="dob"
              id="dob"
              defaultDate={date}
              onChange={(date) => {
                setValue("dob", date);
              }}
            />
          </InputGroup>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button type="submit" style={{ width: 300 }}>
          Update Profile
        </Button>
      </div>
    </form>
  );
};

export default Profile;
