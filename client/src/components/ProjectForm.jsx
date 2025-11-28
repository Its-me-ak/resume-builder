import { GraduationCap, Plus, Trash2 } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {
  const handleAddProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const handleDeleteProject = (index) => {
    const deletedProject = data.filter((_, i) => i !== index);
    onChange(deletedProject);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProject = [...data];
    updatedProject[index] = { ...updatedProject[index], [field]: value };
    onChange(updatedProject);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">
            Showcase your projects, contributions, and relevant work samples.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors whitespace-nowrap"
          onClick={handleAddProject}
        >
          <Plus className="size-4" />
          <span>Add Project</span>
        </button>
      </div>
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="">You have not added any projects yet.</p>
          <p className="text-sm">
            Click "Add Project" to include your work samples and contributions.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="">Project #{index + 1}</h4>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => handleDeleteProject(index)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid gap-3">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  placeholder="Project Name"
                  value={project.name || ""}
                  onChange={(e) =>
                    handleProjectChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full"
                  placeholder="Project Type"
                  value={project.type || ""}
                  onChange={(e) =>
                    handleProjectChange(index, "type", e.target.value)
                  }
                />

                <textarea
                  className="border border-gray-300 rounded-lg text-sm px-3 py-2 w-full resize-none"
                  placeholder="Project Description"
                  value={project.description || ""}
                  onChange={(e) => 
                    handleProjectChange(index, "description", e.target.value)
                  }
                  rows={5}
                />

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
