import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Header from "../../components/GlobalComponents/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Arrow from "../../assets/fast-forward-double-right-arrows-symbol.png";
import JwtDecoder from "../../utils/JwtDecoder";

const EvaluationType = () => {
  const navigate = useNavigate();
  const userData = JwtDecoder().decodedToken;
  const role = userData ? userData?.role : "";

  const { control, handleSubmit } = useForm();

  const handleEvaluationType = (e) => {
    const type = e.target.value;
    navigate(`/evaluation-form/${type}`);
  };

  const GoBackToDashboard = () => navigate("/");

  return (
    <div className="flex flex-col min-h-screen bg-backgroundColor">
      <Header />
      {role === "Student" ? (
        ""
      ) : (
        <>
          <img
            src={Arrow}
            className="hidden lg:block aspect-square h-16 absolute translate-y-28 translate-x-6 rotate-180 cursor-pointer hover:scale-105 duration-100 ease-in border-black py-4 px-4 rounded-full bg-tertiary"
            onClick={GoBackToDashboard}
          />
        </>
      )}
      <div className="flex  justify-center items-center bg-backgroundColor w-full">
        <p className="text-[20px] lg:text-[39px] text-center lg:w-1/2 mx-5 mt-4 h-max ">
          “The power of{" "}
          <span className="text-primary font-bold animate-pulse">
            EVALUATION{" "}
          </span>
          lies in its ability to uncover strengths and weaknesses.”
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center pt-32 bg-backgroundColor px-4 lg:px-0 ">
        <div className="sm:max-w-sm lg:min-w-[400px] w-full -translate-y-40">
          <form
            onChangeCapture={handleSubmit(handleEvaluationType)}
            className="bg-white rounded-lg"
          >
            <FormControl fullWidth>
              <InputLabel>Evaluation Type</InputLabel>
              <Controller
                name="Evaluation_Type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Evaluation Type"
                    value={field.value || ""}
                    onChange={handleEvaluationType}
                  >
                    {role === "Principal" && [
                      <MenuItem key="2" value="2">
                        EVALUATION OF TEACHERS PERFORMANCE
                      </MenuItem>,
                      <MenuItem key="3" value="3" disabled>
                        CLASSROOM OBSERVATION INSTRUMENT
                      </MenuItem>,
                      <MenuItem key="4" value="4">
                        ADMINISTRATORS EVALUATION
                      </MenuItem>,
                      <MenuItem key="5" value="5">
                        EVALUATION INSTRUMENT FOR NON-TEACHING
                      </MenuItem>,
                    ]}
                    {(role === "Treasurer" ||
                      role === "Registrar" ||
                      role === "Coordinator") && [
                      <MenuItem key="2" value="2">
                        EVALUATION OF TEACHERS PERFORMANCE
                      </MenuItem>,
                      <MenuItem key="4" value="4">
                        ADMINISTRATORS EVALUATION
                      </MenuItem>,
                      <MenuItem key="5" value="5">
                        EVALUATION INSTRUMENT FOR NON-TEACHING
                      </MenuItem>,
                    ]}
                    {role === "Student" && [
                      <MenuItem key="1" value="1">
                        STUDENT EVALUATION OF TEACHING
                      </MenuItem>,
                      <MenuItem key="6" value="6">
                        EVALUATION INSTRUMENT FOR CUSTOMER
                      </MenuItem>,
                    ]}
                    {role === "Teacher" && (
                      <MenuItem key="2" value="2">
                        EVALUATION OF TEACHERS PERFORMANCE
                      </MenuItem>
                    )}
                    {role === "Non-Teaching" && (
                      <MenuItem key="5" value="5">
                        EVALUATION INSTRUMENT FOR NON-TEACHING
                      </MenuItem>
                    )}
                  </Select>
                )}
              />
            </FormControl>
          </form>
        </div>
        {role === "Student" ? (
          ""
        ) : (
          <>
            <img
              src={Arrow}
              className="lg:hidden aspect-square h-16 absolute translate-y-28 rotate-180 cursor-pointer hover:scale-105 duration-100 ease-in border-2 border-black py-4 px-4 rounded-full bg-tertiary"
              onClick={GoBackToDashboard}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EvaluationType;
