import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {
  const handleAddEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const handleDeleteEducation = (index) => {
    const deletedEducation = data.filter((_, i) => i !== index);
    onChange(deletedEducation);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...data];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    onChange(updatedEducation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
          <p className="text-sm text-gray-500">
            Detail your academic background, degrees earned, and relevant
            courses.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors whitespace-nowrap"
          onClick={handleAddEducation}
        >
          <Plus className="size-4" />
          <span>Add Education</span>
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="">No education added yet.</p>
          <p className="text-sm">
            Click "Add Education" to include your academic background and
            degrees.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="">Education #{index + 1}</h4>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => handleDeleteEducation(index)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  placeholder=" Institution Name"
                  value={education.institution || ""}
                  onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  placeholder="Degree (e.g., Bachelor's, Master's)"
                  value={education.degree || ""}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  placeholder="Field of Study"
                  value={education.field || ""}
                  onChange={(e) =>
                    handleEducationChange(index, "field", e.target.value)
                  }
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "graduation_date",
                      e.target.value
                    )
                  }
                />
              </div>

              <input
                type="text"
                className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                placeholder="GPA (optional)"
                value={education.gpa || ""}
                onChange={(e) =>
                  handleEducationChange(index, "gpa", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
