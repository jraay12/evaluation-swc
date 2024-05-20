import React, { useEffect, useState } from "react";
import Header from "../../components/GlobalComponents/Header";
import { useNavigate } from "react-router-dom";
import JwtDecoder from "../../utils/JwtDecoder";
import Table from "../../components/Table/Table";
import PieCharts from "../../components/Charts/PieChart";
import LoadingAnimation from "../../components/Animations/LoadingAnimation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { pieChart } from "../../redux/slices/Charts/pieChartSlice";
import { getApprovedComments } from "../../redux/slices/Comments/getApprovedCommentsSlice";
import CardHolder from "../../components/GlobalComponents/CardHolder";
import NotYetEvaluated from "../../components/GlobalComponents/NotYetEvaluated";

const AdminDashboard = () => {
  // initialize redux
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const type = "ADMINISTRATORS EVALUATION";
  // decode the JWT Token
  const userData = JwtDecoder().decodedToken;
  const id = userData ? userData?.id : "";
  const role = userData ? userData.role : " ";

  // usestates
  const [overallRatingRole, setOverallRatingRole] = useState("Teacher");
  const [isOpen, setIsOpen] = useState(false);

  // Selectors
  const { data: pieChartData, status: pieChartLoading } = useSelector(
    (state) => state.pieChart
  );
  const { data: approvedCommentsData, status: ApproveCommentStatus } =
    useSelector((state) => state.approveComments);

  // extract values from pie charts
  const extractValues = (data) => {
    return data?.pie_chart?.map((item) => ({
      values: [
        parseInt(item["1"], 10),
        parseInt(item["2"], 10),
        parseInt(item["3"], 10),
        parseInt(item["4"], 10),
        parseInt(item["5"], 10),
      ],
      question: item?.question_description,
      type: item?.type,
      overallRating: item.overall_rating_score,
    }));
  };
  const chartData = extractValues(pieChartData);

  // Greeting function (e.x Goodmorning)
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

  // handle for setting Form Type
  const hanldeOverallRatingRole = (event) => setFormType(event.target.value);

  // open modal for office services
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // navigate to evaluation type url
  const openEvaluation = () => navigate("/evaluation-type");

  // for fetching datas in redux store
  useEffect(() => {
    if (ApproveCommentStatus === "idle" && id) {
      dispatch(getApprovedComments({ id: id }));
    }

    if (pieChartLoading === "idle" && id){
      dispatch(pieChart({ id: id, type: type }));
    }
  }, [ApproveCommentStatus, dispatch, id, pieChartLoading]);

 
  return (
    <div
      className={`flex  flex-col min-h-screen bg-backgroundColor pb-10 ${
        isOpen && "max-h-screen overflow-hidden"
      }`}
    >
      <Header />
      <section className="p-4 max-w-full mb-4">
        <h1 className="text-xl font-bold ">
          {getGreeting()}, {role}
        </h1>
        <h1 className="border border-black mt-2"></h1>
        <div className="flex justify-start gap-4 max-w-full"></div>
      </section>
      <section className=" container w-full mx-auto min-h-screen px-4">
        <div className="flex gap-4">
          <button
            className="mt-4 px-7 py-2 mb-4 bg-primary text-white font-bold  rounded-xl  duration-100 ease-in"
            onClick={openEvaluation}
          >
            Evaluate
          </button>
          <button
            className="mt-4 px-7 py-2 mb-4 bg-tertiary text-black font-bold  rounded-xl  duration-100 ease-in"
            onClick={openModal}
            disabled
          >
            Office Services
          </button>
        </div>
        <CardHolder />
        <div className="flex flex-col lg:flex-row gap-10 mt-10 mb-10 ">
          <div className=" flex flex-col gap-10 flex-1 h-max overflow-x-auto overflow-y-hidden  rounded-lg bg-white lg:p-10 shadow-md shadow-primary drop-shadow-2xl p-4 md:p-0">
            <div className="flex justify-center items-center shadow-md bg-secondary border shadow-primary drop-shadow-lg rounded-md min-w-full min-h-[70px] max-h-[70px] p-4">
              {/* <BarGraph />
              <LineGraph /> */}
              <div className="font-bold text-2xl text-white">
                <h1 className="font-bold text-2xl">
                  {pieChartLoading === "loading" && <LoadingAnimation />}
                  {pieChartLoading === "success" && (
                    <h1 className="uppercase text-black">
                      {role} OVERALL RATING RESULT :{" "}
                      {pieChartData?.average_overall_rating_score}
                    </h1>
                  )}
                  {pieChartLoading === "fail" && <h1>No Data Available</h1>}
                </h1>
              </div>
            </div>

            <div>
              <Table />
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-start md:justify-between min-w-full mb-4 md:mb-0">
                <h1 className="my-2 font-bold  text-2xl">Overall Rating</h1>
                <div className="w-full md:max-w-96">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Overall Rating Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={overallRatingRole}
                      size="small"
                      label="Overall Rating Role"
                      onChange={hanldeOverallRatingRole}
                    >
                      <MenuItem value="Teacher">Teacher</MenuItem>
                      <MenuItem value="Non-Teacher">Non Teaching</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="border-2 border-black"></div>
              {/* <OverallRatingTable type={formType} /> */}
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-col md:justify-evenly lg:justify-start  gap-10">
            <div className="shadow-md  shadow-primary drop-shadow-xl min-w-[300px] min-h-[400px] md:min-h-screen lg:min-h-[400px] lg:max-h-[400px] overflow-auto bg-white  rounded-lg p-4">
              <h1 className="text-center font-bold">Comments</h1>
              {approvedCommentsData["Comments & Suggestion Approved"]?.length <=
              0 ? (
                <h1 className="mt-10 text-center font-bold">
                  No Comments or Suggestion Available
                </h1>
              ) : (
                <>
                  {approvedCommentsData["Comments & Suggestion Approved"]?.map(
                    (item) => (
                      <div>
                        <div className=" border-2 border-black p-4 bg-primary text-white rounded-lg mt-4 max-h-[200px] overflow-auto font-bold text-[12px]">
                          {item?.comment}
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            </div>
            <div className="shadow-md  shadow-primary drop-shadow-xl lg:flex-1 min-w-[300px]  lg:max-h-[600px] overflow-auto bg-white rounded-lg p-4">
              <NotYetEvaluated />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-14 mb-4">
          <h1 className="uppercase font-bold ">Pie Charts</h1>
        </div>
        <div className="bg-white ">
          <div className="flex flex-auto max-h-screen  min-h-[400px]  relative pb-10 bg-white gap-6 overflow-auto p-10 rounded-lg border ">
            {pieChartLoading === "loading" ? (
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
                      style={{
                        width: "100%",
                      
                      }}
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

                        1440: { slidesPerView: 4 },
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
                          <div className="flex flex-col items-center max-h-[350px] select-none w-full bg-white min-h-[350px] md:max-w-60 min-w-60 drop-shadow-xl shadow-primary shadow-md rounded-lg p-2  overflow-auto">
                            <PieCharts data={data?.values} />
                            <h1 className="text-primary font-bold uppercase text-center">
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
      </section>
      {/* {isOpen && <Modal closemodal={closeModal} />} */}
    </div>
  );
};

export default AdminDashboard;
