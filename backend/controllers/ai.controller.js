import { Resume } from "../models/Resume.js";
import ai from "../utils/ai.js";

// controller for enhancing a resume proffesional summary
// POST: /api/ai/enhance-pro-summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing content" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Your task is to enhance the professional summary of a resume. The summary should be concise (1–2 sentences) and clearly highlight key skills, relevant experience, and career goals. Ensure it is compelling, ATS-friendly, and return only the improved text without any additional explanations or options.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content;
    return res.status(200).json({ enhancedSummary });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "AI generation failed",
    });
  }
};

// controller for enhancing job description
// POST: /api/ai/enhance-job-description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing content" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Your task is to enhance the job description section of a resume. The description should be concise (1–2 sentences) and clearly highlight key responsibilities and achievements. Use strong action verbs and include quantifiable results where possible. Ensure the content is ATS-friendly and return only the improved text without any additional explanations or options.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedJobDescription = response.choices[0].message.content;
    return res.status(200).json({ enhancedJobDescription });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "AI generation failed",
    });
  }
};

// controller for uoloading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing resume text" });
    }

    const systemPrompt =
      "You are an expert AI agent to extract data from resume.";

    const userPrompt = `extract data from this resume: ${resumeText}
    Provide data in the following JSON format with no additional text before or after:

    {
       professional_summary: { type: String, default: "" },
    skills: [{ type: String }],
    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    experience: [
      {
        company: { type: String, default: "" },
        position: { type: String, default: "" },
        start_date: { type: String, default: "" },
        end_date: { type: String, default: "" },
        description: { type: String, default: "" },
        is_current: { type: Boolean, default: false },
      },
    ],
    project: [
      {
        name: { type: String },
        type: { type: String },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: String },
        gpa: { type: String },
      },
    ],
    }

    `;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "AI generation failed",
    });
  }
};
