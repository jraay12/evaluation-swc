import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getQuestions } from "../../redux/slices/Questions/getQuestionsSlice";
import { getUserList } from "../../redux/slices/User/userListSlice";
import { postEvaluation } from "../../redux/slices/Evaluation/evaluationSlice";
import { ResetEvaluatedStatus } from "../../redux/slices/Evaluation/evaluationSlice";
import Header from "../../components/GlobalComponents/Header";
import Option1 from "../GlobalComponents/Option1";
import Arrow from "../../assets/fast-forward-double-right-arrows-symbol.png";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Options2 from "../GlobalComponents/Option2";
import JwtDecoder from "../../utils/JwtDecoder";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../Animations/LoadingAnimation";

const AdministrationForms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const type = "ADMINISTRATORS EVALUATION";
  const userType = "Admin";
  const [pages, setPages] = useState("first-page");

  // decoded items for JWT in JWT Decoder
  const userData = JwtDecoder().decodedToken;
  const schoolYear = userData ? userData?.school_year : "";
  const user_id = userData ? userData?.id : "";
  const session_id = userData ? userData?.session_id : "";

  // selectors
  const { data: questions, status: GetQuestionStatus } = useSelector(
    (state) => state.getQuestions
  );
  const { data: GetUserList } = useSelector((state) => state.getUsers);
  const {status: EvaluationStatus} = useSelector((state) => state.evaluate)

  // initialize use react hook forms
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // initialize watch to check all the fields if its empty or not
  const watchAllFields = watch();
  const handleSecondPage = () => {
    if (
      radioStates.firstPage.some((rating) => rating === null) ||
      Object.values(watchAllFields).some(
        (value) => value === null || value === undefined || value === ""
      )
    ) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }

    setPages("second-page");
  };

  const handleThirdPage = () => {
    if (radioStates.secondPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }

    setPages("third-page");
  };
  const handleForthPage = () => {
    if (radioStates.thirdPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }
    setPages("forth-page");
  };
  const handleFifthPage = () => {
    if (radioStates.forthPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }
    setPages("fifth-page");
  };
  const handleSixthPage = () => {
    if (radioStates.fifthPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }
    setPages("sixth-page");
  };
  const handleSevenPage = () => {
    if (radioStates.sixthPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }
    setPages("seven-page");
  };
  const goBackToFirstPage = () => setPages("first-page");
  const GoBackToEvaluationType = () => navigate("/evaluation-type");

  // filter questions
  const empowerment = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Empowerment Skill"
  );
  const intuition = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Intuition Skill"
  );
  const self = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Self-Understanding Skill"
  );
  const Congruence = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Value Congruence Skill"
  );
  const vision = questions?.questions?.filter(
    (item) => item?.evaluation_type === "Vision Skill"
  );
  const personal = questions?.questions?.filter(
    (item) => item?.evaluation_type === "General" && item.question_group === "3"
  );
  const additional = questions?.questions?.filter(
    (item) => item?.evaluation_type === "General" && item.question_group === "4"
  );

  // initialize radio states
  const [radioStates, setRadioStates] = useState({
    firstPage: [],
    secondPage: [],
    thirdPage: [],
    forthPage: [],
    fifthPage: [],
    sixthPage: [],
    seventhPage: [],
  });

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

  // submit form
  const onSubmit = (data) => {
    if (radioStates.seventhPage.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }

    const teacher = GetUserList?.users?.find(
      (item) => item.full_name === data.evaluated_full_name
    );
    const evaluated_id = teacher ? teacher?.id : null;

    const questionWithRatings = [
      ...mapItems(empowerment, radioStates.firstPage),
      ...mapItems(intuition, radioStates.secondPage),
      ...mapItems(self, radioStates.thirdPage),
      ...mapItems(Congruence, radioStates.forthPage),
      ...mapItems(vision, radioStates.fifthPage),
      ...mapItems(personal, radioStates.sixthPage),
      ...mapItems(additional, radioStates.seventhPage),
    ];

    const values = {
      ...data,
      session_id: session_id,
      user_id: user_id,
      school_year: schoolYear,
      evaluated_id: evaluated_id,
      subject_name: "N/a",
      strand: "N/a",
      year_level: "N/a",
      class_size: "N/a",
      office_services: "N/a",
      semester: "N/a",
      no_of_student_present: "N/a",
      no_of_student_late: "N/a",
      suggestion: "N/a",
      questions: questionWithRatings,
    };
    dispatch(postEvaluation (values));
  };

  // for scrolling back to the top when clicking next page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pages]);

  // for fetching the question in redux
  useEffect(() => {
    dispatch(getQuestions({ type: type }));
    dispatch(getUserList({ type: userType }));
  }, [dispatch]);

  //display when success
  useEffect(() => {
    if (EvaluationStatus === "success"){
      toast.success("Successfully Evaluated", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      reset()
      dispatch(getUserList({ type: userType }));
      dispatch(ResetEvaluatedStatus())
      setPages("first-page")
    }

  }, [EvaluationStatus, dispatch])

  // make all the radio button filled into null
  useEffect(() => {
    if (EvaluationStatus === "success" || EvaluationStatus === "idle") {
      setRadioStates((prevState) => ({
        ...prevState,
        firstPage: Array(empowerment?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        secondPage: Array(intuition?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        thirdPage: Array(self?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        forthPage: Array(Congruence?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        fifthPage: Array(vision?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        sixthPage: Array(personal?.length).fill(null),
      }));
      setRadioStates((prevState) => ({
        ...prevState,
        seventhPage: Array(additional?.length).fill(null),
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

          <h1 className="text-2xl font-bold">ADMINISTRATORS EVALUATION</h1>
        </div>
        <h1 className="border border-black mt-2"></h1>
        {pages === "sixth-page" ? (
          <Option1
            labelone="None at all"
            labeltwo="Minimal"
            labelthree="Just Enough"
            labelfour="Much"
            extralabel="5"
            labelfive="Very Much"
          />
        ) : pages === "seven-page" ? (
          <>
            <Options2
              labelone="Highly Authoritarian"
              labeltwo="Authoritarian"
              labelthree="Democratic"
              labelfour="Highly Democratic"
            />
          </>
        ) : (
          <Option1
            labelone="Never"
            labeltwo="Seldom"
            labelthree="Sometimes"
            labelfour="Usually"
            extralabel="5"
            labelfive="Always"
          />
        )}
      </section>
      <form className=" p-1 lg:p-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <div className="relative overflow-x-hidden shadow-md sm:rounded-lg mt-10 min-w-full">
            {pages === "first-page" ? (
              <>
                <div className="flex flex-col md:flex-row gap-7 outline-none  mb-10 mt-12">
                  <FormControl
                    fullWidth
                    error={Boolean(errors.evaluated_full_name)}
                  >
                    <InputLabel>Teacher</InputLabel>
                    <Controller
                      name="evaluated_full_name"
                      control={control}
                      rules={{ required: "Teacher Observed is required!" }}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Teacher"
                          value={field.value || ""}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                          {GetUserList?.users?.map((item) => (
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
                  <FormControl fullWidth error={Boolean(errors.gender)}>
                    <InputLabel>Gender</InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: "Gender is required!" }}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Gender"
                          value={field.value || ""}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <p className="text-sm text-red">
                        {errors.gender.message}
                      </p>
                    )}
                  </FormControl>
                  <FormControl fullWidth error={Boolean(errors.category)}>
                    <InputLabel>Catergory</InputLabel>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: "Category is required!" }}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Category"
                          value={field.value || ""}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                          <MenuItem value="teaching">Teaching</MenuItem>
                          <MenuItem value="non-teacher">Non-Teaching</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-sm text-red">
                        {errors.category.message}
                      </p>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={Boolean(errors.lengthOfService)}
                  >
                    <InputLabel>Length of service</InputLabel>
                    <Controller
                      name="length_of_service"
                      control={control}
                      rules={{ required: "Length of service is required!" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Length of service"
                          value={field.value || ""}
                          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                        >
                          <MenuItem value="10">10 years or less</MenuItem>
                          <MenuItem value="11">11 to 20 years</MenuItem>
                          <MenuItem value="21">more than 20 years </MenuItem>
                        </Select>
                      )}
                    />
                    {errors.lengthOfService && (
                      <p className="text-sm text-red">
                        {errors.lengthOfService.message}
                      </p>
                    )}
                  </FormControl>
                </div>

                <h1 className=" text-2xl font-bold text-black uppercase">
                  A. Empowerment Skill (the ability to share power to
                  subordinate):
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
                          <h1>5</h1>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-screen min-h-full ">
                    {GetQuestionStatus === "loading" && (
                      <div className="flex absolute inset-0 items-end  justify-center">
                        <LoadingAnimation />
                      </div>
                    )}
                    {GetQuestionStatus === "success" && (
                      <>
                        {empowerment?.map((item, index) => (
                          <tr key={index} className="border border-black group">
                            <td className="border border-black  text-primary p-2 hover:font-bold group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                              <>{item?.question_description}</>
                            </td>
                            <td className="flex gap-1 justify-between min-w-full items-center p-2">
                              {[1, 2, 3, 4, 5].map(
                                (optionValue, optionIndex) => (
                                  <label key={optionValue}>
                                    <input
                                      type="radio"
                                      className="cursor-pointer  border border-black"
                                      value={optionValue.toString()}
                                      checked={
                                        radioStates.firstPage[index] ===
                                        optionValue
                                      }
                                      onChange={() =>
                                        handleRadioChange(
                                          "firstPage",
                                          index,
                                          optionValue
                                        )
                                      }
                                      required
                                      onInvalid={(e) => {
                                        e.preventDefault();
                                        alert("Please select an option.");
                                      }}
                                    />
                                  </label>
                                )
                              )}
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
                <h1 className=" text-xl font-bold text-black uppercase">
                  B. Intuition Skill (the ability to have a feel for the
                  situation, changes, and actions):
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
                          <h1>5</h1>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-screen min-h-full ">
                    {intuition?.map((item, index) => (
                      <tr key={index} className="border border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2">
                          {[1, 2, 3, 4, 5].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  border border-black"
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
                                onInvalid={(e) => {
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
                <h1 className=" text-xl font-bold text-black uppercase">
                  C. Self-Understanding Skill (the ability to assess one’s
                  srengths and weaknesses):
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
                          <h1>5</h1>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-screen min-h-full ">
                    {self?.map((item, index) => (
                      <tr key={index} className="border border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2">
                          {[1, 2, 3, 4, 5].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  "
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
                                onInvalid={(e) => {
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
                <h1 className=" text-xl font-bold text-black uppercase">
                  D. Value Congruence Skill (the ability to reconcile the
                  organization’s beliefs and employee values):
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
                          <h1>5</h1>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-screen min-h-full ">
                    {Congruence?.map((item, index) => (
                      <tr key={index} className="border border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2">
                          {[1, 2, 3, 4, 5].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  border border-black"
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
                                onInvalid={(e) => {
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
                <h1 className=" text-xl font-bold text-black uppercase">
                  E. Vision Skill (the ability to imagine a different and better
                  environment and how to achieve it):
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
                          <h1>5</h1>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-screen min-h-full ">
                    {vision?.map((item, index) => (
                      <tr key={index} className="border border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2">
                          {[1, 2, 3, 4, 5].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  border border-black"
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
                                onInvalid={(e) => {
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
                <h1 className=" text-xl font-bold text-black uppercase">
                  III. Use the scale below to indicate what influence does the
                  administrator previously specified have on
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
                          <h1>5</h1>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="max-h-screen min-h-full ">
                    {personal?.map((item, index) => (
                      <tr key={index} className="border border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                          <>{item?.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center p-2">
                          {[1, 2, 3, 4, 5].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  "
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
                                onInvalid={(e) => {
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
            ) : (
              <>
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
                    {additional?.map((item, index) => (
                      <tr key={index} className="border border-black group">
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
                                onInvalid={(e) => {
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
                    onClick={handleSixthPage}
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

export default AdministrationForms;
