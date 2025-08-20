import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Loading from "../Components/Loading";
import VehicleMap from "../Components/VehicleMap";

const RouteAlloc = ({ densityGraph }) => {
  const [selected, setSelected] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/routes/api/run_allocation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selected_date: "01-01-2021" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        data.forEach((item) => {
          setVehicles((prev) => [...prev, item.vehicle_id]);
        });
      });
    console.log(vehicles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {!data[0] || !vehicles[0] ? (
        <Loading />
      ) : (
        <div className=" flex flex-col h-full mx-auto p-4 w-[92%]">
          <h1 className=" text-[40px] font-bold py-10">Route Allocations</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {/* Left Column with Predicted Garbage and Graphs */}

            {/* Right Column with Locations and Garbage Info */}
            <div className="space-y-4">
              {/* Locations List */}
              <div className="bg-white shadow-md rounded-3xl p-10">
                <h5 className="text-3xl font-bold mb-4">Vehicles</h5>
                <div className="h-[400px] overflow-y-auto">
                  <table className="w-full text-left text-xl border">
                    <tbody id="locations-table">
                      {vehicles.map((vehicle, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-100 cursor-pointer h-16 ${
                            data[selected].vehicle_id === vehicle
                              ? "bg-gray-200"
                              : ""
                          }`}
                          onClick={() => setSelected(index)}
                        >
                          <td className="py-2 border-b p-10">{vehicle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Overall Garbage Info */}
              <div className="bg-white h-[190px] shadow-md rounded-3xl p-6">
                <h5 className="text-3xl font-bold mb-4">
                  Assigned districts for Vehicle {selected + 1} :
                </h5>
                <div className="h-auto overflow-y-auto">
                  <table className="w-full text-left text-xl border">
                    <tbody id="locations-table">
                      {data[selected].assigned_districts.map((ass, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-100 cursor-pointer h-16 `}
                        >
                          <td className="py-2 border-b p-10">{ass}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div
                className="bg-white h-[700px] shadow-md rounded-3xl p-10 mb-4"
                id="predg"
              >
                <h5 className="text-3xl font-bold mb-4">
                  Optimal map route for vehicle {selected + 1} :
                </h5>
                <div className="mt-20">
                  <VehicleMap
                    vehicleName={data[selected].vehicle_id}
                    checkpoints={data[selected].assigned_districts}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RouteAlloc;
