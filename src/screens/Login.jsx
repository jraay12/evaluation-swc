import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "../redux/slices/Auth/loginSlice";
import { postForgotPassword } from "../redux/slices/Auth/forgotPasswordSlice";
import { ForgotPasswordStatusReset } from "../redux/slices/Auth/forgotPasswordSlice";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOn from "../assets/visibilityOn.png";
import SuccessImage from "../assets/success.png";
import VisibilityOff from "../assets/visibilityOff.png";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import LoadingAnimation from "../components/Animations/LoadingAnimation";
const Login = () => {
  // initialize redux
  const dispatch = useDispatch();

  // initialize states
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  // initialized hook forms
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    reset: resetForgotPassword,
    watch,
    formState: { errors: errorsForgotPassword },
  } = useForm();


  // call data from redux
  const {data: LoginData, status: LoginStatus} = useSelector((state) => state.login)
  const {status: ForgotPasswordStatus} = useSelector((state) => state.forgotPassword)

  // get token when logged in
  const token = LoginData ? LoginData.token : ""

  

  const showPassword = () => {
    setHiddenPassword(!hiddenPassword);
  };

  const passwordForgot = () => {
    setForgotPassword(!forgotPassword);
    dispatch(ForgotPasswordStatusReset())
  };

  

  // functions
  const handleLogin = (data) => {
    dispatch(postLogin(data))
  }

  const handleForgotPassword = (data) => {
    dispatch(postForgotPassword(data))
   
  }

  useEffect(() => {
    if(token){
      Cookies.set("token", token)
      window.location.href = "/"
    }
  }, [token])

  useEffect(() => {
    if (ForgotPasswordStatus === "success"){
      setTimeout(() => {
        setForgotPassword(false)
        resetForgotPassword()
      }, 2000)
    }
  }, [ForgotPasswordStatus])

  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="flex flex-col gap-10 items-center max-h-[600px] py-5  sm:w-2/3 w-[90%] sm:max-w-lg drop-shadow-2xl shadow-2xl rounded-2xl bg-white  ">
        <h1 className=" font-semibold text-2xl md:text-4xl mt-2">
          WELCOME TO
          <span className="font-playfair text-3xl md:text-5xl underline">
            LVAA
          </span>
        </h1>
        {!forgotPassword ? (
          <form className="flex flex-col gap-6  px-6 items-center justify-center w-full" onSubmit={handleSubmitLogin(handleLogin)}>
            <div className="w-full">
              <TextField
                label="Username"
                name="username"
                {...registerLogin("username", { required: true })}
                aria-invalid={errorsLogin.username ? "true" : "false"}
                fullWidth
              />
              {errorsLogin.username?.type === "required" && (
              <p role="alert" className="text-sm text-red-600 w-full">
                Username is required
              </p>
            )}
            </div>
            <div className="w-full">
              <TextField
                label="Password"
                type={hiddenPassword ? "text" : "password"}
                autoComplete="current-password"
                fullWidth
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={showPassword}
                      className="cursor-pointer"
                    >
                      <img
                        src={hiddenPassword ? VisibilityOff : VisibilityOn}
                        alt="Visibility Toggle"
                      />
                    </InputAdornment>
                  ),
                }}
                {...registerLogin("password", { required: true })}
                aria-invalid={errorsLogin.password ? "true" : "false"}
              />
              {errorsLogin.password?.type === "required" && (
              <p role="alert" className="text-sm text-red-600 w-full">
                Password is required
              </p>
            )}
            </div>
            <div className="flex w-full justify-start">
              { LoginStatus === "loading" && (
                <LoadingAnimation message="Verifying Credentials please wait" />
              )}
              {LoginStatus === "fail" ? (
              <h1 className="text-[12px] text-red-600 ">Invalid Credentials</h1>
            ) : (
              ""
            )}
            </div>

            <div className="w-full">
              <p
                className="hover:text-blue-700 hover:underline cursor-pointer text-start w-max font-bold"
                onClick={passwordForgot}
              >
                Forgot password?
              </p>
            </div>
            <button
              type="submit"
              className=" bg-primary hover:opacity-80 border-2  duration-200 max-h-10 min-w-full  rounded-lg ease-in text-white font-bold font-playfair text-lg  aspect-square "
            >
              LOGIN
            </button>
          </form>
        ) : (
          <>
            {ForgotPasswordStatus === "success" ? (
              <div className="flex flex-col items-center w-full p-2">
                <img src={SuccessImage} />
                <h1 className="font-bold text-2xl">Yahoo!</h1>
                <p className="text-sm text-center">
                  We've sent instruction on how to reset your password to{" "}
                  {/* <span className="font-bold">{userEmail}</span>{" "} */}
                </p>
              </div>
            ) : (
              <>
                <form className="flex flex-col gap-4 min-h-[250px] px-6 items-center justify-evenly w-full" onSubmit={handleSubmitForgotPassword(handleForgotPassword)}>
                  <div className="w-full">
                    <TextField
                      label="Email"
                      name="email"
                      {...registerForgotPassword("email", {
                        required: true,
                        pattern: {
                          value:
                            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
                          message: "Please use valid email address",
                        },
                      })}
                      aria-invalid={
                        errorsForgotPassword.email ? "true" : "false"
                      }
                      fullWidth
                    />
                    {errorsForgotPassword.email?.type === "required" && (
                      <p role="alert" className="text-sm text-red-600 w-full">
                        Email is required
                      </p>
                    )}
                    {errorsForgotPassword.email && (
                      <p role="alert" className="text-sm text-red-600 w-full">
                        {errorsForgotPassword.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full ">
                    {ForgotPasswordStatus === "loading" && (
                      <LoadingAnimation message="Verifying, Please wait." />
                    )}
                    {ForgotPasswordStatus === "fail" ? (
                      <h1 className="text-[12px] text-red-600">
                        Email does not exist
                      </h1>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-full">
                    <p
                      className="hover:text-blue-700 hover:underline cursor-pointer text-start w-max font-bold "
                      onClick={passwordForgot}
                    >
                      Back to login
                    </p>
                  </div>
                  <button
                    type="submit"
                    className=" duration-200 ease-in  font-bold font-playfair text-lg bg-primary min-w-full text-white rounded-lg hover:opacity-70 min-h-10"
                  >
                    SEND
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
