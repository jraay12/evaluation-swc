import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postUpdateUserInformation } from "../../redux/slices/User/userUpdateInformationSlice";
import { UpdateInformationResetStatus } from "../../redux/slices/User/userUpdateInformationSlice";
import { postChangePassword } from "../../redux/slices/User/userChangePasswordSlice";
import { ChangePasswordResetStatus } from "../../redux/slices/User/userChangePasswordSlice";
import { postUpdateUserEmail } from "../../redux/slices/User/userUpdateEmailSlice";
import { UpdateEmailResetStatus } from "../../redux/slices/User/userUpdateEmailSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import JwtDecoder from "../../utils/JwtDecoder"
import LoadingAnimation from "../Animations/LoadingAnimation"

const SettingsInputs = () => {
  const dispatch = useDispatch();
  const userData = JwtDecoder()?.decodedToken;

  const {status: userUpdateInformationStatus} = useSelector((state) => state.updateUserInformation)
  const {status: ChangePasswordStatus} = useSelector((state) => state.changePassword)
  const {status: UpdateEmailStatus} = useSelector((state) => state.updateEmail)
  
  const {
    control,
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    reset: resetProfile,
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
    reset: resetEmail,
  } = useForm();

  const handleUpdateProfile = (data) => {
    dispatch(postUpdateUserInformation({id: userData?.id, value: data}))
  };

  const handleChangePassword = (values) => {
    dispatch(postChangePassword({value: values, id: userData?.id}))
  };

  const handleUpdateEmail = (email) => {
    dispatch(postUpdateUserEmail({email: email, id: userData?.id}))
  };

useEffect(() => {
  if (userUpdateInformationStatus === "success"){
    resetProfile()
    dispatch(UpdateInformationResetStatus())
  }

  if (ChangePasswordStatus === "success"){
    resetPassword()
    dispatch(ChangePasswordResetStatus())
  }

  if(UpdateEmailStatus === "success"){
    resetEmail()
    dispatch(UpdateEmailResetStatus())
  }
}, [userUpdateInformationStatus, ChangePasswordResetStatus, UpdateEmailStatus])

  
  return (
    <div className="flex flex-col lg:max-w-[1000px] min-h-[500px] max-h-[500px] flex-1 border-2 w-full bg-white p-10 gap-10 overflow-auto ">
      <form
        className="flex flex-col gap-4 border-[1px] border-black p-4 rounded-lg"
        onSubmit={handleSubmitProfile(handleUpdateProfile)}
      >
        <h1 className="uppercase font-bold">user profile</h1>

        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
          <div className="flex flex-col w-full">
            <TextField
              label="First Name"
              variant="outlined"
              error={Boolean(errorsProfile.first_name)}
              name="first_name"
              {...registerProfile("first_name", { required: true })}
              aria-invalid={errorsProfile.first_name ? "true" : "false"}
            />
            {errorsProfile.first_name?.type === "required" && (
              <p role="alert" className="text-red-600 text-sm">
                First name is required
              </p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <TextField
              label="Last Name"
              name="last_name"
              error={Boolean(errorsProfile.last_name)}
              variant="outlined"
              {...registerProfile("last_name", { required: true })}
              aria-invalid={errorsProfile.last_name ? "true" : "false"}
            />
            {errorsProfile.last_name?.type === "required" && (
              <p role="alert" className="text-red-600 text-sm">
                Last name is required
              </p>
            )}
          </div>
        </div>
        {userUpdateInformationStatus === "loading" && <LoadingAnimation message="Updating profile information, please wait"/>}
        <Button variant="contained" type="submit">
          Change name
        </Button>
      </form>
      <form
        className="flex flex-col gap-6 w-full border-[1px] border-black p-4 rounded-lg"
        onSubmit={handleSubmitPassword(handleChangePassword)}
      >
        <h1 className="uppercase font-bold">Passwords</h1>

        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
          <div className="flex flex-col w-full">
            <TextField
              label="Current password"
              variant="outlined"
              error={Boolean(errorsPassword.current_password)}
              fullWidth
              name="current_password"
              {...registerPassword("current_password", {
                required: true,
              })}
              aria-invalid={errorsPassword.current_password ? "true" : "false"}
            />
            {errorsPassword.current_password?.type === "required" && (
              <p role="alert" className="text-red-600 text-sm">
                Current password is required
              </p>
            )}
          </div>
          <div className="flex flex-col w-full ">
            <TextField
              label="New password"
              variant="outlined"
              error={Boolean(errorsPassword.new_password)}
              fullWidth
              name="new_password"
              {...registerPassword("new_password", { required: true })}
              aria-invalid={errorsPassword.new_password ? "true" : "false"}
            />
            {errorsPassword.new_password?.type === "required" && (
              <p role="alert" className="text-red-600 text-sm">
                New password is required
              </p>
            )}
          </div>
        </div>
        {ChangePasswordStatus === "loading" && <LoadingAnimation message="Updating password, please wait" />}
        {ChangePasswordStatus === "fail" && <h1 className="text-sm text-red-600">Incorrect current password</h1>}

        <Button variant="contained" type="submit">
          Change Password
        </Button>
      </form>
      <form
        className="flex flex-col gap-3 w-full space-y-3  border-[1px] border-black p-4 rounded-lg"
        onSubmit={handleSubmitEmail(handleUpdateEmail)}
      >
        <h1 className="uppercase font-bold">email</h1>

        <div className="flex flex-col mt-4 w-full">
          <TextField
            label="Email"
            variant="outlined"
            error={Boolean(errorsEmail.email)}
            name="email"
            fullWidth
            {...registerEmail("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            aria-invalid={errorsEmail.email ? "true" : "false"}
          />
          {errorsEmail.email && (
            <p role="alert" className="text-red-600 text-sm">
              {errorsEmail.email.message}
            </p>
          )}
        </div>
        {UpdateEmailStatus === "loading" && (
          <LoadingAnimation message="Updating email, please wait" />
        )}
        <Button variant="contained" type="submit">
          Change email
        </Button>
      </form>
    </div>
  );
};

export default SettingsInputs;
