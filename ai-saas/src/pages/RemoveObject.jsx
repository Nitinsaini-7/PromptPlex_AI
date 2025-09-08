import { useAuth } from "@clerk/clerk-react";
import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (object.split(" ").length > 1) {
        return toast.error("Please provide only one object name");
      }
      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
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
          <h1>Object Removal</h1>
        </div>
        <p className=" mt-6 text-sm font-medium">Uplaod Image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="image/*"
          type="file"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 "
          required
        />
        <p className=" mt-6 text-sm font-medium">
          Describe object name to remove
        </p>

        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          type="text"
          rows="4"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-200 "
          placeholder="e.g., watch or spoon, only one object"
          required
        />

        <button
          disabled={loading}
          className=" w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-500 to-sky-500 text-white px-4 py-2 mt-6 cursor-pointer rounded-lg"
        >
          {loading ? (
            <span className=" w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Scissors className=" w-5" />
          )}
          Remove Object
        </button>
      </form>

      <div className=" w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className=" flex items-center gap-3">
          <Scissors className=" w-5 text-blue-400" />
          <h1>Processed Image</h1>
        </div>
        {!content ? (
          <div className=" flex-1 flex justify-center items-center">
            <div className=" text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className=" w-9 " />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <div className=" flex-1 flex justify-center items-center">
            <img
              src={content}
              alt="image"
              className=" mt-3 h-full w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
