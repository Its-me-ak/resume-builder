import { Resume } from "../models/Resume.js";
import ai from "../utils/ai.js";

// controller for enhancing a resume proffesional summary
// POST: /api/ai/enhance-pro-summary
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `
            You are an expert ATS-optimized resume writer and career coach with 15+ years of experience.
            You specialize in transforming basic professional summaries into powerful, concise, and achievement-driven summaries.
            Your writing must:
            - Be optimized for Applicant Tracking Systems (ATS)
            - Use strong action verbs and industry-relevant keywords
            - Highlight measurable impact where possible
            - Sound natural, confident, and human-written
            - Avoid fluff, clichés, and generic statements
            - Be tailored for modern corporate, startup, and freelance roles
            - Keep the summary within 3–5 impactful sentences
            Return ONLY the enhanced professional summary. Do NOT add any explanations, headings, or formatting.
            `,
        },
        {
          role: "user",
          content: `Enhance this professional summary: ${userContent}`,
        },
      ],
    });

    const enhancedSummary = response.choices[0].message.content.trim();

    return res.status(200).json({
      message: "Enhanced professional summary",
      summary: enhancedSummary,
    });
  } catch (error) {
    console.log("Error in enhanceProfessionalSummary:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller for enhancing job description
// POST: /api/ai/enhance-job-description
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `
            You are an expert ATS-optimized resume writer and career coach with 15+ years of experience.
            Your task is to transform raw work experience descriptions into powerful, achievement-driven, and ATS-friendly resume job descriptions.

            Your output must:
            - Be written strictly for a resume (NOT a job posting)
            - Use past or present tense correctly based on role
            - Be optimized for Applicant Tracking Systems (ATS)
            - Use strong action verbs (designed, developed, led, optimized, engineered, implemented, etc.)
            - Focus on achievements and impact, not just duties
            - Include measurable results where possible (performance, users, revenue, efficiency, etc.)
            - Be concise, professional, and recruiter-friendly
            - Use bullet points only
            - Avoid fluff, buzzwords, and generic phrases
            - Avoid emojis, tables, and decorative formatting
            - Keep it within 2-3 impactful bullet points

            Return ONLY the enhanced resume-ready bullet points. Do NOT add headings, explanations, or extra text.
            `,
        },
        {
          role: "user",
          content: `Enhance this job description: ${userContent}`,
        },
      ],
    });

    const enhancedJobDescription = response.choices[0].message.content.trim();

    return res.status(200).json({
      message: "Enhanced job description",
      jobDescription: enhancedJobDescription,
    });
  } catch (error) {
    console.log("Error in enhanceJobDescription:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller for uoloading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI agent to extract data from resume.";

    const userPrompt = `extract data from this resume: ${resumeText}
      Provide data in the following JSON format with no additional text before and after:

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
      response_format: {
        type: "json_object",
      },
    });
    const extractedData = response.choices[0].message.content.trim();
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ ...parsedData, userId, title });
    return res.status(200).json({
      resumeId: newResume._id,
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.log("Error in uploadResume:", error);
    logger.error(error.stack);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
