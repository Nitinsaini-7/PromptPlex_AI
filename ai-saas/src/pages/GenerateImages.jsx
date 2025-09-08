import { Hash, Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Realistic style",
    "Cartoon style",
    "Realistic style",
    "Fantasy style",
    "3D style",
    "Portrait style",
  ];
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style of ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        {
          prompt,
          publish,
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className=" h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <form
        onSubmit={onSubmitHandler}
        className=" w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className=" flex items-center gap-4">
          <Sparkles className=" text-blue-400" />
          AI Image Generator
        </div>
        <p className=" mt-6 text-sm font-medium">Describe your image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          rows="4"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 "
          placeholder=" Describe your image here"
          required
        />
        <p className=" mt-4 text-sm font-medium">Style</p>
        <div className=" mt-3 gap-3 flex flex-wrap sm:max-w-9/12">
          {imageStyle.map((item, index) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <div className=" my-6 flex items-center gap-2 ">
          <label className=" relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition"></div>
            <span className=" absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        <button
          disabled={loading}
          className=" w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white px-4 py-2 mt-6 cursor-pointer rounded-lg"
        >
          {loading ? (
            <span className=" w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Image className=" w-5" />
          )}
          Generate Image
        </button>
      </form>

      <div className=" w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className=" flex items-center gap-3">
          <Image className=" w-5 text-blue-400" />
          <h1> Generated Blog Title</h1>
        </div>
        {!content ? (
          <div className=" flex-1 flex justify-center items-center">
          <div className=" text-sm flex flex-col items-center gap-5 text-gray-400">
            <Image className=" w-9 " />
            <p>Enter the topic and click "Generate image" to get started</p>
          </div>
        </div>
        ):(
          <div className="mt-4 h-full">
            <img src={content} alt="image" className=" w-full h-full"/>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default GenerateImages;
