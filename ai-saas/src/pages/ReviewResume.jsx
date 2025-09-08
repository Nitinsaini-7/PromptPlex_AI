import { useAuth } from "@clerk/clerk-react";
import { File, FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
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
          <h1>Resume Review</h1>
        </div>
        <p className=" mt-6 text-sm font-medium">Uplaod Resume</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="application/pdf"
          type="file"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 "
          required
        />
        <p className=" text-sm text-gray-400">Support pdf resume only</p>

        <button
          disabled={loading}
          className=" w-full flex justify-center items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-2 mt-6 cursor-pointer rounded-lg"
        >
          {loading ? (
            <span className=" w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <FileText className=" w-5" />
          )}
          Review Resume
        </button>
      </form>

      <div className=" w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className=" flex items-center gap-3">
          <FileText className=" w-5 text-blue-400" />
          <h1>Analysis result</h1>
        </div>
        {!content ? (
          <div className=" flex-1 flex justify-center items-center">
            <div className=" text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className=" w-9 " />
              <p>Upload an resume and click "Review Resume" to get started</p>
            </div>
          </div>
        ) : (
          <div className=" mt-3 h-full overflow-y-scroll text-sm">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
