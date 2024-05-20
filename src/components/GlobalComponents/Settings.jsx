import React from "react";
import Header from "./Header";
import Arrow from "../../assets/fast-forward-double-right-arrows-symbol.png";
import Avatar from "../../assets/Avatar.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SettingsInputs from "./SettingsInputs";

const Settings = () => {
  const navigate = useNavigate();

  // selectors
  const { data: UserInformationData, status: UserInformationStatus } =
    useSelector((state) => state.userInformation);

  return (
    <div className="flex flex-col  min-h-screen bg-backgroundColor overflow-hidden">
      <Header />
      <div className="flex mt-2 translate-x-10 gap-2 mb-4">
        <img
          src={Arrow}
          className="aspect-square w-7 rotate-180 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className=" text-2xl font-playfair font-bold ">Settings</h1>
      </div>
      <h1 className="border border-black mx-10"></h1>
      <div className="flex flex-col lg:flex-row justify-center items-center p-6 flex-1 gap-20">
        <div className="flex flex-col justify-center items-center min-h-[500px] lg:max-w-[400px] w-full rounded-2xl flex-1 bg-secondary text-white ">
          <img src={Avatar} className="aspect-square h-40" />
         
            <div className="flex flex-col w-full justify-start p-10 gap-10">
              <div className="border py-2 p-2 rounded-lg border-black bg-white text-black">
                <h1 className="text-xl font-bold">
                  Firstname: {UserInformationData?.data?.first_name}
                </h1>
              </div>
              <div className="border py-2 p-2 rounded-lg border-black bg-white text-black">
                <h1 className="text-xl font-bold">
                  Last Name: {UserInformationData?.data?.last_name}
                </h1>
              </div>
              <div className="border py-2 p-2 rounded-lg border-black bg-white text-black">
                <h1 className="text-xl font-bold">
                  Email: {UserInformationData?.data?.email}
                </h1>
              </div>
            </div>
          
        </div>
        <SettingsInputs />
      </div>
    </div>
  );
};

export default Settings;
