import {
  FilePenLineIcon,
  FileTextIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../config/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const navigate = useNavigate();
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/users/resumes");
      console.log(data);
      setAllResumes(data?.resumes);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/resumes/create",
        { title },
        { withCredentials: true }
      );
      console.log("resume data:", data);
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/ai/upload-resume",
        { title, resumeText },
        { withCredentials: true }
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.put(
        `/resumes/update`,
        { resumeId: editResumeId, resumeData: JSON.stringify({ title }) },
        { withCredentials: true }
      );
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );
      setTitle("");
      setEditResumeId("");
      setShowCreateResume(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Delete resume
  const deleteResume = async (resumeId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/resumes/delete/${resumeId}`, {
        withCredentials: true,
      });

      setAllResumes((prev) => prev.filter((resume) => resume._id !== resumeId));

      Swal.fire("Deleted!", "Resume deleted.", "success");
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to delete resume",
        "error"
      );
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Smith
        </p>
        <div className="flex gap-4">
          <button
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setShowCreateResume(true)}
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="capitalize text-sm group-hover:text-indigo-600 transition-all">
              create resume
            </p>
          </button>

          <button
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => setShowUploadResume(true)}
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="capitalize text-sm group-hover:text-purple-600 transition-all">
              upload existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, idx) => {
            const baseColor = colors[idx % colors.length];
            return (
              <button
                key={idx}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />
                <p
                  className="text-sm text-center px-2 max-w-[9rem] group-hover:scale-105 transition-all break-words whitespace-normal"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Update on: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div
                  className="hidden absolute top-1 right-1 group-hover:flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TrashIcon
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 hover:text-red-600 transition-colors"
                    onClick={() => deleteResume(resume._id)}
                  />
                  <PencilIcon
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 hover:text-green-600 transition-colors"
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              className="relative bg-slate-50 border shadow-md rounded-md w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Create New Resume</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2  mb-4 focus:border-green-500 ring-green-500"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              className="relative bg-slate-50 border shadow-md rounded-md w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2  mb-4 focus:border-green-500 ring-green-500"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select Resume File
                  <div className="flex flex-col items-center  justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-400 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <FileTextIcon className="size-7" />
                        <p className="text-sm">{resume.name}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <UploadCloud className="size-14 stroke-1" />
                        <p className="text-sm">No file selected</p>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
              <button
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2.5 transition-colors"
                disabled={isLoading}
              >
                {isLoading && (
                  <LoaderCircleIcon className="size-4 animate-spin text-white " />
                )}
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              className="relative bg-slate-50 border shadow-md rounded-md w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Edit Resume Title</h2>
              <input
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2  mb-4 focus:border-green-500 ring-green-500"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
