import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalDoneEvaluation } from "../../redux/slices/Evaluation/totalDoneEvaluatedSlice";
const CardHolder = () => {
  const { data, status } = useSelector((state) => state.totalDoneEvaluated);
  const dispatch = useDispatch()
 
  useEffect(() => {
    if (status === "idle") {
      dispatch(getTotalDoneEvaluation());
    }
  }, [dispatch, status]);
  return (
    <div className="flex flex-wrap justify-around lg:justify-start gap-10">
      <div className="md:min-w-[250px] min-h-[100px] w-full md:max-w-[250px] max-h-[100px] rounded-xl shadow-primary shadow-md drop-shadow-xl border-[1px] bg-white">
        <div className="p-2">
          <h1 className="text-gray-400 text-sm font-bold">Admins</h1>
          <h1 className="text-4xl text-black font-bold text-center">{data?.admins}</h1>
        </div>
      </div>
      <div className="md:min-w-[250px] min-h-[100px] w-full md:max-w-[250px] max-h-[100px] rounded-xl shadow-primary shadow-md drop-shadow-xl border-[1px] bg-white">
        <div className="p-2">
          <h1 className="text-gray-400 text-sm font-bold">Non Teaching</h1>
          <h1 className="text-4xl text-black font-bold text-center">{data?.non_teaching}</h1>
        </div>
      </div>
      <div className="md:min-w-[250px] min-h-[100px] w-full md:max-w-[250px] max-h-[100px] rounded-xl shadow-primary shadow-md drop-shadow-xl border-[1px] bg-white">
        <div className="p-2">
          <h1 className="text-gray-400 text-sm font-bold">Students</h1>
          <h1 className="text-4xl text-black font-bold text-center">{data?.students}</h1>
        </div>
      </div>
      <div className="md:min-w-[250px] min-h-[100px] w-full md:max-w-[250px] max-h-[100px] rounded-xl shadow-primary shadow-md drop-shadow-xl border-[1px] bg-white">
        <div className="p-2">
          <h1 className="text-gray-400 text-sm font-bold">Teacher</h1>
          <h1 className="text-4xl text-black font-bold text-center">{data?.teachers}</h1>
        </div>
      </div>
    </div>
  );
};

export default CardHolder;
