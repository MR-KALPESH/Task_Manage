import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./Components/Page/Login";
import Register from "./Components/Page/Register";
import TaskPage from "./Components/TaskPage/TaskPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Task" element={<TaskPage />} />
      </Routes>
    </>
  );
}

export default App;
