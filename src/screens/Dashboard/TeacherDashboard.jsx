import React, { useEffect, useState } from "react";
import Header from "../../components/GlobalComponents/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedComments } from "../../redux/slices/Comments/getApprovedCommentsSlice";
import { pieChart } from "../../redux/slices/Charts/pieChartSlice";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PieCharts from "../../components/Charts/PieChart";
import JwtDecoder from "../../utils/JwtDecoder";
import LoadingAnimation from "../../components/Animations/LoadingAnimation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TeacherDashboard = () => {
  // initialize redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Initialize useStates
  const [pieChartChoices, setPieChartChoices] = useState(
    "STUDENT EVALUATION OF TEACHING"
  );
  const [choices, setChoices] = useState("Comments");

  // decode the token
  const userData = JwtDecoder().decodedToken;
  const id = userData ? userData?.id : "";
  const role = userData ? userData?.role : "";
  // selectors
  const { data: approvedCommentsData, status: ApproveCommentStatus } =
    useSelector((state) => state.approveComments);

  const { data: pieChartData, status: piechartLoading } = useSelector(
    (state) => state.pieChart
  );

  //function for extracting values for peichart
  const extractValues = (data) => {
    return data?.pie_chart?.map((item) => ({
      values: [
        parseInt(item["1"], 10),
        parseInt(item["2"], 10),
        parseInt(item["3"], 10),
        parseInt(item["4"], 10),
      ],
      question: item?.question_description,
      type: item?.type,
      overallRating: item.overall_rating_score,
    }));
  };
  const chartData = extractValues(pieChartData);

  // function that handle changing in pie chart depends on the form
  const handleChange = (event) => {
    setPieChartChoices(event.target.value);
  };

  // function that handle greetings
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const openEvaluation = () => {
    navigate("Evaluation-type");
  };

  useEffect(() => {
    if (role === "Non-Teaching") {
      setPieChartChoices("EVALUATION INSTRUMENT FOR NON-TEACHING");
    }
  }, [role, pieChartChoices]);

  console.log(pieChartChoices);
  //handle fetching data from redux
  useEffect(() => {
    if (userData) {
      dispatch(pieChart({ id: id, type: pieChartChoices }));
    }
  }, [dispatch, userData, pieChartChoices]);

  useEffect(() => {
    if (ApproveCommentStatus === "idle" && id) {
      dispatch(getApprovedComments({ id: id }));
    }
  }, [ApproveCommentStatus, dispatch, id]);

  return (
    <div className="flex flex-col min-h-screen bg-backgroundColor">
      <Header />
      <div className="p-4 flex-1 max-w-full">
        <h1 className="text-xl font-bold ">
          {getGreeting()}, {role}
        </h1>
        <h1 className="border border-black mt-2"></h1>
        <div className="flex justify-start gap-4">
          <button
            className="mt-4 px-7 py-2 bg-secondary text-black font-bold rounded-xl border-[1px] border-black hover:bg-black hover:text-white duration-100 ease-in"
            onClick={openEvaluation}
          >
            Evaluate
          </button>
        </div>
        <div className="flex flex-col lg:flex-row min-h-screen mt-2 mx-auto container p-2 gap-4">
          <div className="flex flex-col  lg:min-h-screen bg-white flex-1 lg:max-w-[80%] p-4 lg:p-14 rounded-xl">
            <div className="flex justify-center items-center shadow-lg bg-secondary border  shadow-primary drop-shadow-lg rounded-md text-white min-w-full min-h-[70px] max-h-[70px] p-4">
              <h1 className="font-bold text-2xl">
                {piechartLoading === "loading" && <LoadingAnimation />}
                {piechartLoading === "success" && (
                  <h1 className="uppercase text-black">
                    {role} OVERALL RATING RESULT :{" "}
                    {pieChartData?.average_overall_rating_score}
                  </h1>
                )}
                {piechartLoading === "fail" && <h1>No Data Available</h1>}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-20 mb-4 ">
              <h1 className="uppercase font-bold ">Pie Charts</h1>
              {role === "Non-Teaching" ? (
                ""
              ) : (
                <>
                  <div className="w-80">
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={pieChartChoices}
                        label="Type"
                        size="small"
                        onChange={handleChange}
                      >
                        <MenuItem value="STUDENT EVALUATION OF TEACHING">
                          Students
                        </MenuItem>
                        <MenuItem value="EVALUATION OF TEACHERS PERFORMANCE">
                          Co Workers
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </>
              )}
            </div>
            <div className="bg-white ">
              <div className="flex flex-auto max-h-screen  min-h-[400px]  relative pb-10 bg-white gap-6 overflow-auto p-1 rounded-lg border ">
                {piechartLoading === "loading" ? (
                  <div className="flex inset-0 justify-center  absolute ">
                    <LoadingAnimation />
                  </div>
                ) : (
                  <>
                    {pieChartData?.length <= 0 || pieChartData === undefined ? (
                      <h1 className="mx-auto mt-10 font-bold text-2xl">
                        No Data Available
                      </h1>
                    ) : (
                      <>
                        <Swiper
                          navigation={true}
                          modules={[Navigation, Pagination]}
                          style={{ width: "100%" }}
                          pagination={{
                            type: "progressbar",
                          }}
                          slidesPerView={1}
                          centeredSlides={false} // Center active slide
                          parallax={true}
                          breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },

                            1440: { slidesPerView: 3 },
                          }}
                          className="max-h-[400px] min-h-[400px]"
                        >
                          {chartData?.map((data, index) => (
                            <SwiperSlide
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                
                              }}
                            >
                              <div className="flex flex-col items-center max-h-[350px] select-none w-full bg-white min-h-[350px] md:max-w-60  lg:min-w-60 drop-shadow-xl shadow-primary shadow-md rounded-lg p-2  overflow-auto">
                                <PieCharts data={data?.values} />
                                <h1 className="text-primary font-bold uppercase">
                                  Rating per question: {data?.overallRating}
                                </h1>
                                <h1 className="text-sm text-center  text-primary max-h-20 min-h-20 mt-4 font-semibold">
                                  {data?.question}
                                </h1>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="lg:w-[20%] bg-white shadow-md shadow-primary p-4 max-h-screen min-h-screen overflow-auto rounded-xl">
            <div className="flex flex-col  gap-4">
              <div className="flex gap-2 ">
                <div className=" min-w-[50px] max-w-[50px] py-2 bg-primary "></div>
                <h1 className="text-xs font-bold">
                  {role === "Non-Teaching" ? "Co Worker" : "Student"}
                </h1>
              </div>
              <div className="flex gap-2 ">
                <div className=" min-w-[50px] max-w-[50px] py-2 bg-tertiary inline-block"></div>
                <h1 className="text-xs font-bold">
                  {role === "Non-Teaching" ? "Admins" : "Co Worker"}
                </h1>
              </div>
            </div>

            <header className="flex items-center justify-between  text-black text-sm mt-3 ">
              <select
                id="adminDropdown"
                name="adminDropDown"
                className=" outline-none hover:cursor-pointer rounded-lg w-full h-10"
                value={choices}
                onChange={(e) => setChoices(e.target.value)}
              >
                <option value="Comments">Comments</option>
                <option value="Suggestions">Suggestion</option>
              </select>
            </header>
            {approvedCommentsData["Comments & Suggestion Approved"]?.length <=
            0 ? (
              <h1 className="mt-10 text-center font-bold">
                No Comments or Suggestion Available
              </h1>
            ) : (
              <>
                {approvedCommentsData["Comments & Suggestion Approved"]?.map(
                  (item) => (
                    <div key={item?.id}>
                      {choices === "Comments" ? (
                        <div
                          className={`${
                            item?.evaluator_role === "Student" ||
                            item?.evaluator_role === "Non-Teaching"
                              ? "bg-primary text-white"
                              : "bg-tertiary"
                          } text-black border-2 border-black p-4  rounded-lg mt-4 max-h-[200px] overflow-auto font-bold text-[12px]`}
                        >
                          {item?.comment}
                        </div>
                      ) : (
                        <div
                          className={`${
                            (item?.suggestion === "N/A" ||
                              item?.suggestion === "N/a") &&
                            "hidden"
                          } ${
                            item?.evaluator_role === "Student" ||
                            item?.evaluator_role === "Non-Teaching"
                              ? "bg-primary text-white"
                              : "bg-tertiary"
                          } text-black border-2 border-black p-4 rounded-lg mt-4 max-h-[200px] overflow-auto font-bold text-[12px]`}
                        >
                          {item?.suggestion}
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
