import React from "react";
import { Route, Routes } from "react-router-dom";
import TeacherDashboard from "../screens/Dashboard/TeacherDashboard";
import SuperiorDashboard from "../screens/Dashboard/SuperiorDashboard";
import Settings from "../components/GlobalComponents/Settings";
import EvaluationType from "../screens/Forms/EvaluationType";
import SelectedForm from "../screens/Forms/SelectedForm";
import ApproveDashboard from "../screens/Dashboard/ApprovedDashboard";
const ProtectedRoutes = ({ roles }) => {
  return (
    <Routes>
      {roles === "Student" && (
        <>
          <Route path="/" element={<EvaluationType />} />
          <Route path="/evaluation-form/:type" element={<SelectedForm />} />
        </>
      )}
      {roles === "Teacher" && (
        <>
          <Route path="/Evaluation-type" element={<EvaluationType />} />
          <Route path="/evaluation-form/:type" element={<SelectedForm />} />
          <Route path="/" element={<TeacherDashboard />} />
        </>
      )}
      {roles === "Non-Teaching" && (
        <>
          <Route path="/Evaluation-type" element={<EvaluationType />} />
          <Route path="/evaluation-form/:type" element={<SelectedForm />} />
          <Route path="/" element={<TeacherDashboard />} />
        </>
      )}
      {(roles === "Principal" ||
        roles === "Registrar" ||
        roles === "Coordinator" ||
        roles === "Treasurer") && (
        <>
          <Route path="/" element={<SuperiorDashboard />} />
          <Route path="/Evaluation-type" element={<EvaluationType />} />
          <Route path="/evaluation-form/:type" element={<SelectedForm />} />
        </>
      )}
      {roles === "SpecialAdmin" && (
        <>
          <Route path="/" element={<ApproveDashboard />}></Route>
        </>
      )}
      <Route path="/Settings" element={<Settings />} />
    </Routes>
  );
};

export default ProtectedRoutes;
