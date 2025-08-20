import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Predictions from "./Pages/Predictions";
import RouteAlloc from "./Pages/RouteAlloc";
import "./App.css";
import Schedules from "./Pages/Schedules";
import Announcements from "./Pages/Announcements";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/predictions" element={<Predictions />} />
      <Route path="/schedules" element={<Schedules />} />
      <Route path="/routes" element={<RouteAlloc />} />
      <Route path="/announcements" element={<Announcements />} />
    </Routes>
  );
};
export default App;
