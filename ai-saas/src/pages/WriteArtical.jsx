import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArtical = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words" },
    { length: 1200, text: "Medium (800-1200 words" },
    { length: 1600, text: "Long (1500+ words" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write a article on the topic ${input} in ${selectedLength.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
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
          Artical Configuration
        </div>
        <p className=" mt-6 text-sm font-medium">Artical topics</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 "
          placeholder="the future artical"
          required
        />
        <p className=" mt-4 text-sm font-medium">Article Len</p>
        <div className=" mt-3 gap-3 flex flex-wrap sm:max-w-9/12">
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.text === item.text
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />
        <button
          disabled={loading}
          className=" w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 mt-6 cursor-pointer rounded-lg"
        >
          {loading ? (
            <span className=" w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Edit className=" w-5" />
          )}
          Generate Article
        </button>
      </form>

      <div className=" w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className=" flex items-center gap-3">
          <Edit className=" w-5 text-blue-400" />
          <h1> Generated Article</h1>
        </div>
        {!content ? (
          <div className=" flex-1 flex justify-center items-center">
            <div className=" text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className=" w-9 " />
              <p>Enter the topic</p>
            </div>
          </div>
        ) : (
          <div className=" flex-1 overflow-y-auto text-sm text-gray-700 whitespace-pre-line">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArtical;
