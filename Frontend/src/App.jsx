import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import RegistrationPage from "./components/Registrationpage";
import ProtectedRoute from "./components/ProtectedRoute";
import Sdashboard from "./components/StudentSide/Sdashboard";
import StudentD from "./components/StudentSide/Student Details/StudentD";
import ParentD from "./components/StudentSide/Student Details/ParentD";
import Internships from "./components/StudentSide/Student Details/Internships";
import authService from "./services/authService";
import PYDetails from "./components/StudentSide/Student Details/PYDetails";
import CurrentD from "./components/StudentSide/Student Details/CurrentD";
import Cocurriact from "./components/StudentSide/Student Details/Cocurriact";
import Extracurriact from "./components/StudentSide/Student Details/Extracurriact";
import CareerPath from "./components/StudentSide/Student Details/CareerPath";
import HodDashboard from "./components/HodSide/HodDashboard";
import MentorDashboard from "./components/MentorSide/MentorDashboard";
import StudentsListHod from "./components/HodSide/StudentListHod";
import HODAnnouncementPage from "./components/HodSide/HODAnnouncementpage";
import ChatPage from "./components/MentorSide/ChatPage";
import StudentList from "./components/MentorSide/StudentList";
import Notifications from "./components/MentorSide/Notifications";
import Internship from "./components/MentorSide/Internships";
import Download from "./components/MentorSide/Download";
import StudentDetail from "./components/MentorSide/StudentDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            authService.getCurrentUser() ? (
              authService.getUser() == 1 ? (
                <Sdashboard />
              ) : authService.getUser() == 2 ? (
                <MentorDashboard />
              ) : authService.getUser() == 3 ? (
                <HodDashboard />
              ) : (
                <Login /> // Default fallback if no matching role is found
              )
            ) : (
              <Login />
            )
          }
        />

        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/sdashboard"
          element={authService.getCurrentUser() ? <Sdashboard /> : <Login />}
        />
        <Route
          path="/studentd"
          element={authService.getCurrentUser() ? <StudentD /> : <Login />}
        />
        <Route
          path="/parentd"
          element={authService.getCurrentUser() ? <ParentD /> : <Login />}
        />
        <Route
          path="/internships"
          element={authService.getCurrentUser() ? <Internships /> : <Login />}
        />
        <Route
          path="/pydetails"
          element={authService.getCurrentUser() ? <PYDetails /> : <Login />}
        />
        <Route
          path="/currentd"
          element={authService.getCurrentUser() ? <CurrentD /> : <Login />}
        />
        <Route
          path="/cocurriact"
          element={authService.getCurrentUser() ? <Cocurriact /> : <Login />}
        />
        <Route
          path="/extracurriact"
          element={authService.getCurrentUser() ? <Extracurriact /> : <Login />}
        />
        <Route
          path="/careerpath"
          element={authService.getCurrentUser() ? <CareerPath /> : <Login />}
        />
        <Route
          path="/studentlisthod"
          element={
            authService.getCurrentUser() ? <StudentsListHod /> : <Login />
          }
        />
        <Route
          path="/news"
          element={
            authService.getCurrentUser() ? <HODAnnouncementPage /> : <Login />
          }
        />

        <Route path="/chat" element={<ChatPage />} />
        <Route path="/student" element={<StudentList />} />
        <Route path="/students/:collegeId" element={<StudentDetail />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/intern" element={<Internship />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </Router>
  );
}

export default App;
