import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuestions } from "../../redux/slices/Questions/getQuestionsSlice";
import { getUserList } from "../../redux/slices/User/userListSlice";
import { postEvaluation } from "../../redux/slices/Evaluation/evaluationSlice";
import { ResetEvaluatedStatus } from "../../redux/slices/Evaluation/evaluationSlice";
import Arrow from "../../assets/fast-forward-double-right-arrows-symbol.png";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import JwtDecoder from "../../utils/JwtDecoder";
import "react-toastify/dist/ReactToastify.css";
import Header from "../GlobalComponents/Header";
import Option1 from "../GlobalComponents/Option1";
import LoadingAnimation from "../Animations/LoadingAnimation";

const NonTeaching = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pages, setPages] = useState("first-page");
  const type = "EVALUATION INSTRUMENT FOR NON-TEACHING";
  const userType = "Non-Teaching";

  // decoded items for JWT in JWT Decoder
  const userData = JwtDecoder().decodedToken;
  const schoolYear = userData ? userData?.school_year : "";
  const user_id = userData ? userData?.id : "";
  const session_id = userData ? userData?.session_id : "";
  const role = userData ? userData?.role : "";

  // initialize react hook form
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchAllFields = watch(["evaluated_full_name"]);
  console.log(watchAllFields)
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
  const handleForthPage = () => {
    if (validation(radioStates.thirdPage, watchAllFields)) {
      setPages("forth-page");
    }
  };
  const handleFifthPage = () => {
    if (validation(radioStates.forthPage, watchAllFields)) {
      setPages("fifth-page");
    }
  };
  const handleSixthPage = () => {
    if (validation(radioStates.fifthPage, watchAllFields)) {
      setPages("sixth-page");
    }
  };
  const handleSevenPage = () => {
    if (validation(radioStates.sixthPage, watchAllFields)) {
      setPages("seven-page");
    }
  };
  const handleEightPage = () => {
    if (validation(radioStates.seventhPage, watchAllFields)) {
      setPages("eight-page");
    }
  };
  const handleNinePage = () => {
    if (validation(radioStates.eigthPage, watchAllFields)) {
      setPages("nine-page");
    }
  };
  const handleTenPage = () => {
    if (validation(radioStates.ninePage, watchAllFields)) {
      setPages("ten-page");
    }
  };
  const goBackToFirstPage = () => setPages("first-page");

  const GoBackToEvaluationType = () => {
    return navigate("/evaluation-type");
  };

  // initialize radio states
  const [radioStates, setRadioStates] = useState({
    firstPage: [],
    secondPage: [],
    thirdPage: [],
    forthPage: [],
    fifthPage: [],
    sixthPage: [],
    seventhPage: [],
    eigthPage: [],
    ninePage: [],
    tenPage: [],
  });

  // selectors
  const { data: questions, status: GetQuestionStatus } = useSelector(
    (state) => state.getQuestions
  );
  const { data: userList, status: GetUserListStatus } = useSelector(
    (state) => state.getUsers
  );
  const { status: EvaluationStatus } = useSelector((state) => state.evaluate);
  console.log(EvaluationStatus)

  // filter questions
  const attendanceAndPunctuality = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Attendance and Punctuality"
  );
  const apperance = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Appearance"
  );
  const organizational = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Organizational skills"
  );
  const initiative = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Initiative"
  );
  const interpersonal = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Interpersonal Skills"
  );
  const workEthics = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Work Ethics"
  );
  const Judgment = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Judgment"
  );
  const attitude = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Attitude"
  );
  const output = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Output"
  );
  const religios = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Religiosity"
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
    if (radioStates.tenPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }

    const questionWithRatings = [
      ...mapItems(attendanceAndPunctuality, radioStates.firstPage),
      ...mapItems(apperance, radioStates.secondPage),
      ...mapItems(organizational, radioStates.thirdPage),
      ...mapItems(initiative, radioStates.forthPage),
      ...mapItems(interpersonal, radioStates.fifthPage),
      ...mapItems(workEthics, radioStates.sixthPage),
      ...mapItems(Judgment, radioStates.seventhPage),
      ...mapItems(attitude, radioStates.eigthPage),
      ...mapItems(output, radioStates.ninePage),
      ...mapItems(religios, radioStates.tenPage),
    ];

    const teacher = userList?.users?.find(
      (item) => item.full_name === data.evaluated_full_name
    );
    const evaluated_id = teacher ? teacher?.id : null;

    const values = {
      ...data,
      session_id: session_id,
      school_year: schoolYear,
      user_id: user_id,
      evaluated_id: evaluated_id,
      class_size: "N/a",
      no_of_student_present: "N/a",
      no_of_student_late: "N/a",
      subject_name: "N/a",
      semester: "N/a",
      office_services: "N/a",
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

  // fetch the question from redux
  useEffect(() => {
    dispatch(getQuestions({ type: type }));
    dispatch(getUserList({ type: userType }));
  }, [dispatch]);

  // display when success
  useEffect(() => {
    if (EvaluationStatus === "success") {
      toast.success("Successfully Evaluated", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      dispatch(ResetEvaluatedStatus());
      reset();
      setPages("first-page");
      dispatch(getUserList({ type: userType }));
    }
  }, [EvaluationStatus, dispatch]);

  // make all the radio button filled into null
  useEffect(() => {
    if (EvaluationStatus === "success" || EvaluationStatus === "idle") {
      setRadioStates((prevState) => ({
        ...prevState,
        firstPage: Array(attendanceAndPunctuality?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        secondPage: Array(apperance?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        thirdPage: Array(organizational?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        forthPage: Array(initiative?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        fifthPage: Array(interpersonal?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        sixthPage: Array(workEthics?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        seventhPage: Array(Judgment?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        eigthPage: Array(attitude?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        ninePage: Array(output?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        tenPage: Array(religios?.length).fill(null),
      }));
    }
  }, [questions, EvaluationStatus]);

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
            EVALUATION INSTRUMENT FOR NON-TEACHING
          </h1>
        </div>
        <h1 className="border border-black mt-2"></h1>

        <Option1
          labelone="Never"
          labeltwo="Sometimes"
          labelthree="Often"
          labelfour="Always"
        />
      </section>
      <form className="mt-10 p-1 lg:p-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <div className="relative overflow-x-hidden shadow-md sm:rounded-lg mt-10 min-w-full">
            {pages === "first-page" ? (
              <>
                <div className="flex flex-col lg:flex-row gap-7 outline-none sm:max-w-sm mb-24 mt-2">
                  <FormControl
                    fullWidth
                    error={Boolean(errors.evaluated_full_name)}
                  >
                    <InputLabel>Worker Name</InputLabel>
                    <Controller
                      name="evaluated_full_name"
                      control={control}
                      rules={{ required: "Name of worker is required!" }}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Worker Name"
                          value={field.value || ""}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                          {userList?.users?.map((item) => (
                            <MenuItem value={item?.full_name} key={item?.id}>
                              {item?.full_name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.evaluated_full_name && (
                      <p className="text-sm text-red">
                        {errors.evaluated_full_name.message}
                      </p>
                    )}
                  </FormControl>
                </div>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Attendance and Punctuality
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

                  <tbody className="max-h-screen min-h-full">
                    {GetQuestionStatus === "loading" && (
                      <div className="flex justify-center items-end absolute inset-0">
                        <LoadingAnimation />
                      </div>
                    )}
                  </tbody>
                  {GetQuestionStatus === "success" && (
                    <>
                      {attendanceAndPunctuality?.map((item, index) => (
                        <tr key={index} className="border-2 border-black group">
                          <td className="border border-black text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-80">
                            <>{item?.question_description}</>
                          </td>
                          <td className="flex gap-1 justify-between min-w-full items-center p-2">
                            {[1, 2, 3, 4].map((optionValue) => (
                              <label key={optionValue}>
                                <input
                                  type="radio"
                                  className="cursor-pointer"
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
                  Appearance
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
                    {apperance?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
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
            ) : pages === "third-page" ? (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Organizational skills
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
                    {organizational?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group ">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60">
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
                <div className="w-full flex justify-between p-4">
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer rotate-180"
                    onClick={handleSecondPage}
                  />
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                    onClick={handleForthPage}
                  />
                </div>
              </>
            ) : pages === "forth-page" ? (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Initiative
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
                    {initiative?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
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
                                  radioStates.forthPage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "forthPage",
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
                    onClick={handleThirdPage}
                  />
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                    onClick={handleFifthPage}
                  />
                </div>
              </>
            ) : pages === "fifth-page" ? (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Interpersonal Skills
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
                    {interpersonal?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
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
                                  radioStates.fifthPage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "fifthPage",
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
                    onClick={handleForthPage}
                  />
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                    onClick={handleSixthPage}
                  />
                </div>
              </>
            ) : pages === "sixth-page" ? (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Work Ethics
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
                    {workEthics?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
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
                                  radioStates.sixthPage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "sixthPage",
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
                    onClick={handleFifthPage}
                  />
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                    onClick={handleSevenPage}
                  />
                </div>
              </>
            ) : pages === "seven-page" ? (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Judgment
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
                    {Judgment?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2">
                          {[1, 2, 3, 4].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer "
                                value={optionValue.toString()}
                                checked={
                                  radioStates.seventhPage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "seventhPage",
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
                    onClick={handleSixthPage}
                  />
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                    onClick={handleEightPage}
                  />
                </div>
              </>
            ) : pages === "eight-page" ? (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Attitude
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
                    {attitude?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
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
                                  radioStates.eigthPage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "eigthPage",
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
                    onClick={handleSevenPage}
                  />
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                    onClick={handleNinePage}
                  />
                </div>
              </>
            ) : pages === "nine-page" ? (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Output
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
                    {output?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
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
                                  radioStates.ninePage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "ninePage",
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
                    onClick={handleEightPage}
                  />
                  <img
                    src={Arrow}
                    className="aspect-square h-16 mt-4 border-2 border-black p-4 rounded-full bg-tertiary hover:scale-105 cursor-pointer "
                    onClick={handleTenPage}
                  />
                </div>
              </>
            ) : (
              <>
                <h1 className=" text-2xl font-bold text-black uppercase">
                  Religiosity
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
                    {religios?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-60 min-w-60">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2 ">
                          {[1, 2, 3, 4].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  border border-black"
                                value={optionValue.toString()}
                                checked={
                                  radioStates.tenPage[index] === optionValue
                                }
                                onChange={() =>
                                  handleRadioChange(
                                    "tenPage",
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
                    aria-invalid={errors.comment ? "true" : "false"}
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
                    onClick={handleNinePage}
                  />
                  <button
                    className="min-w-[150px] py-2 px-6 mt-10  bg-primary  text-white font-bold rounded-lg hover:opacity-95 mb-6 "
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
      <ToastContainer pauseOnHover={false} />
    </div>
  );
};

export default NonTeaching;
