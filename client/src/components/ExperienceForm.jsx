import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";

const ExperienceForm = ({ data, onChange }) => {
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
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors whitespace-nowrap"
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
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, "start_date", e.target.value)
                  }
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full disabled:bg-gray-100"
                  disabled={experience.is_current}
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, "end_date", e.target.value)
                  }
                />
              </div>
              <label>
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
                <span className="ml-2 text-sm text-gray-700">
                  Currently Working Here
                </span>
              </label>

              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50">
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
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
