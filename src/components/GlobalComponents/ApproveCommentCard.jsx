import React from "react";
import Approve from "../../assets/approve.png";
import arrow from "../../assets/rightArrow.png";

const ApproveCommentsCard = ({
  comment,
  evaluator,
  evaluated,
  suggestion,
  editButton,
  approveClick,
  key,
}) => {
  

  return (
    <div
      className="max-w-[320px] max-h-[400px] min-w-[320px] min-h-[400px] shadow-primary shadow-md drop-shadow-sm rounded-lg p-4 bg-white "
      key={key}
    >
      <div className="cursor-pointer min-h-[350px]" onClick={editButton}>
        <div
          className="flex gap-4 justify-between items-center border-b-2 border-black max-h-[40px] text-primary min-h-[40px]"
        >
          <h1 className="font-bold text-sm">{evaluator}</h1>
          <img src={arrow} className="aspect-square h-4" alt="Arrow" />
          <h1 className="font-bold text-sm">{evaluated}</h1>
        </div>
        <div className="flex flex-col mt-4">
          <h1 className="text-lg font-semibold">Comment</h1>
          <div
            className={`rounded-lg border-[1px] border-black min-h-[100px] max-h-[100px] overflow-auto p-2 `}
          >
            {comment}
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h1 className="text-lg font-semibold">Suggestion</h1>
          <div className="rounded-lg border-[1px] border-black min-h-[100px] max-h-[100px] overflow-auto p-2">
            {suggestion}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 -translate-y-3">
        <img
          src={Approve}
          className="aspect-square h-10 cursor-pointer"
          alt="Approve"
          onClick={approveClick}
        />
      </div>
    </div>
  );
};

export default ApproveCommentsCard;
