import Calendar from "../Components/Calander";
import Layout from "../layout";
import EventTable from "../Components/EventTable";
import Loading from "../Components/Loading";
import Queries from "../Components/Queries";
import { useEffect, useState } from "react";
const Schedules = () => {
  const [events, setEvents] = useState(null);
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/schedule/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
    fetch(`${process.env.REACT_APP_BACKEND}/schedule/queries`)
      .then((res) => res.json())
      .then((data) => {
        setQueries(data);
      });
  }, []);

  return (
    <Layout>
      {!events ? (
        <Loading />
      ) : (
        <div className="w-[92%] mx-auto">
          <h1 className=" text-[40px] font-bold pt-10">Schedules</h1>
          <div className="w-full rounded-3xl py-10 flex justify-between items-center">
            <Calendar events={events} />
            <EventTable events={events} />
          </div>
          <Queries queries={queries} />
        </div>
      )}
    </Layout>
  );
};
export default Schedules;
