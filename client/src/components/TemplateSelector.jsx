import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "A sleek, contemporary design with bold headings and a focus on readability",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "A simple, elegant layout with plenty of white space and understated design elements",
    },
    {
      id: "minimal-image",
      name: "Minimal with Image",
      preview:
        "A minimalist design that incorporates a profile image for a personal touch",
    },
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-1 hover:ring-2 ring-blue-300 transition-all px-3 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Layout size={14} /> <span className="max-sm:hidden">Templates</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-80 p-3 mt-2 space-y-3 bg-white border border-gray-200 rounded-lg shadow-md z-10">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative p-3 rounded-md border cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
            >
             {
                selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2">
                    <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                      <Check className="text-white h-3 w-3" />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <p className="text-xs text-gray-500 bg-blue-50 mt-1 p-2 rounded italic">{template.preview}</p>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
