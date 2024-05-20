import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../redux/slices/Questions/getQuestionsSlice";
import { getUserList } from "../../redux/slices/User/userListSlice";
import { postEvaluation } from "../../redux/slices/Evaluation/evaluationSlice";
import { ResetEvaluatedStatus } from "../../redux/slices/Evaluation/evaluationSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Arrow from "../../assets/fast-forward-double-right-arrows-symbol.png";
import Option1 from "../GlobalComponents/Option1";
import JwtDecoder from "../../utils/JwtDecoder";
import LoadingAnimation from "../Animations/LoadingAnimation";
import Header from "../GlobalComponents/Header";

const StudentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JwtDecoder().decodedToken;
  const schoolYear = userData ? userData?.school_year : "";
  const user_id = userData ? userData?.id : "";
  const session_id = userData ? userData?.session_id : "";
  const type = "STUDENT EVALUATION OF TEACHING";
  const userType = "Teacher";
  const [firstPageRadioState, setFirstPageRadioState] = useState([]);

  // selectors
  const { data: questions, status: GetQuestionStatus } = useSelector(
    (state) => state.getQuestions
  );

  const { data: UsersData, status: UsersStatus } = useSelector(
    (state) => state.getUsers
  );

  console.log(UsersStatus);
  const { status: EvaluatedStatus } = useSelector((state) => state.evaluate);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const GoBackToEvaluationType = () => {
    navigate("/");
  };

  const handleFirstPageRadioChange = (index, value) => {
    const newState = [...firstPageRadioState];
    newState[index] = value;
    setFirstPageRadioState(newState);
  };

  const handleOnSubmit = (data) => {
    if (firstPageRadioState.some((rating) => rating === null)) {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      return;
    }

    const questionRatings = [
      ...questions?.questions?.map((item, index) => ({
        question_id: item.id,
        type: item.type,
        question_group: item?.question_group,
        evaluation_type: item?.evaluation_type,
        question_description: item.question_description,
        rating: firstPageRadioState[index],
      })),
    ];

    const teacher = UsersData?.users?.find(
      (item) => item.full_name === data.evaluated_full_name
    );

    const evaluated_id = teacher ? teacher?.id : null;

    const values = {
      ...data,
      session_id: session_id,
      user_id: user_id,
      evaluated_id: evaluated_id,
      class_size: "N/a",
      no_of_student_present: "N/a",
      no_of_student_late: "N/a",
      office_services: "N/a",
      length_of_service: "N/a",
      category: "N/a",
      gender: "N/a",
      questions: questionRatings,
    };

    dispatch(postEvaluation(values));
  };

  useEffect(() => {
    setValue("school_year", schoolYear);
    reset({ school_year: schoolYear });
  }, [schoolYear]);

  useEffect(() => {
    dispatch(getQuestions({ type: type }));
    dispatch(getUserList({ type: userType }));
  }, [dispatch]);

  useEffect(() => {
    if (EvaluatedStatus === "success") {
      reset();
      dispatch(getUserList({ type: userType }));
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      toast.success("Successfully Evaluated", {
        autoClose: 500,
        theme: "dark",
        pauseOnHover: false,
        closeOnClick: true,
      });
      dispatch(ResetEvaluatedStatus());
    }

    if (EvaluatedStatus === "fail") {
      toast.error("Please rate all questions.", {
        autoClose: 500,
        theme: "dark",
      });
    }
  }, [EvaluatedStatus]);

  useEffect(() => {
    if (EvaluatedStatus === "success" || EvaluatedStatus === "idle") {
      setFirstPageRadioState(Array(questions?.questions?.length).fill(null));
    }
  }, [EvaluatedStatus, questions]);

  return (
    <main className="min-h-screen flex flex-col pb-2 scroll-smooth  ">
      <Header />

      <section className="bg-white min-h-full p-4">
        <div className="flex items-center gap-4">
          <img
            src={Arrow}
            className="aspect-square h-7  rotate-180 cursor-pointer "
            onClick={GoBackToEvaluationType}
          />

          <h1 className="text-2xl font-bold">STUDENT EVALUATION OF TEACHING</h1>
        </div>
        <h1 className="border border-black mt-2"></h1>
        <Option1
          labelone="Poor"
          labeltwo="Adequate"
          labelthree="Good"
          labelfour="Outstanding"
        />
      </section>
      <form
        className="mt-10 p-1 lg:p-4"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="flex flex-col lg:flex-row gap-7 outline-none ">
          <TextField
            id="outlined-basic"
            label="School Year"
            variant="outlined"
            fullWidth
            autoFocus
            InputProps={{
              readOnly: true,
            }}
            {...register("school_year", { required: true })}
          />

          <FormControl fullWidth error={Boolean(errors.subject_name)}>
            <InputLabel>Subject</InputLabel>
            <Controller
              name="subject_name"
              control={control}
              rules={{ required: "Subject is required!" }}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="Subject"
                  value={field.value || ""}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  <MenuItem value="SCIENCE">SCIENCE</MenuItem>
                  <MenuItem value="MATH">MATH</MenuItem>
                  <MenuItem value="ENGLISH">ENGLISH</MenuItem>
                </Select>
              )}
            />
            {errors.subject_name && (
              <p className="text-sm text-red-600">
                {errors.subject_name.message}
              </p>
            )}
          </FormControl>
          <FormControl fullWidth error={Boolean(errors.year_level)}>
            <InputLabel>Year Level</InputLabel>
            <Controller
              name="year_level"
              control={control}
              rules={{ required: "Year Level is required!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Year Level"
                  value={field.value || ""}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  <MenuItem value="1">1st Year</MenuItem>
                  <MenuItem value="2">2nd Year</MenuItem>
                  <MenuItem value="3">3rd Year</MenuItem>
                </Select>
              )}
            />
            {errors.year_level && (
              <p className="text-sm text-red-600">
                {errors.year_level.message}
              </p>
            )}
          </FormControl>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center w-full mt-10 lg:gap-18 gap-6 ">
          <FormControl fullWidth error={Boolean(errors.strand)}>
            <InputLabel>Strand</InputLabel>
            <Controller
              name="strand"
              control={control}
              rules={{ required: "Strand is required!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Strand"
                  value={field.value || ""}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  <MenuItem value="STEM">STEM</MenuItem>
                  <MenuItem value="ABM">ABM</MenuItem>
                  <MenuItem value="GAS">GAS</MenuItem>
                </Select>
              )}
            />
            {errors.strand && (
              <p className="text-sm text-red-600">{errors.strand.message}</p>
            )}
          </FormControl>
          <FormControl fullWidth error={Boolean(errors.evaluated_full_name)}>
            <InputLabel>Teacher</InputLabel>
            <Controller
              name="evaluated_full_name"
              control={control}
              rules={{ required: "Teacher is required!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Teacher"
                  value={field.value || ""}
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                >
                  {UsersData?.users?.map((item) => (
                    <MenuItem value={item?.full_name} key={item?.id}>
                      {item?.full_name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.evaluated_full_name && (
              <p className="text-sm text-red-600">
                {errors.evaluated_full_name.message}
              </p>
            )}
          </FormControl>
          <div className="flex flex-col w-full gap-3 tablet:-translate-y-4">
            <h1 className="font-bold  after:ml-0.5  ">Semester</h1>
            <div className="flex gap-4">
              {[
                { value: "1st Semester", label: "1st Semester" },
                { value: "2nd Semester", label: "2nd Semester" },
              ].map((semester, index) => (
                <div className="flex items-center" key={index}>
                  <input
                    className=" bg-white rounded-lg py-2 w-full pl-4 cursor-pointer "
                    id={`default-radio-${index}`}
                    type="radio"
                    value={semester.value}
                    {...register("semester", {
                      required: "Semester is required!",
                    })}
                    required
                  />
                  <label
                    htmlFor={`default-radio-${index}`}
                    className="ms-2 text-sm font-medium  text-black"
                  >
                    {semester.label}
                  </label>
                </div>
              ))}
            </div>
            {errors.semester && (
              <p className="text-sm text-red-600">{errors.semester.message}</p>
            )}
          </div>
        </div>
        <div className="mt-20 ">
          <div className="relative overflow-x-hidden shadow-md sm:rounded-lg mt-10 min-w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs uppercase bg-secondary text-white border ">
                <tr>
                  <th
                    scope="col"
                    className="text-2xl px-6 py-3 border-2  border-black"
                  >
                    Question
                  </th>
                  <th className="text-2xl px-6 py-3  text-center border-2 border-black">
                    Rating
                    <div className="flex justify-between  mt-4 text-black ">
                      <h1>1</h1>
                      <h1>2</h1>
                      <h1>3</h1>
                      <h1>4</h1>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="h-screen w-screen min-h-full ">
                {GetQuestionStatus === "loading" && (
                  <div className="flex absolute justify-center inset-0 -translate-y-20">
                    <LoadingAnimation />
                  </div>
                )}
                {GetQuestionStatus === "success" && (
                  <>
                    {questions?.questions?.map((item, index) => (
                      <tr key={index} className="border-2 border-black group">
                        <td className="border border-black  text-primary p-2 group-hover:text-red-600 group-hover:font-bold max-w-52 min-w-52">
                          <> {item.question_description}</>
                        </td>
                        <td className="flex gap-1 justify-between min-w-full items-center  p-2">
                          {[1, 2, 3, 4].map((optionValue, optionIndex) => (
                            <label key={optionValue}>
                              <input
                                type="radio"
                                className="cursor-pointer  border border-black"
                                value={optionValue.toString()}
                                checked={
                                  firstPageRadioState[index] === optionValue
                                }
                                onChange={() =>
                                  handleFirstPageRadioChange(index, optionValue)
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
                  </>
                )}
              </tbody>
            </table>
            {GetQuestionStatus === "success" && (
              <div className="flex flex-col gap-4 mt-10">
                <h1 className="font-bold text-2xl">Comments/Sugestions</h1>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold ">
                      Write what you like/appreciate about the teacher and the
                      class
                    </label>
                    <TextField
                      id="outlined-multiline-static"
                      label="Comment"
                      multiline
                      error={Boolean(errors.comment)}
                      rows={4}
                      {...register("comment", { required: true })}
                      aria-invalid={errors.comment ? "true" : "false"}
                    />
                    {errors.comment?.type === "required" && (
                      <p role="alert" className="text-sm text-red-600">
                        Comment is required!
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Write your suggestions to improve the teacher and the
                      class.
                    </label>
                    <TextField
                      id="outlined-multiline-static"
                      label="Suggestion"
                      multiline
                      error={Boolean(errors.suggestion)}
                      rows={4}
                      {...register("suggestion", { required: true })}
                      aria-invalid={errors.suggestion ? "true" : "false"}
                    />
                    {errors.suggestion?.type === "required" && (
                      <p role="alert" className="text-sm text-red-600">
                        Suggestion is required!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            <button
              className="w-full  py-2 px-6 mt-10  bg-primary  text-white font-bold rounded-lg hover:opacity-95 mb-6 "
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
      <ToastContainer pauseOnHover={false} />
    </main>
  );
};

export default StudentForm;
