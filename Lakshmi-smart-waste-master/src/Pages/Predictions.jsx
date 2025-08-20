import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Loading from "../Components/Loading";

const Predictions = ({ densityGraph }) => {
  const [mainGraph, setMainGraph] = useState(null);
  const [locations, setLocations] = useState([]);
  const [activeLocation, setActiveLocation] = useState(null);
  const [updatedGraph, setUpdatedGraph] = useState(densityGraph);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/predictions/get`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatedGraph(data.density_graph);
        setLocations(data.locations);
        setMainGraph(data.main_graph);
        setActiveLocation(data.locations[0]);
      });
  }, []);
  // Function to update the graph based on selected location
  const updateGraph = (location) => {
    setActiveLocation(location);

    fetch(`${process.env.REACT_APP_BACKEND}/predictions/update/${location}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatedGraph(data.density_graph);
      })
      .catch((error) => console.error("Error updating graph:", error));
  };

  return (
    <Layout>
      {!mainGraph || !locations[0] || !activeLocation || !updateGraph ? (
        <Loading />
      ) : (
        <div className=" flex flex-col h-full mx-auto p-4 w-[92%]">
          <h1 className=" text-[40px] font-bold py-10">Predictions</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {/* Left Column with Predicted Garbage and Graphs */}
            <div className="md:col-span-2">
              <div
                className="bg-white shadow-md rounded-3xl p-10 mb-4"
                id="predg"
              >
                <h5 className="text-3xl font-bold mb-4">
                  Predicted Garbage For 7 Days
                </h5>
                <img
                  id="density-graph"
                  src={`data:image/png;base64,${updatedGraph}`}
                  alt="Density Graph"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Right Column with Locations and Garbage Info */}
            <div className="space-y-4">
              {/* Locations List */}
              <div className="bg-white shadow-md rounded-3xl p-10">
                <h5 className="text-3xl font-bold mb-4">Locations</h5>
                <div className="h-[223.5px] overflow-y-auto">
                  <table className="w-full text-left text-xl border">
                    <tbody id="locations-table">
                      {locations.map((location, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-100 cursor-pointer h-16 ${
                            activeLocation === location ? "bg-gray-200" : ""
                          }`}
                          onClick={() => updateGraph(location)}
                        >
                          <td className="py-2 border-b p-10">{location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Overall Garbage Info */}
              <div className="bg-white shadow-md rounded-3xl p-6">
                <h5 className="text-3xl font-bold mb-4">Overall Garbage</h5>
                <img
                  id="main-graph"
                  src={`data:image/png;base64,${mainGraph}`}
                  alt="Main Graph"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Predictions;
