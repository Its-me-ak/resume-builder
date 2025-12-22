import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/common/Loader";
import { ArrowLeftIcon } from "lucide-react";
import api from "../config/api";
import toast from "react-hot-toast";

const Preview = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResumeData = async () => {
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`, {
        withCredentials: true,
      });
      setResumeData(data?.resume);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadResumeData();
  }, []);

  return (
    <div>
      {resumeData ? (
        <div className="bg-slate-100">
          <div className="max-w-3xl mx-auto py-10">
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              classes="py-4 bg-white"
            />
          </div>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col items-center justify-center h-screen">
              <p className="text-center text-5xl text-slate-500 font-semibold">
                {" "}
                Resume not found
              </p>
              <Link
                to={"/"}
                className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
              >
                <ArrowLeftIcon className="mr-2 size-4" /> Go Back Home
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Preview;
