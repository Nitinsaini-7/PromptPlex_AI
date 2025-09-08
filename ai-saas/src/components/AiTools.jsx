import React from "react";
import { AiToolsData } from "../assets/assets";
import { Link } from "react-router-dom";

const AiTools = () => {
  return (
    <div className="px-5 md:px-10">
      <div className=" flex items-center justify-center text-center mb-5">
        <div className=" max-w-xl">
          <h1 className=" text-3xl font-semibold mb-2">Smart AI Tools</h1>
          <p>
            Create, enhance and optimize content seamlessly with cutting-edge AI
            designed to boost creativity and productivity.
          </p>
        </div>
      </div>
      <div className=" grid md:grid-cols-3 gap-10">
        {AiToolsData.map((item, index) => (
          <Link to={"ai"} key={index} className=" border-gray-200 rounded-xl hover:scale-105 cursor-pointer duration-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)] p-8">
            <item.Icon
              className=" w-12 h-12 text-white p-3 rounded-full"
              style={{
                background: `linear-gradient(to bottom, ${item.bg.from}, ${item.bg.to})`,
              }}
            />

            <div className=" mt-2">
              <h1 className=" text-lg font-semibold">{item.title}</h1>
              <p className=" text-sm text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
