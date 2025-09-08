import { PricingTable } from "@clerk/clerk-react";
import React from "react";

const Plan = () => {
  return (
    <div className="w-full px-5 mx-auto z-20 my-32">
      <div className=" flex items-center justify-center text-center mb-5">
        <div className=" max-w-xl">
          <h1 className=" text-3xl font-semibold mb-2">Choose Your Plan</h1>
          <p>
            Start for free and scale up as you grow. Find the perfect plan for
            your content creation needs.
          </p>
        </div>
      </div>

      <div className="mt-10 w-full md:px-20 flex flex-wrap">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
