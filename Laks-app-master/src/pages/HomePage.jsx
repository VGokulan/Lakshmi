// HomePage.js
import { Link } from "react-router-dom";
import Layout from "../Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="h-full bg-[#fefae0] rounded-3xl">
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-[40px] text-center w-full font-bold py-10 text-green-600">
            Welcome! <br /> Vickey
          </h1>
        </div>

        <div className="p-6">
          <div className="bg-white text-center py-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-semibold">Next Garbage Collection</h2>
            <p className="text-lg mt-2">Tomorrow at 8:00 AM</p>
          </div>

          <div className="mt-3 flex flex-col">
            <Link
              to="/home/events"
              className="bg-[#157f3d] text-white py-4 my-4 rounded-3xl text-center text-xl hover:bg-green-500"
            >
              Register Event
            </Link>
            <Link
              to="/home/report"
              className="bg-[#157f3d] text-white py-4 my-4 rounded-3xl text-center text-xl hover:bg-green-500"
            >
              Rport a query
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
