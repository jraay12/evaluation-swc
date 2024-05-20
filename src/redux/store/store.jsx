import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/Auth/loginSlice";
import forgotPasswordReducer from "../slices/Auth/forgotPasswordSlice";
import userInformationReducer from "../slices/User/userInformationSlice";
import userUpdateInformationReducer from "../slices/User/userUpdateInformationSlice";
import userChangePasswordReducer from "../slices/User/userChangePasswordSlice";
import userUpdateEmailReducer from "../slices/User/userUpdateEmailSlice";
import getQuestionsReducer from "../slices/Questions/getQuestionsSlice";
import userListReducer from "../slices/User/userListSlice";
import evaluationReducer from "../slices/Evaluation/evaluationSlice";
import officeListReducer from "../slices/OfficeList/officeListSlice";
import getApprovedCommentsReducer from "../slices/Comments/getApprovedCommentsSlice";
import pieChartReducer from "../slices/Charts/pieChartSlice";
import masterListReducer from "../slices/MasterList/masterListSlice";
import notYetEvaluatedReducer from "../slices/Evaluation/notYetEvaluatedSlice";
import totalDoneEvaluatedReducer from "../slices/Evaluation/totalDoneEvaluatedSlice";
import approveAllReducer from "../slices/Approved/approveAllSlice";
import updateCommentReducer from "../slices/Approved/updateCommentSlice";
import recentCommentReducer from "../slices/Approved/recentCommentSlice";
import individualApprovedReducer from "../slices/Approved/individualApprovedSlice";
import pendingApproveReducer from "../slices/Approved/pendingApproveSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    forgotPassword: forgotPasswordReducer,
    userInformation: userInformationReducer,
    updateUserInformation: userUpdateInformationReducer,
    changePassword: userChangePasswordReducer,
    updateEmail: userUpdateEmailReducer,
    getQuestions: getQuestionsReducer,
    getUsers: userListReducer,
    evaluate: evaluationReducer,
    officeList: officeListReducer,
    approveComments: getApprovedCommentsReducer,
    pieChart: pieChartReducer,
    masterlist: masterListReducer,
    notYetEvaluated: notYetEvaluatedReducer,
    totalDoneEvaluated: totalDoneEvaluatedReducer,
    approveAll: approveAllReducer,
    updateComment: updateCommentReducer,
    recentComment : recentCommentReducer,
    individualApprove : individualApprovedReducer,
    pendingApprove : pendingApproveReducer
  },
});

export default store;
