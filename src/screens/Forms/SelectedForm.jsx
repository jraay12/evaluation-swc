import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import JwtDecoder from "../../utils/JwtDecoder";
import StudentForm from "../../components/Forms/StudentForm";
import EvaluationForCustomer from "../../components/Forms/EvaluationForCustomer";
import TeachersEvaluation from "../../components/Forms/TeachersEvaluation";
import AdministrationForms from "../../components/Forms/AdministrationForms";
import NonTeaching from "../../components/Forms/NonTeaching";

const SelectedForm = () => {
  const userData = JwtDecoder().decodedToken;
  const role = userData ? userData?.role : "";
  const { type } = useParams();
  const navigate = useNavigate()

  // Function to check if a role is allowed for a certain type
  const isAllowed = (type, role) => {
    switch (type) {
      case "1":
        return role === "Student";
      case "2":
        return role === "Principal" || role === "Treasurer" || role ==="Registrar" || role === "Coordinator" || role === "Teacher";
      case "3":
        return role === "Principal";
      case "4":
        return role === "Principal" || role === "Treasurer" || role ==="Registrar" || role === "Coordinator";
      case "5":
        return role === "Principal" || role === "Treasurer" || role ==="Registrar" || role === "Coordinator" || role === "Non-Teaching";
      case "6":
        return role === "Student";
      default:
        return false;
    }
  };

  // Render appropriate form or NoLandingPage
  if (isAllowed(type, role)) {
    switch (type) {
      case "1":
        return <StudentForm />;
      case "2":
        return <TeachersEvaluation />;
      case "3":
        // return <ClassroomObservation />;
      case "4":
        return <AdministrationForms />;
      case "5":
        return <NonTeaching />;
      case "6":
        return <EvaluationForCustomer />;
      default:
        return null;
    }
  } 

};

export default SelectedForm;
