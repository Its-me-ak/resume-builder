import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import api from "../config/api";
import toast from "react-hot-toast";
import { normalizeResumeDate } from "../utils/dateUtils";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

const ExperienceForm = ({ data, onChange }) => {
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  // Delete experience
  const handleDeleteExperience = (index) => {
    const updatedExperience = data.filter((_, i) => i !== index);
    onChange(updatedExperience);
  };

  // Update experience
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...data];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    onChange(updatedExperience);
  };

  // Enhance Job Description
  const handleEnhanceDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`;
    try {
      const { data } = await api.post(
        "/api/ai/enhance-job-description",
        { userContent: prompt },
        { withCredentials: true }
      );

      handleExperienceChange(index, "description", data.enhancedJobDescription);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
          <p className="text-sm text-gray-500">
            Detail your previous job roles, responsibilities, and
            accomplishments.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors whitespace-nowrap"
          onClick={handleAddExperience}
        >
          <Plus className="size-4" />
          <span>Add Experience</span>
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="">No experience added yet.</p>
          <p className="text-sm">
            Click "Add Experience" to include your job roles and
            responsibilities.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="">Experience #{index + 1}</h4>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => handleDeleteExperience(index)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  placeholder="Company Name"
                  value={experience.company || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  placeholder="Jop Title"
                  value={experience.position || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, "position", e.target.value)
                  }
                />
                <DatePicker
                  selected={normalizeResumeDate(experience.start_date)}
                  onChange={(date) =>
                    handleExperienceChange(
                      index,
                      "start_date",
                      dayjs(date).format("MMM YYYY")
                    )
                  }
                  dateFormat="MMM YYYY"
                  showMonthYearPicker
                  placeholderText="Start Date"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                />
                <DatePicker
                  selected={normalizeResumeDate(experience.end_date)}
                  disabled={experience.is_current}
                  onChange={(date) =>
                    handleExperienceChange(
                      index,
                      "end_date",
                      dayjs(date).format("MMM YYYY")
                    )
                  }
                  dateFormat="MMM YYYY"
                  showMonthYearPicker
                  placeholderText="End Date"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full disabled:bg-gray-100"
                />
              </div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => {
                    handleExperienceChange(
                      index,
                      "is_current",
                      e.target.checked ? true : false
                    );
                  }}
                />
                <span className="text-sm text-gray-700">
                  Currently Working Here
                </span>
              </label>

              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
                    onClick={() => handleEnhanceDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    {generatingIndex === index
                      ? "Enhancing..."
                      : "Enhance with AI"}
                  </button>
                </div>
                <textarea
                  rows={4}
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full resize-none"
                  placeholder="Describe your responsibilities and achievements in this role."
                  value={experience.description || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
