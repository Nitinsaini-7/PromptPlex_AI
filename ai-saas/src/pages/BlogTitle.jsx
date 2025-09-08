import { Edit, Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitle = () => {
  const blogCategories = [
    "General",
    "technology",
    "Business",
    "Health",
    "Lifestyle",
    "Travel",
    "Education",
    "Food",
  ];
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a creative blog title on the topic ${input} in the category of ${selectedCategory}`;
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
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
          AI Title Generator
        </div>
        <p className=" mt-6 text-sm font-medium">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 "
          placeholder="the future artical"
          required
        />
        <p className=" mt-4 text-sm font-medium">Category</p>
        <div className=" mt-3 gap-3 flex flex-wrap sm:max-w-9/12">
          {blogCategories.map((item, index) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              }`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button
          disabled={loading}
          className=" w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 mt-6 cursor-pointer rounded-lg"
        >
          {loading ? (
            <span className=" w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Hash className=" w-5" />
          )}
          Generate Blog Title
        </button>
      </form>

      <div className=" w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className=" flex items-center gap-3">
          <Hash className=" w-5 text-blue-400" />
          <h1> Generated Blog Title</h1>
        </div>
        {!content ? (
          <div className=" flex-1 flex justify-center items-center">
            <div className=" text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className=" w-9 " />
              <p>Enter the topic and click Generate Blog Title</p>
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

export default BlogTitle;
