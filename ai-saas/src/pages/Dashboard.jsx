import { Protect } from "@clerk/clerk-react";
import { Gem, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import Creations from "../components/Creations";
import { dummyCreationData } from "../assets/assets";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className=" h-full overflow-y-scroll p-6">
      <div className=" flex justify-start gap-4 flex-wrap">
        <div className=" flex justify-between items-center w-72 p-4 bg-white rounded-2xl border border-gray-200">
          <div className=" text-slate-600 ">
            <p className=" text-sm">Total creations</p>
            <h2 className=" text-lg font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-md bg-blue-400 flex items-center justify-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active plan */}
        <div className=" flex justify-between items-center w-72 p-4 bg-white rounded-2xl border border-gray-200">
          <div className=" text-slate-600 ">
            <p className=" text-sm">Active Plan</p>
            <h2 className=" text-lg font-semibold">
              <Protect plan={"premium"} fallback="free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-md bg-red-400 flex items-center justify-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>
      <div className=" space-y-3">
        <p className=" mt-6 mb-4">Recent Creations</p>
          {
            creations.map((item)=>(
              <Creations item={item} key={item.id}/>
            ))
          }
      </div>
    </div>
  );
};

export default Dashboard;
