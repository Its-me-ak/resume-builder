import { Info, Plus, Sparkles, X } from "lucide-react";
import React, { useState } from "react";

const SkillForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    const deletedSkill = data.filter((_, i) => i !== index);
    onChange(deletedSkill);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          List your relevant skills to highlight your qualifications.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
          placeholder="Add a skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          onClick={handleAddSkill}
          disabled={!newSkill.trim()}
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Sparkles className="w-10 h-10 mx-auto mb-2" />
          <p>No skills added yet.</p>
          <p className="text-sm">
            Click "Add" to include your relevant skills and qualifications.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          {data.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-blue-100 rounded-lg px-3 py-1 text-blue-800"
            >
              <span className="text-sm">{skill}</span>
              <button
                className="ml-1 hover:bg-blue-200 rounded-full p-1 transition-colors"
                onClick={() => handleDeleteSkill(index)}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add tip */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 mt-2">
        <Info className="size-4 text-blue-500" />
        <p className="text-sm text-gray-500 italic max-w-[85%] mx-auto text-center mt-1 leading-relaxed">
          <strong className="mr-2">Tip:</strong>
          Add 8-12 relevant skills. Include both technical and soft skills to
          showcase your qualifications.
        </p>
      </div>
    </div>
  );
};

export default SkillForm;
