import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen ">
      <div className=" text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mx-auto max-w-4xl">
          Create Amazing Content with{" "}
          <span className="bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
            PromptPlex
          </span>
        </h1>
        <p className="mt-4 max-w-3xl m-auto text-lg sm:text-xl md:text-2xl">
          Create stunning articles, posts and designs with AI that understands
          your vision and brings it to life instantly.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-sm mt-5">
        <button
          onClick={() => navigate("/ai")}
          className="bg-gradient-to-r from-primary to-sky-500 text-white p-3 px-20 text-lg rounded-full"
        >
          Starting now
        </button>

      </div>

    </div>
  );
};

export default Hero;
