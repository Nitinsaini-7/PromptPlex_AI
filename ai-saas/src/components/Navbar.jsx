import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="w-32 sm:w-44"
      />

      {user ? (
        <UserButton />
      ) : (
        <button onClick={openSignIn} className="flex gap-2 bg-primary text-white p-3 px-4 rounded-full">
          Get Started
          <ArrowRight />
        </button>
      )}
    </div>
  );
};

export default Navbar;
