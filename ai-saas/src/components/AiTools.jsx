import React from "react";
import { AiToolsData } from "../assets/assets";

const AiTools = () => {
  return (
    <div className="px-10">
      <div className=" flex items-center justify-center text-center mb-5">
        <div className=" max-w-xl">
          <h1 className=" text-3xl font-semibold mb-2">Smart AI Tools</h1>
          <p>
            Create, enhance and optimize content seamlessly with cutting-edge AI
            designed to boost creativity and productivity.
          </p>
        </div>
      </div>
      <div className=" grid md:grid-cols-4 gap-5">
        {AiToolsData.map((item, index) => (
          <div key={index} className=" border-gray-200 border  p-5">
            <item.Icon
              className=" w-10 h-10 text-white p-2 rounded-full"
              style={{
                background: `linear-gradient(to bottom, ${item.bg.from}, ${item.bg.to})`,
              }}
            />

            <div className=" mt-2">
              <h1 className=" text-lg font-semibold">{item.title}</h1>
              <p className=" text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
