import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notYetEvaluated } from "../../redux/slices/Evaluation/notYetEvaluatedSlice";
const NotYetEvaluated = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, status } = useSelector((state) => state.notYetEvaluated);

  // filter whose role is Student
  const filterNotYetEvaulatedData = data["users not Evaluated yet"]?.filter(
    (item) => item.role === "Student"
  );

  const filteredData =
    filterNotYetEvaulatedData?.filter((row) => {
      const searchFields = ["first_name", "last_name"];
      return searchFields?.some((field) =>
        (row[field] || "")
          .toLowerCase()
          .includes((searchQuery || "").toLowerCase())
      );
    }) || [];

  useEffect(() => {
    if (status === "idle") {
      dispatch(notYetEvaluated());
    }
  }, [dispatch, status]);
  return (
    <>
      <h1 className="uppercase font-bold">Students not yet evaluated</h1>
      <div className="tablet:mt-0 w-full">
        <input
          type="text"
          placeholder="First name or Last name"
          className="desktop:w-[406px] tablet:w-[270px] w-full p-2 pl-10 border border-black rounded-xl shadow-sm my-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredData?.length <= 0 ? (
        <h1 className="mt-4 text-center font-bold text-primary">
          No Data Available
        </h1>
      ) : (
        <>
          {status === "success" &&
            filteredData?.map((item) => (
              <div
                className={`min-h-10 min-w-full bg-secondary rounded-md mt-4 text-black font-bold p-2`}
              >
                {item?.last_name}, {item?.first_name}
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default NotYetEvaluated;
