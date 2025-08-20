import Layout from "../layout";
import RealTimeAnalysis from "../Components/RealTimeAnalysis";
import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading";

const Homepage = () => {
  const [topLocations, setTopLocations] = useState([]);
  const [blocs, setBlocs] = useState({});
  // Example data
  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND);
    axios.get(`${process.env.REACT_APP_BACKEND}/dashboard`).then((response) => {
      console.log(response.data);
      setBlocs(response.data.blocs);
      setTopLocations(response.data.locations);
      console.log(blocs);
      console.log(topLocations);
    });
  }, []);

  const apiKey = "AIzaSyAZUGoqEFEKNUM30vpCm4Qs1pZkeacFVsA"; // Replace with your API key
  return (
    <Layout>
      {!topLocations[0] || !blocs.bins ? (
        <Loading />
      ) : (
        <div className="flex h-full flex-col justify-evenly items-center ">
          <h1 className="text-[40px] text-left w-[90%] font-bold">Dashboard</h1>
          <div className=" min-w-[90%] h-auto grid grid-cols-4 gap-4">
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="fluent:bin-recycle-20-regular"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">{"Bins"}</p>
                  <h4 className="text-[30px] font-semibold">{blocs.bins}</h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="ph:truck-light"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">{"Trucks"}</p>
                  <h4 className="text-[30px] font-semibold">{blocs.trucs}</h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="material-symbols:event-outline"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">{"Events"}</p>
                  <h4 className="text-[30px] font-semibold">{blocs.events}</h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="lucide-lab:bowl-overflow"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">{"Overfill"}</p>
                  <h4 className="text-[30px] font-semibold">
                    {blocs.overfill}
                  </h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="clarity:fuel-line"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">{"Fuel"}</p>
                  <h4 className="text-[30px] font-semibold">{blocs.fuel}</h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="lsicon:order-done-outline"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">
                    {"Garbage Collected"}
                  </p>
                  <h4 className="text-[30px] font-semibold">
                    {blocs.garbageCollected}
                  </h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="mage:money-exchange"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">{"Costs"}</p>
                  <h4 className="text-[30px] font-semibold">
                    Rs.{blocs.costs}
                  </h4>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
              <div className="p-6 flex items-center">
                <div className="w-28 h-28 flex items-center justify-center bg-green-700 text-white rounded-3xl shadow-lg">
                  <Icon
                    icon="material-symbols-light:distance-outline-rounded"
                    width="40"
                    height="40"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="ml-10">
                  <p className="text-gray-500 text-2xl">{"Distance"}</p>
                  <h4 className="text-[30px] font-semibold">
                    {blocs.distance} KM
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* real time analysis components */}

          <RealTimeAnalysis apiKey={apiKey} topLocations={topLocations} />
        </div>
      )}
    </Layout>
  );
};
export default Homepage;
