import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { getQuestions } from "../../redux/slices/Questions/getQuestionsSlice";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getOfficeList } from "../../redux/slices/OfficeList/officeListSlice";
import { postEvaluation } from "../../redux/slices/Evaluation/evaluationSlice";
import { ResetEvaluatedStatus } from "../../redux/slices/Evaluation/evaluationSlice";
import "react-toastify/dist/ReactToastify.css";
import Arrow from "../../assets/fast-forward-double-right-arrows-symbol.png";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import JwtDecoder from "../../utils/JwtDecoder";
import Header from "../GlobalComponents/Header";
import LoadingAnimation from "../Animations/LoadingAnimation";

const EvaluationForCustomer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pages, setPages] = useState("first-page");
  const type = "EVALUATION INSTRUMENT FOR CUSTOMER ";

  // initialize react hook form
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchAllFields = watch();

  // initialize radio states
  const [radioStates, setRadioStates] = useState({
    firstPage: [],
    secondPage: [],
    thirdPage: [],
  });

  // function for validation
  const validation = (radio, watchField) => {
    if (
      radio.some((rating) => rating === null) ||
      Object.values(watchField).some(
        (value) => value === null || value === undefined || value === ""
      )
    ) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return false;
    }
    return true;
  };

  // function for next pages
  const handleSecondPage = () => {
    if (validation(radioStates.firstPage, watchAllFields)) {
      setPages("second-page");
    }
  };

  const handleThirdPage = () => {
    if (validation(radioStates.secondPage, watchAllFields)) {
      setPages("third-page");
    }
  };

  const goBackToFirstPage = () => setPages("first-page");
  const GoBackToEvaluationType = () => {
    navigate("/");
  };

  // decoded items for JWT in JWT Decoder
  const userData = JwtDecoder().decodedToken;
  const schoolYear = userData ? userData?.school_year : "";
  const user_id = userData ? userData?.id : "";
  const session_id = userData ? userData?.session_id : "";

  // selectors
  const { data: questions, status: GetQuestionStatus } = useSelector(
    (state) => state.getQuestions
  );

  const { data: OfficeListData, status: OfficeListStatus } = useSelector(
    (state) => state.officeList
  );

  const { status: EvaluatedStatus } = useSelector((state) => state.evaluate);
  //   const questions = useSelector((state) => state.getQuestions.data.questions);
  //   const status = useSelector((state) => state.evaluate.status);

  // filter questions
  const Availability = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Availability"
  );
  const clientServices = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Client Services"
  );
  const clientRelation = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Client Relations"
  );

  // functions for handle radio changes
  const handleRadioChange = (page, index, value) => {
    setRadioStates((prevState) => ({
      ...prevState,
      [page]: [
        ...prevState[page].slice(0, index),
        value,
        ...prevState[page].slice(index + 1),
      ],
    }));
  };

  // handle maps for every questions with ratings
  const mapItems = (items, ratings) => {
    return items.map((item, index) => ({
      question_id: item.id,
      type: item.type,
      question_group: item?.question_group,
      evaluation_type: item?.evaluation_type,
      question_description: item.question_description,
      rating: ratings[index],
    }));
  };

  const onSubmit = (data) => {
    if (radioStates.thirdPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }

    const questionWithRatings = [
      ...mapItems(Availability, radioStates.firstPage),
      ...mapItems(clientServices, radioStates.secondPage),
      ...mapItems(clientRelation, radioStates.thirdPage),
    ];

    const values = {
      ...data,
      session_id: session_id,
      school_year: schoolYear,
      user_id: user_id,
      evaluated_id: null,
      class_size: "N/a",
      evaluated_full_name: null,
      no_of_student_present: "N/a",
      no_of_student_late: "N/a",
      subject_name: "N/a",
      semester: "N/a",
      suggestion: "N/a",
      gender: "N/a",
      category: "N/a",
      length_of_service: "N/a",
      strand: "N/a",
      year_level: "N/a",
      questions: questionWithRatings,
    };
    dispatch(postEvaluation(values));
  };

  // when next page scroll back to the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pages]);

  useEffect(() => {
    if (OfficeListStatus === "idle") {
      dispatch(getOfficeList());
    }
  }, [dispatch, OfficeListStatus]);

  useEffect(() => {
    dispatch(getQuestions({ type: type }));
  }, [dispatch]);

  //  display when success
  useEffect(() => {
    if (EvaluatedStatus === "success") {
      toast.success("Successfully Evaluated", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      reset();
      setPages("first-page");
      dispatch(ResetEvaluatedStatus());
      dispatch(getOfficeList());
    }
  }, [dispatch, EvaluatedStatus]);

  // make all the radio button filled into null
  useEffect(() => {
    if (EvaluatedStatus === "success" || EvaluatedStatus === "idle") {
      setRadioStates((prevState) => ({
        ...prevState,
        firstPage: Array(Availability?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        secondPage: Array(clientServices?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        thirdPage: Array(clientRelation?.length).fill(null),
      }));
    }
  }, [questions, EvaluatedStatus]);

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <section className="bg-white min-h-full p-4">
        <div className="flex items-center gap-4">
          <img
            src={Arrow}
            className="aspect-square h-7  rotate-180 cursor-pointer "
            onClick={GoBackToEvaluationType}
          />

          <h1 className="text-2xl font-bold">
            EVALUATION INSTRUMENT FOR CUSTOMER
          </h1>
        </div>
        <h1 className="border border-black mt-2"></h1>
        <div className="lg:p-10 container mt-10 lg:mt- mx-auto ">
          <h1 className="font-bold text-lg">To our dear respondents</h1>
          <p className="lg:ml-10 mt-4 text-justify text-primary">
            This self-survey is conducted to help identify the areas that need
            improvement in our office services. Please respond to the requested
            information objectively. By doing so, you are helping us provide
            better services in the days ahead. Thank you very much. Please
            encircle the number which you think corresponds best to your
            observation.{" "}
          </p>
        </div>
      </section>
      <form className=" p-1 lg:p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative overflow-x-hidden shadow-md sm:rounded-lg mt-10 min-w-full">
          {pages === "first-page" ? (
            <>
              <div className="flex flex-col lg:flex-row gap-7 outline-none sm:max-w-sm mb-24 mt-2">
                <FormControl fullWidth error={Boolean(errors.office_services)}>
                  <InputLabel>Office Services</InputLabel>
                  <Controller
                    name="office_services"
                    control={control}
                    rules={{ required: "Office Services is required!" }}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Worker Name"
                        value={field.value || ""}
                        MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                      >
                        {OfficeListData?.data?.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.office_services && (
                    <p className="text-sm text-red">
                      {errors.office_services.message}
                    </p>
                  )}
                </FormControl>
              </div>
              <h1 className=" text-2xl font-bold text-black uppercase">
                Availability
              </h1>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-secondary text-white border ">
                  <tr>
                    <th
                      scope="col"
                      className="text-2xl px-6 py-3 border-2 border-black"
                    >
                      Question
                    </th>
                    <th className="text-2xl px-4 py-3  text-center border-2 border-black">
                      Rating
                      <div className="flex justify-between mt-4 text-black ">
                        <h1>1</h1>
                        <h1>2</h1>
                        <h1>3</h1>
                        <h1>4</h1>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="max-h-screen min-h-full ">
                 
                  {GetQuestionStatus === "success" && (
                    <>
                     
                      {Availability?.map((item, index) => (
                        <tr key={index} className="border-2 border-black group">
                          <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                            <>{item?.question_description}</>
                          </td>
                          <td className="flex gap-1 justify-between min-w-full items-center p-2">
                            {[1, 2, 3, 4].map((optionValue, optionIndex) => (
                              <label key={optionValue}>
                                <input
                                  type="radio"
                                  className="cursor-pointer  "
                                  value={optionValue.toString()}
                                  checked={
                                    radioStates.firstPage[index] === optionValue
                                  }
                                  onChange={() =>
                                    handleRadioChange(
                                      "firstPage",
                                      index,
                                      optionValue
                                    )
                                  }
                                  required
                                  oninvalid={(e) => {
                                    e.preventDefault();
                                    alert("Please select an option.");
                                  }}
                                />
                              </label>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
              <div className="w-full flex justify-end p-4">
                <img
                  src={Arrow}
                  className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                  onClick={handleSecondPage}
                />
              </div>
            </>
          ) : pages === "second-page" ? (
            <>
              <h1 className=" text-2xl font-bold text-black uppercase">
                Client Services
              </h1>

              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-secondary text-white border ">
                  <tr>
                    <th
                      scope="col"
                      className="text-2xl px-6 py-3 border-2 border-black"
                    >
                      Question
                    </th>
                    <th className="text-2xl px-4 py-3  text-center border-2 border-black">
                      Rating
                      <div className="flex justify-between mt-4 text-black ">
                        <h1>1</h1>
                        <h1>2</h1>
                        <h1>3</h1>
                        <h1>4</h1>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="max-h-screen min-h-full ">
                  {clientServices?.map((item, index) => (
                    <tr key={index} className="border-2 border-black group">
                      <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                        <>{item?.question_description}</>
                      </td>
                      <td className="flex gap-1 justify-between min-w-full items-center p-2">
                        {[1, 2, 3, 4].map((optionValue, optionIndex) => (
                          <label key={optionValue}>
                            <input
                              type="radio"
                              className="cursor-pointer"
                              value={optionValue.toString()}
                              checked={
                                radioStates.secondPage[index] === optionValue
                              }
                              onChange={() =>
                                handleRadioChange(
                                  "secondPage",
                                  index,
                                  optionValue
                                )
                              }
                              required
                              oninvalid={(e) => {
                                e.preventDefault();
                                alert("Please select an option.");
                              }}
                            />
                          </label>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-between p-4">
                <img
                  src={Arrow}
                  className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer rotate-180"
                  onClick={goBackToFirstPage}
                />
                <img
                  src={Arrow}
                  className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                  onClick={handleThirdPage}
                />
              </div>
            </>
          ) : (
            pages === "third-page" && (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Client Relations
                </h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase bg-secondary text-white border ">
                    <tr>
                      <th
                        scope="col"
                        className="text-2xl px-6 py-3 border-2 border-black"
                      >
                        Question
                      </th>
                      <th className="text-2xl px-4 py-3  text-center border-2 border-black">
                        Rating
                        <div className="flex justify-between mt-4 text-black ">
                          <h1>1</h1>
                          <h1>2</h1>
                          <h1>3</h1>
                          <h1>4</h1>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-screen min-h-full ">
                    {clientRelation?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2">
                          {[1, 2, 3, 4].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  border border-black"
                                value={optionValue.toString()}
                                checked={
                                  radioStates.thirdPage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "thirdPage",
                                    index,
                                    optionValue
                                  )
                                }
                                required
                                oninvalid={(e) => {
                                  e.preventDefault();
                                  alert("Please select an option.");
                                }}
                              />
                            </label>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col mt-10">
                  <TextField
                    id="outlined-multiline-static"
                    label="Comments"
                    multiline
                    error={Boolean(errors.comment)}
                    rows={4}
                    {...register("comment", { required: true })}
                    aria-invalid={errors.comments ? "true" : "false"}
                  />
                  {errors.comment?.type === "required" && (
                    <p role="alert" className="text-sm text-red-600">
                      Comments is required!
                    </p>
                  )}
                </div>
                <div className="w-full flex justify-between p-4">
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer rotate-180"
                    onClick={handleSecondPage}
                  />
                  <button
                    className="min-w-[150px] py-2 px-6 mt-10  bg-primary  text-white font-bold rounded-lg hover:opacity-95 mb-6 "
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </>
            )
          )}
        </div>
      </form>
      <ToastContainer pauseOnHover={false} />
    </div>
  );
};

export default EvaluationForCustomer;
