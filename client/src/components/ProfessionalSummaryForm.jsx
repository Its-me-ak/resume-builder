import React from "react";
import { Info, Sparkles } from "lucide-react";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Briefly summarize your professional background and key skills.
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors disabled:opacity-50 whitespace-nowrap">
          <Sparkles className="size-4" />
          <span>AI Enhance</span>
        </button>
      </div>

      <div className="mt-6">
        <textarea
          name=""
          id=""
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Write a brief summary of your professional experience, strengths, and career achievements."
          rows={7}
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 mt-2">
          <Info className="size-4 text-blue-500" />
          <p className="text-[13px] text-gray-500 italic max-w-[85%] mx-auto text-center mt-1 leading-relaxed">
            Tip: Keep it concise and focused on your most relevant skills and
            experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
